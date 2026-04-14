// ============================================================
// APP.JS — Lógica principal del Planificador de Comidas
// ============================================================

// ── ESTADO GLOBAL ──────────────────────────────────────────
const STATE = {
  currentView: 'hoy',
  semana: null,
  planState: {}, // { lunes: { comida: 'accepted'|'rejected'|'pending', cena: '...' }, ... }
  shopping: [],
  desvan: [],
  recipeFilter: 'todos',
  recipeSearch: '',
};

// ── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  STATE.semana = getSemanaActual();
  registerServiceWorker();
  renderAll();
  setupNavigation();
  setupModal();
  checkInstallPrompt();
  scheduleLocalNotification();
  setupRecipeSearch();
  setupScanner();
  setupDesvan();

  // Generate shopping list button
  document.getElementById('btn-generate-list').addEventListener('click', () => {
    generateShoppingList();
    showToast('🛒 Lista generada con las comidas de la semana', 'success');
  });

  // Clear shopping list
  document.getElementById('btn-clear-list').addEventListener('click', () => {
    STATE.shopping = [];
    saveState();
    renderShopping();
  });

  // Notification enable
  document.getElementById('notif-enable-btn').addEventListener('click', requestNotificationPermission);

  // Notification bell
  document.getElementById('notif-bell').addEventListener('click', () => {
    if (Notification.permission === 'granted') {
      showToast('🔔 Notificaciones activas a las 21:00', 'info');
    } else {
      requestNotificationPermission();
    }
  });

  // Biometric Setup
  const bioBtn = document.getElementById('biometry-btn');
  if (bioBtn) {
    bioBtn.addEventListener('click', () => {
      if (typeof window.openBiometrySetup === 'function') {
        window.openBiometrySetup();
      } else {
        showToast('⚠️ Biometría no cargada aún', 'error');
      }
    });
  }
});

// Expose switchView globally for inline onclick handlers
window.switchView = function(viewName) {
  STATE.currentView = viewName;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`view-${viewName}`).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.view === viewName);
  });
  if (viewName === 'compra') renderShopping();
  if (viewName === 'nutricion') renderNutricion();
};

// ── SERVICE WORKER ──────────────────────────────────────────
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('[SW] Registrado con éxito');
      // Escuchar mensajes del SW (respuesta de notificación)
      navigator.serviceWorker.addEventListener('message', e => {
        if (e.data.type === 'MEAL_RESPONSE') {
          handleMealResponse(e.data.dia, e.data.comida, e.data.status);
        }
      });
    }).catch(e => console.warn('[SW] Error:', e));
  }
}

// ── PERSISTENCIA ────────────────────────────────────────────
function saveState() {
  localStorage.setItem('planState', JSON.stringify(STATE.planState));
  localStorage.setItem('shopping', JSON.stringify(STATE.shopping));
  localStorage.setItem('desvan', JSON.stringify(STATE.desvan));
}

function loadState() {
  try {
    STATE.planState = JSON.parse(localStorage.getItem('planState') || '{}');
    STATE.shopping  = JSON.parse(localStorage.getItem('shopping')  || '[]');
    STATE.desvan    = JSON.parse(localStorage.getItem('desvan')    || '[]');
  } catch { STATE.planState = {}; STATE.shopping = []; STATE.desvan = []; }

  // Limpiar estados de semanas pasadas
  const keys = Object.keys(STATE.planState);
  // Reset si la semana cambió
  const semanaKey = getWeekKey();
  if (STATE.planState._semanaKey !== semanaKey) {
    STATE.planState = { _semanaKey: semanaKey };
    STATE.shopping = [];
    saveState();
  }
}

function getWeekKey() {
  return Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)).toString();
}

function getMealStatus(dia, tipo) {
  return (STATE.planState[dia] && STATE.planState[dia][tipo]) || 'pending';
}

function setMealStatus(dia, tipo, status) {
  if (!STATE.planState[dia]) STATE.planState[dia] = {};
  STATE.planState[dia][tipo] = status;
  saveState();
}

// ── RENDER ALL ──────────────────────────────────────────────
function renderAll() {
  renderHoy();
  renderPlanSemanal();
  renderRecipes();
  renderShopping();
  renderNutricion();
}

// ── HELPERS DE CANTIDAD ──────────────────────────────────────
// Extrae el número de una cadena como "4 uds", "200g", "1/2", "400g lata"
function parseQtyNumber(str) {
  if (!str) return null;
  // Fracción tipo "1/2"
  const frac = str.match(/^(\d+)\/(\d+)/);
  if (frac) return parseInt(frac[1]) / parseInt(frac[2]);
  // Número normal (entero o decimal)
  const num = str.match(/^([\d.]+)/);
  if (num) return parseFloat(num[1]);
  return null;
}

// Extrae la unidad de "4 uds" → "uds", "200g" → "g", "400g lata" → "g lata"
function parseQtyUnit(str) {
  if (!str) return '';
  return str.replace(/^[\d.\/]+\s*/, '').trim();
}

// Dado lo que se necesita y lo que se tiene, devuelve la cantidad restante
// Devuelve null si ya se tiene suficiente, o la cadena original si no es parseable
function calcRemaining(cantidadStr, haveNum) {
  if (haveNum === null || haveNum === 0) return cantidadStr;
  const needed = parseQtyNumber(cantidadStr);
  if (needed === null) return cantidadStr; // No parseable (c/s, etc)
  const unit = parseQtyUnit(cantidadStr);
  const remaining = needed - haveNum;
  if (remaining <= 0) return null; // Ya se tiene todo
  const remStr = Number.isInteger(remaining) ? remaining : remaining.toFixed(1);
  return unit ? `${remStr} ${unit}` : `${remStr}`;
}

// ── VIEW: HOY ───────────────────────────────────────────────
function renderHoy() {
  const now = new Date();
  const diasJS = { 1:'lunes', 2:'martes', 3:'miercoles', 4:'jueves', 5:'viernes' };
  const hoyKey = diasJS[now.getDay()];
  const esFinSemana = !hoyKey;

  const heroEl = document.getElementById('hoy-hero');
  const mealRowEl = document.getElementById('hoy-meal-row');
  const notifPromptEl = document.getElementById('notif-prompt');

  // Hero date
  heroEl.querySelector('.today-date').textContent = formatDate(now);

  if (esFinSemana) {
    mealRowEl.innerHTML = `
      <div class="empty-state" style="padding:24px 0">
        <div class="empty-icon">🏖️</div>
        <h3>¡Es fin de semana!</h3>
        <p>El menú es de lunes a viernes. <br>Disfruta el descanso.</p>
      </div>`;
    return;
  }

  const diaData = STATE.semana[hoyKey];
  const comidaStatus = getMealStatus(hoyKey, 'comida');
  const cenaStatus   = getMealStatus(hoyKey, 'cena');

  heroEl.querySelector('.today-hero-label').textContent = 'Menú de hoy';
  heroEl.querySelector('h2').textContent = DIAS_LABEL[hoyKey];

  mealRowEl.innerHTML = `
    ${mealMiniCard('comida', diaData.comida, hoyKey, comidaStatus)}
    ${mealMiniCard('cena',   diaData.cena,   hoyKey, cenaStatus)}
  `;

  // Botones de acción en cards
  mealRowEl.querySelectorAll('.meal-mini-card').forEach(card => {
    card.addEventListener('click', () => {
      const tipo = card.dataset.tipo;
      const meal = tipo === 'comida' ? diaData.comida : diaData.cena;
      openMealModal(meal, hoyKey, tipo);
    });
  });

  // Mostrar prompt de notificaciones si no se ha dado permiso
  if (Notification.permission === 'default') {
    notifPromptEl.style.display = 'flex';
  }
}

function mealMiniCard(tipo, meal, dia, status) {
  const statusIcon = status === 'accepted' ? '✅' : status === 'rejected' ? '❌' : '•';
  const statusClass = `status-${status}`;
  return `
    <div class="meal-mini-card ${tipo}" data-tipo="${tipo}" data-dia="${dia}">
      <div class="meal-type-label">${tipo === 'comida' ? '☀️ Comida' : '🌙 Cena'}</div>
      <span class="meal-emoji">${meal.icono}</span>
      <div class="meal-name">${meal.nombre}</div>
      <div class="meal-time">⏱ ${meal.tiempo} min · ${meal.porciones} pers.</div>
      <div class="meal-status-badge ${statusClass}">${statusIcon}</div>
    </div>`;
}

// ── VIEW: PLAN SEMANAL ──────────────────────────────────────
function renderPlanSemanal() {
  const container = document.getElementById('semana-grid');
  const now = new Date();
  const diasJS = { 1:'lunes', 2:'martes', 3:'miercoles', 4:'jueves', 5:'viernes' };
  const hoyKey = diasJS[now.getDay()];

  container.innerHTML = '';
  const semanaStart = getWeekStart(now);

  DIAS.forEach((dia, idx) => {
    const diaData = STATE.semana[dia];
    const fecha = new Date(semanaStart);
    fecha.setDate(semanaStart.getDate() + idx);
    const isToday = dia === hoyKey;
    const comidaStatus = getMealStatus(dia, 'comida');
    const cenaStatus   = getMealStatus(dia, 'cena');

    const card = document.createElement('div');
    card.className = `day-card${isToday ? ' day-today' : ''}${isToday ? ' expanded' : ''}`;
    card.innerHTML = `
      <div class="day-header">
        <div>
          <div class="day-name">${DIAS_LABEL[dia]}${isToday ? ' — Hoy' : ''}</div>
          <div class="day-date">${formatDateShort(fecha)}</div>
        </div>
        <span class="day-chevron">▾</span>
      </div>
      <div class="day-meals">
        ${dayMealRow(diaData.comida, dia, 'comida', comidaStatus)}
        <div class="divider"></div>
        ${dayMealRow(diaData.cena, dia, 'cena', cenaStatus)}
      </div>`;

    // Toggle expand
    card.querySelector('.day-header').addEventListener('click', () => {
      card.classList.toggle('expanded');
    });

    // Meal click → modal
    card.querySelectorAll('.day-meal-row').forEach(row => {
      row.addEventListener('click', e => {
        if (e.target.closest('.action-btn')) return;
        const tipo = row.dataset.tipo;
        const meal = tipo === 'comida' ? diaData.comida : diaData.cena;
        openMealModal(meal, dia, tipo);
      });
    });

    // Accept / Reject buttons
    card.querySelectorAll('.btn-accept').forEach(btn => {
      const tipo = btn.dataset.tipo;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        toggleMealStatus(dia, tipo, 'accepted', card);
      });
    });
    card.querySelectorAll('.btn-reject').forEach(btn => {
      const tipo = btn.dataset.tipo;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        toggleMealStatus(dia, tipo, 'rejected', card);
      });
    });

    container.appendChild(card);
  });
}

function dayMealRow(meal, dia, tipo, status) {
  const isAccepted = status === 'accepted';
  const isRejected  = status === 'rejected';
  return `
    <div class="day-meal-row" data-tipo="${tipo}">
      <div class="meal-icon">${meal.icono}</div>
      <div class="meal-info">
        <div class="meal-category ${tipo}-cat">${tipo === 'comida' ? '☀️ Comida · 2 adultos' : '🌙 Cena · 4 personas'}</div>
        <div class="meal-title">${meal.nombre}</div>
        <div class="meal-meta">
          <span class="meal-tag tag-tiempo">⏱ ${meal.tiempo}min</span>
          <span class="meal-tag ${meal.tipo === 'aprovechamiento' ? 'tag-aprove' : 'tag-normal'}">
            ${meal.tipo === 'aprovechamiento' ? '♻️ Aprovechamiento' : '🥗 Receta nueva'}
          </span>
        </div>
      </div>
      <div class="meal-actions">
        <button class="action-btn btn-accept ${isAccepted ? 'active' : ''}" data-tipo="${tipo}" title="Aceptar">✅</button>
        <button class="action-btn btn-reject ${isRejected ? 'active' : ''}" data-tipo="${tipo}" title="Cambiar">🔄</button>
      </div>
    </div>`;
}

function toggleMealStatus(dia, tipo, newStatus, card) {
  const current = getMealStatus(dia, tipo);
  const status = current === newStatus ? 'pending' : newStatus;
  setMealStatus(dia, tipo, status);

  if (status === 'rejected') {
    showToast('🔄 Cambiando el menú…', 'info');
    showAlternatives(dia, tipo);
  } else if (status === 'accepted') {
    showToast('✅ Menú confirmado', 'success');
  }

  // Re-render plan
  renderPlanSemanal();
  renderHoy();
  setTimeout(() => generateShoppingList(), 300);
}

function handleMealResponse(dia, tipo, status) {
  setMealStatus(dia, tipo, status);
  if (status === 'accepted') {
    deductFromDesvan(dia, tipo);
    showToast('✅ Menú aceptado y descontado del desván', 'success');
  }
  renderPlanSemanal();
  renderHoy();
  if (status === 'rejected') showAlternatives(dia, tipo);
}

// ── ALTERNATIVES MODAL ──────────────────────────────────────
function showAlternatives(dia, tipo) {
  const alts = ALTERNATIVAS[tipo];
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <div class="modal-handle"></div>
    <div class="modal-header" style="text-align:center;padding:20px">
      <div class="modal-emoji">🔄</div>
      <div class="modal-title">¿Qué prefieres para ${tipo === 'comida' ? 'la comida' : 'la cena'}?</div>
      <p style="text-align:center;padding:0 20px;color:var(--text-muted);font-size:.88rem">
        Elige una alternativa o acepta la propuesta original
      </p>
    </div>
    <div class="alternatives-list">
      ${alts.map(a => `
        <div class="alt-card" data-id="${a.id}">
          <span class="alt-emoji">${a.icono}</span>
          <div class="alt-info">
            <h4>${a.nombre}</h4>
            <p>⏱ ~${a.tiempo} min</p>
          </div>
          <span class="alt-arrow">›</span>
        </div>`).join('')}
      <div class="alt-card" style="margin-top:8px;border-color:rgba(94,194,106,.3)" data-id="original">
        <span class="alt-emoji">↩️</span>
        <div class="alt-info">
          <h4>Mantener menú original</h4>
          <p>Volver a la propuesta inicial</p>
        </div>
        <span class="alt-arrow">›</span>
      </div>
    </div>
    <div class="modal-close-btn">
      <button class="btn-full" id="modal-close-btn">Cancelar</button>
    </div>`;

  modal.classList.add('open');

  content.querySelectorAll('.alt-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      if (id === 'original') {
        setMealStatus(dia, tipo, 'accepted');
        showToast('✅ Menú original mantenido', 'success');
      } else {
        // En una versión con backend guardaríamos la alternativa
        setMealStatus(dia, tipo, 'alternative');
        showToast('✅ Alternativa seleccionada', 'success');
      }
      closeModal();
      renderPlanSemanal();
      renderHoy();
    });
  });

  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
}

// ── VIEW: RECETAS ───────────────────────────────────────────
function renderRecipes(filter, search) {
  filter = filter || STATE.recipeFilter;
  search = (search !== undefined ? search : STATE.recipeSearch).toLowerCase();

  // Recopilar todas las recetas de ambas semanas
  const allMeals = [];
  SEMANAS.forEach((semana, semIdx) => {
    DIAS.forEach(dia => {
      ['comida', 'cena'].forEach(tipo => {
        const m = semana[dia][tipo];
        if (!allMeals.find(x => x.id === m.id)) {
          allMeals.push({ ...m, mealType: tipo });
        }
      });
    });
  });

  // ── Añadir recetas nuevas del Recetario Oficial ──
  if (typeof RECETAS_NUEVAS !== 'undefined') {
    Object.values(RECETAS_NUEVAS).forEach(r => {
      if (!allMeals.find(x => x.id === r.id)) {
        allMeals.push({ ...r, mealType: r.mealType || 'cena', esNueva: true });
      }
    });
  }

  let filtered = allMeals;
  if (filter !== 'todos')      filtered = filtered.filter(m => m.mealType === filter || m.tipo === filter);
  if (search)                   filtered = filtered.filter(m => m.nombre.toLowerCase().includes(search));

  const listEl = document.getElementById('recipe-list');
  if (!filtered.length) {
    listEl.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><h3>Sin resultados</h3><p>Prueba con otra búsqueda</p></div>`;
    return;
  }

  listEl.innerHTML = filtered.map(m => `
    <div class="recipe-card ${m.esNueva ? 'recipe-card-nueva' : ''}" data-id="${m.id}" data-tipo="${m.mealType || 'cena'}">
      <div class="recipe-emoji">${m.icono}</div>
      <div class="recipe-info">
        <h3>${m.nombre}</h3>
        <div class="recipe-meta">
          <span>⏱ ${m.tiempo} min</span>
          <span>👥 ${m.porciones} pers.</span>
          <span>${m.tipo === 'aprovechamiento' ? '♻️ Aprovech.' : m.esNueva ? '📖 Recetario' : '🥗 Menú'}</span>
        </div>
      </div>
      <span class="recipe-chevron">›</span>
    </div>`).join('');

  listEl.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
      const meal = allMeals.find(m => m.id === card.dataset.id);
      if (meal) openMealModal(meal, null, card.dataset.tipo);
    });
  });
}


// ── VIEW: COMPRA ────────────────────────────────────────────
function generateShoppingList() {
  const items = {};

  DIAS.forEach(dia => {
    const diaData = STATE.semana[dia];
    const comidaStatus = getMealStatus(dia, 'comida');
    const cenaStatus   = getMealStatus(dia, 'cena');

    if (comidaStatus !== 'rejected') {
      diaData.comida.ingredientes.forEach(ing => {
        if (ing.comprar) {
          const key = ing.nombre.toLowerCase();
          if (!items[key]) items[key] = { ...ing, dias: [dia], tipo: 'comida' };
          else if (!items[key].dias.includes(dia)) items[key].dias.push(dia);
        }
      });
    }
    if (cenaStatus !== 'rejected') {
      diaData.cena.ingredientes.forEach(ing => {
        if (ing.comprar) {
          const key = ing.nombre.toLowerCase();
          if (!items[key]) items[key] = { ...ing, dias: [DIAS_LABEL[dia]], tipo: 'cena' };
          else items[key].dias.push(DIAS_LABEL[dia]);
        }
      });
    }
  });

  STATE.shopping = Object.values(items).map(item => {
    let checked = STATE.shopping.find(s => s.nombre === item.nombre)?.checked || false;
    let tengo = STATE.shopping.find(s => s.nombre === item.nombre)?.tengo ?? null;
    
    // Comparar con mi Desván automáticamente
    if (tengo === null && STATE.desvan) {
       const dsv = STATE.desvan.find(d => 
         item.nombre.toLowerCase().includes(d.nombre.toLowerCase()) || 
         d.nombre.toLowerCase().includes(item.nombre.toLowerCase())
       );
       if (dsv && dsv.cantidad > 0) {
         tengo = dsv.cantidad;
       }
    }
    
    return { ...item, checked, tengo };
  });

  saveState();
  renderShopping();
}

// Pantry: guarda lo que el usuario ya tiene de cada artículo
function setPantry(idx, value) {
  // value: número (puede ser decimal) o null para limpiar
  const numVal = value === '' || value === null ? null : parseFloat(value);
  STATE.shopping[idx].tengo = isNaN(numVal) ? null : numVal;

  // Recalcular si pasa a "ya tengo todo": marcar como checked automáticamente
  const item = STATE.shopping[idx];
  const remaining = calcRemaining(item.cantidad, item.tengo);
  if (remaining === null) {
    // Ya se tiene suficiente → marcar como comprado automáticamente
    item.checked = true;
  } else if (item.tengo === null || item.tengo === 0) {
    // Si limpia el stock, quitar el checked automático
    item.checked = false;
  }

  saveState();
  renderShopping();
}

function renderShopping() {
  const container = document.getElementById('shopping-list');
  if (!STATE.shopping.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <h3>Lista vacía</h3>
        <p>Pulsa <strong>Generar lista</strong> para crear la lista de la compra automáticamente</p>
      </div>`;
    return;
  }

  const categories = {
    '🥩 Carnes y pescados': [],
    '🥦 Verduras y frutas': [],
    '🧀 Lácteos y huevos': [],
    '🫙 Conservas y secos': [],
    '🍞 Pan y cereales': [],
    '🛒 Otros': []
  };

  const categorize = (nombre) => {
    const n = nombre.toLowerCase();
    if (/pollo|ternera|chorizo|jamón|bacon|salchicha|salmon|merluza|atún|gamba|mejillón|carne/i.test(n)) return '🥩 Carnes y pescados';
    if (/leche|queso|nata|mantequilla|huevo|mozzarella|parmesano/i.test(n)) return '🧀 Lácteos y huevos';
    if (/patata|zanahoria|cebolla|pimiento|lechuga|tomate|pepino|espinaca|calabaza|brócoli|champiñ|apio/i.test(n)) return '🥦 Verduras y frutas';
    if (/arroz|pasta|fideo|harina|pan rallado|lenteja|garbanzo|macarrón/i.test(n)) return '🫙 Conservas y secos';
    if (/pan|tortilla|base|empanada|baguette/i.test(n)) return '🍞 Pan y cereales';
    return '🛒 Otros';
  };

  STATE.shopping.forEach((item, idx) => {
    const cat = categorize(item.nombre);
    // Calcular cantidad restante teniendo en cuenta el stock
    const remaining = calcRemaining(item.cantidad, item.tengo);
    const yaCompleto  = remaining === null; // Ya tiene suficiente
    categories[cat].push({ ...item, idx, remaining, yaCompleto });
  });

  // Separar los que ya están completos para mostrarlos al final
  let html = '';
  Object.entries(categories)
    .filter(([, items]) => items.length)
    .forEach(([cat, catItems]) => {
      const pendientes = catItems.filter(i => !i.yaCompleto && !i.checked);
      const completados = catItems.filter(i => i.yaCompleto || i.checked);

      if (!pendientes.length && !completados.length) return;

      html += `<div class="shopping-category">`;
      html += `<div class="category-title">${cat}</div>`;

      // Pendientes primero
      pendientes.forEach(item => {
        const unit = parseQtyUnit(item.cantidad);
        const neededNum = parseQtyNumber(item.cantidad);
        const tengoVal = item.tengo !== null ? item.tengo : '';
        html += shoppingItemHTML(item, item.remaining, tengoVal, false);
      });

      // Completados al final (atenuados)
      completados.forEach(item => {
        html += shoppingItemHTML(item, item.remaining, item.tengo !== null ? item.tengo : '', true);
      });

      html += `</div>`;
    });

  container.innerHTML = html;

  // Event: checkbox (click en el área izquierda)
  container.querySelectorAll('.sh-check-area').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const idx = +el.closest('.shopping-item').dataset.idx;
      STATE.shopping[idx].checked = !STATE.shopping[idx].checked;
      
      if (STATE.shopping[idx].checked) {
        const itemComprado = STATE.shopping[idx];
        const remStr = calcRemaining(itemComprado.cantidad, itemComprado.tengo);
        const remNum = parseFloat(remStr);
        if (!isNaN(remNum) && remNum > 0) {
           if (confirm(`¿Has comprado ${remNum} ${parseQtyUnit(itemComprado.cantidad)} de ${itemComprado.nombre}?\n\n¿Quieres ingresarlo ahora en tu Desván para regularizar el stock?`)) {
             const dsv = STATE.desvan.find(d => 
               itemComprado.nombre.toLowerCase().includes(d.nombre.toLowerCase()) || 
               d.nombre.toLowerCase().includes(itemComprado.nombre.toLowerCase())
             );
             if (dsv) {
               dsv.cantidad += remNum;
             } else {
               const nombreClass = itemComprado.nombre.charAt(0).toUpperCase() + itemComprado.nombre.slice(1).toLowerCase();
               STATE.desvan.push({
                 id: Date.now().toString() + Math.random(),
                 nombre: nombreClass,
                 cantidad: remNum,
                 unidad: parseQtyUnit(itemComprado.cantidad) || 'ud',
                 vigilar: true
               });
             }
             if (typeof renderDesvan === 'function') renderDesvan();
             showToast(`📦 Ingresado en el Desván`, 'success');
           }
        }
      }

      saveState();
      renderShopping();
    });
  });

  // Event: input de "tengo"
  container.querySelectorAll('.sh-tengo-input').forEach(input => {
    input.addEventListener('focus', () => input.select());
    input.addEventListener('change', e => {
      e.stopPropagation();
      const idx = +input.dataset.idx;
      setPantry(idx, input.value);
    });
    // También actualizar al perder el foco
    input.addEventListener('blur', e => {
      const idx = +input.dataset.idx;
      setPantry(idx, input.value);
    });
    // Prevenir que el click propague al item
    input.addEventListener('click', e => e.stopPropagation());
  });

  // Actualizar contador + precio total estimado
  const total    = STATE.shopping.length;
  const yaListos = STATE.shopping.filter(s => {
    const rem = calcRemaining(s.cantidad, s.tengo);
    return s.checked || rem === null;
  }).length;

  let totalPrecio = 0;
  if (typeof PRECIOS_MERCADONA !== 'undefined') {
    STATE.shopping.forEach(s => {
      const p = PRECIOS_MERCADONA[s.nombre.toLowerCase()];
      if (p) totalPrecio += p.precio;
    });
  }

  const counter = document.getElementById('shopping-counter');
  if (counter) {
    counter.innerHTML = `${yaListos}/${total} listos` +
      (totalPrecio > 0 ? ` <span class="sh-total-price">· ~${totalPrecio.toFixed(0)}€</span>` : '');
  }
}

function shoppingItemHTML(item, remaining, tengoVal, completado) {
  const yaCompleto = remaining === null;
  const clases = [
    'shopping-item',
    completado || yaCompleto ? 'checked' : '',
    yaCompleto ? 'sh-ya-tengo' : ''
  ].filter(Boolean).join(' ');

  const cantidadMostrar = yaCompleto
    ? `<span class="sh-qty-done">✅ Ya tienes</span>`
    : `<span class="sh-qty-needed">${remaining}</span>`;

  // Buscar precio en Mercadona
  let precioBadge = '';
  if (typeof PRECIOS_MERCADONA !== 'undefined') {
    const precioInfo = PRECIOS_MERCADONA[item.nombre.toLowerCase()];
    if (precioInfo) {
      precioBadge = `<span class="sh-price-badge">~${precioInfo.precio.toFixed(2)}€</span>`;
    }
  }

  const tengoInputMostrar = yaCompleto
    ? `<span class="sh-tengo-label sh-tengo-ok">Tienes: ${tengoVal} ${parseQtyUnit(item.cantidad)}</span>`
    : `<label class="sh-tengo-label">
        Tengo:
        <input
          class="sh-tengo-input"
          type="number"
          min="0"
          step="0.5"
          value="${tengoVal}"
          placeholder="0"
          data-idx="${item.idx}"
        />
        <span class="sh-tengo-unit">${parseQtyUnit(item.cantidad)}</span>
      </label>`;

  return `
    <div class="${clases}" data-idx="${item.idx}">
      <div class="sh-check-area">
        <div class="sh-check">${(completado || yaCompleto) ? '✓' : ''}</div>
      </div>
      <div class="sh-body">
        <div class="sh-top-row">
          <span class="sh-name ${yaCompleto ? 'sh-name-done' : ''}">${item.nombre}</span>
          <span class="sh-qty-wrap">
            ${precioBadge}
            <span class="sh-qty-original">${item.cantidad}</span>
            ${cantidadMostrar}
          </span>
        </div>
        <div class="sh-bottom-row">${tengoInputMostrar}</div>
      </div>
    </div>`;
}

// ── VIEW: NUTRICIÓN ─────────────────────────────────────────
function renderNutricion() {
  const maxCals = 1200; // kcal por día (comida + cena, promedio adulto)
  const container = document.getElementById('nutri-week-bars');
  container.innerHTML = '';

  let totalCals = 0, totalProt = 0, totalCarb = 0;

  DIAS.forEach(dia => {
    const diaData = STATE.semana[dia];
    // Promedio de adulto (dividir por porciones)
    const comidaCals = diaData.comida.nutricion.calorias;
    const cenaCals   = Math.round(diaData.cena.nutricion.calorias / (diaData.cena.porciones / 2));
    const dayTotal   = comidaCals + cenaCals;

    totalCals += dayTotal;
    totalProt += diaData.comida.nutricion.proteinas + diaData.cena.nutricion.proteinas;
    totalCarb += diaData.comida.nutricion.carbohidratos;

    const pct = Math.min(Math.round((dayTotal / maxCals) * 100), 100);
    const row = document.createElement('div');
    row.className = 'nutri-day-row';
    row.innerHTML = `
      <div class="nutri-day-name">${DIAS_LABEL[dia].substring(0,3)}</div>
      <div class="nutri-day-bar">
        <div class="nutri-day-bar-fill" style="width:0%" data-target="${pct}"></div>
      </div>
      <div class="nutri-day-kcal">${dayTotal} kcal</div>`;
    container.appendChild(row);
  });

  // Animar barras
  setTimeout(() => {
    container.querySelectorAll('.nutri-day-bar-fill').forEach(el => {
      el.style.width = el.dataset.target + '%';
    });
  }, 100);

  // Resumen semanal
  const avgCals = Math.round(totalCals / 5);
  document.getElementById('nutri-avg-cals').textContent = avgCals;
  document.getElementById('nutri-avg-prot').textContent = Math.round(totalProt / 5) + 'g';
  document.getElementById('nutri-avg-carb').textContent = Math.round(totalCarb / 5) + 'g';
}

// ── MEAL DETAIL MODAL ───────────────────────────────────────
function openMealModal(meal, dia, tipo) {
  const modal   = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  const status  = dia ? getMealStatus(dia, tipo) : null;

  const totalMacros = meal.nutricion.proteinas + meal.nutricion.carbohidratos + meal.nutricion.grasas;
  const protPct = Math.round((meal.nutricion.proteinas / totalMacros) * 100);
  const carbPct = Math.round((meal.nutricion.carbohidratos / totalMacros) * 100);
  const fatPct  = Math.round((meal.nutricion.grasas / totalMacros) * 100);

  content.innerHTML = `
    <div class="modal-handle"></div>
    <div class="modal-header">
      <div class="modal-emoji">${meal.icono}</div>
      <div class="modal-title">${meal.nombre}</div>
      <p class="modal-desc">${meal.descripcion}</p>
      <div class="modal-badges">
        <span class="modal-badge badge-tiempo">⏱ ${meal.tiempo} min</span>
        <span class="modal-badge badge-porciones">👥 ${meal.porciones} pers.</span>
        <span class="modal-badge badge-tipo">${meal.tipo === 'aprovechamiento' ? '♻️ Aprovechamiento' : '🥗 Receta nueva'}</span>
      </div>
    </div>

    ${meal.nota ? `<div class="note-box"><span>💡</span><span>${meal.nota}</span></div>` : ''}

    ${dia ? `
    <div style="padding:0 20px 16px">
      <div style="display:flex;gap:10px">
        <button class="btn-primary btn-modal-accept" style="flex:1;padding:12px;border-radius:12px;border:none;font-family:inherit;font-size:.9rem;font-weight:700;cursor:pointer">
          ✅ Aceptar menú
        </button>
        <button class="btn-danger-sm btn-modal-reject" style="flex:1;padding:12px;border-radius:12px;border:none;font-family:inherit;font-size:.9rem;font-weight:700;cursor:pointer">
          🔄 Cambiar menú
        </button>
      </div>
    </div>` : ''}

    <div class="modal-section">
      <h3>🥕 Ingredientes</h3>
      <ul class="ingredient-list">
        ${meal.ingredientes.map(ing => `
          <li class="ingredient-item">
            <span class="ingredient-name">${ing.nombre}</span>
            <span class="ingredient-qty">${ing.cantidad}</span>
          </li>`).join('')}
      </ul>
    </div>

    <div class="modal-section">
      <h3>👨‍🍳 Preparación</h3>
      <ul class="step-list">
        ${meal.pasos.map((p, i) => `
          <li class="step-item">
            <div class="step-num">${i + 1}</div>
            <div class="step-text">${p}</div>
          </li>`).join('')}
      </ul>
    </div>

    <div class="modal-section">
      <h3>📊 Información nutricional (por ración)</h3>
      <div class="nutrition-grid">
        <div class="nutri-box"><div class="nutri-val nutri-cals">${meal.nutricion.calorias}</div><div class="nutri-lbl">Calorías (kcal)</div></div>
        <div class="nutri-box"><div class="nutri-val nutri-prot">${meal.nutricion.proteinas}g</div><div class="nutri-lbl">Proteínas</div></div>
        <div class="nutri-box"><div class="nutri-val nutri-carb">${meal.nutricion.carbohidratos}g</div><div class="nutri-lbl">Carbohidratos</div></div>
        <div class="nutri-box"><div class="nutri-val nutri-fat">${meal.nutricion.grasas}g</div><div class="nutri-lbl">Grasas</div></div>
      </div>
      <div class="macro-bar-wrap">
        <div class="macro-bar-label"><span>🔵 Proteínas</span><span>${protPct}%</span></div>
        <div class="macro-bar-track"><div class="macro-bar-fill bar-prot" style="width:${protPct}%"></div></div>
      </div>
      <div class="macro-bar-wrap">
        <div class="macro-bar-label"><span>🟡 Carbohidratos</span><span>${carbPct}%</span></div>
        <div class="macro-bar-track"><div class="macro-bar-fill bar-carb" style="width:${carbPct}%"></div></div>
      </div>
      <div class="macro-bar-wrap">
        <div class="macro-bar-label"><span>🔴 Grasas</span><span>${fatPct}%</span></div>
        <div class="macro-bar-track"><div class="macro-bar-fill bar-fat" style="width:${fatPct}%"></div></div>
      </div>
    </div>

    <div class="modal-close-btn">
      <button class="btn-full" id="modal-close-btn">Cerrar</button>
    </div>`;

  modal.classList.add('open');
  setTimeout(() => content.scrollTop = 0, 50);

  document.getElementById('modal-close-btn').addEventListener('click', closeModal);

  if (dia) {
    content.querySelector('.btn-modal-accept').addEventListener('click', () => {
      setMealStatus(dia, tipo, 'accepted');
      deductFromDesvan(dia, tipo);
      closeModal();
      renderPlanSemanal(); renderHoy();
      showToast('✅ Menú confirmado y descontado del desván', 'success');
    });
    content.querySelector('.btn-modal-reject').addEventListener('click', () => {
      setMealStatus(dia, tipo, 'rejected');
      closeModal();
      setTimeout(() => showAlternatives(dia, tipo), 200);
    });
  }
}

// ── MODAL HELPERS ───────────────────────────────────────────
function setupModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

// ── NAVIGATION ──────────────────────────────────────────────
function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const view = item.dataset.view;
      window.switchView(view);
    });
  });
}

// switchView is defined as window.switchView below

// ── RECIPE SEARCH & FILTER ──────────────────────────────────
function setupRecipeSearch() {
  const input = document.getElementById('recipe-search');
  input.addEventListener('input', e => {
    STATE.recipeSearch = e.target.value;
    renderRecipes(null, e.target.value);
  });

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      STATE.recipeFilter = chip.dataset.filter;
      renderRecipes(chip.dataset.filter, STATE.recipeSearch);
    });
  });
}

// ── NOTIFICATIONS ───────────────────────────────────────────
function requestNotificationPermission() {
  if (!('Notification' in window)) {
    showToast('⚠️ Tu navegador no soporta notificaciones', 'warning');
    return;
  }
  Notification.requestPermission().then(perm => {
    if (perm === 'granted') {
      showToast('🔔 Notificaciones activadas. Te avisaremos a las 21:00', 'success');
      document.getElementById('notif-prompt').style.display = 'none';
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'SCHEDULE_NOTIFICATION' });
      }
    } else {
      showToast('❌ Permiso de notificaciones denegado', 'warning');
    }
  });
}

function scheduleLocalNotification() {
  if (Notification.permission !== 'granted') return;
  // El SW se encarga de la programación real
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'SCHEDULE_NOTIFICATION' });
  }
}

// ── TOAST ───────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const icons = { success: '✅', warning: '⚠️', info: 'ℹ️', danger: '❌' };
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ️'}</span><span class="toast-msg">${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('out'); setTimeout(() => toast.remove(), 300); }, 3000);
}

// ── INSTALL PROMPT (PWA) ────────────────────────────────────
let _deferredInstall = null;
function checkInstallPrompt() {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    _deferredInstall = e;
    document.getElementById('install-banner').style.display = 'flex';
  });

  const installBtn = document.getElementById('install-btn');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!_deferredInstall) return;
      _deferredInstall.prompt();
      const result = await _deferredInstall.userChoice;
      if (result.outcome === 'accepted') {
        document.getElementById('install-banner').style.display = 'none';
        showToast('🎉 App instalada correctamente', 'success');
      }
      _deferredInstall = null;
    });
  }
}

// ── DATE HELPERS ────────────────────────────────────────────
function formatDate(date) {
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', opts);
}

function formatDateShort(date) {
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  // Ajustar al lunes anterior
  const diff = (day === 0 ? -6 : 1 - day);
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

// ── (All event listeners moved to main DOMContentLoaded above) ──────────────

// ── DESVÁN (INVENTARIO) ─────────────────────────────────────
function setupDesvan() {
  document.getElementById('btn-add-desvan').addEventListener('click', () => {
    const nameInput = document.getElementById('desvan-input-name');
    const qtyInput = document.getElementById('desvan-input-qty');
    const unitInput = document.getElementById('desvan-input-unit');
    const vigilarInput = document.getElementById('desvan-input-vigilar');

    if (!nameInput.value.trim() || !qtyInput.value) {
      showToast('Rellena nombre y cantidad', 'warning');
      return;
    }

    const item = {
      id: Date.now().toString(),
      nombre: nameInput.value.trim(),
      cantidad: parseFloat(qtyInput.value),
      unidad: unitInput.value,
      vigilar: vigilarInput.checked
    };

    STATE.desvan.push(item);
    saveState();
    
    nameInput.value = '';
    qtyInput.value = '';
    showToast('📦 Añadido al desván', 'success');
    renderDesvan();
  });

  document.getElementById('btn-desvan-scan').addEventListener('click', () => {
    // Activa el modo reabastecimiento en el scanner AI
    window.scannerRestockMode = true;
    document.getElementById('scanner-overlay').classList.add('open');
    if (typeof window.startCamera === 'function') window.startCamera();
  });

  const uploadTicketBtn = document.getElementById('desvan-upload-ticket');
  if (uploadTicketBtn) {
    uploadTicketBtn.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      let apiKey = window.GEMINI_API_KEY || localStorage.getItem('gemini_api_key');
      if (!apiKey) {
        apiKey = prompt("🤖 Análisis visual con Google Gemini AI\n\nPor favor, pega aquí tu API Key de Gemini (es gratuita en Google AI Studio):");
        if (!apiKey) {
          e.target.value = '';
          return;
        }
        localStorage.setItem('gemini_api_key', apiKey.trim());
      }
      
      showToast('Analizando ticket con Gemini AI... 🧠', 'info');
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result.split(',')[1];
        
        try {
          const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: 'Extrae los alimentos de comida (solo comida) de este ticket o imagen. Devuelve ÚNICAMENTE un array JSON válido, sin formato markdown ni comillas extrañas. Ejemplo: [{"nombre": "Tomate", "cantidad": 2}]. Agrupa si son similares. Mantenlo ultra limplio, no añadas textos explicativos. Si no hay ingredientes devuelve []' },
                  { inline_data: { mime_type: file.type, data: base64Data } }
                ]
              }]
            })
          });

          if (resp.status === 400 || resp.status === 403) {
             localStorage.removeItem('gemini_api_key');
             throw new Error("API Key inválida o caducada.");
          }
          if (!resp.ok) throw new Error("Error conectando con Gemini");

          const data = await resp.json();
          const rawText = data.candidates[0].content.parts[0].text;
          
          let parsed = [];
          try {
             const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
             parsed = JSON.parse(cleanJson);
          } catch(err) {
             throw new Error("Gemini no devolvió un formato válido.");
          }

          if (parsed.length === 0) {
             showToast('No se encontraron alimentos en la foto.', 'warning');
             return;
          }

          let countMsg = 0;
          parsed.forEach(ing => {
             const nombreClass = ing.nombre.charAt(0).toUpperCase() + ing.nombre.slice(1).toLowerCase();
             const qty = typeof ing.cantidad === 'number' ? ing.cantidad : 1;
             
             const ex = STATE.desvan.find(d => d.nombre.toLowerCase() === ing.nombre.toLowerCase());
             if (ex) {
               ex.cantidad += qty;
             } else {
               STATE.desvan.push({
                 id: Date.now().toString() + Math.random(),
                 nombre: nombreClass,
                 cantidad: qty,
                 unidad: 'ud',
                 vigilar: true
               });
             }
             countMsg++;
          });

          saveState();
          renderDesvan();
          showToast(`¡${countMsg} ingredientes guardados en el Desván con Gemini!`, 'success');

        } catch (error) {
          showToast('❌ Error: ' + error.message, 'error');
        } finally {
          e.target.value = '';
        }
      };
    });
  }
}

function renderDesvan() {
  const container = document.getElementById('desvan-list');
  const counter = document.getElementById('desvan-counter');
  
  if (!container || !counter) return;

  counter.textContent = `${STATE.desvan.length} artículos`;

  if (STATE.desvan.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📦</div>
        <div class="empty-title">Tu desván está vacío</div>
        <p class="empty-subtitle">Añade los ingredientes que tienes en casa para llevar control y descontarlos automáticamente al menú.</p>
      </div>`;
    return;
  }

  let html = '<div style="display:flex;flex-direction:column;gap:10px;padding:0 16px 16px;">';
  STATE.desvan.forEach((item, index) => {
    html += `
      <div class="card" style="padding:12px; display:flex; justify-content:space-between; align-items:center;">
        <div style="flex:1">
          <div style="font-weight:bold; font-size:1rem; color:var(--text);">${item.nombre}</div>
          <div style="font-size:0.85rem; color:var(--text-muted); display:flex; align-items:center; gap:5px; margin-top:3px;">
            Cantidad: 
            <input type="number" step="0.1" value="${item.cantidad}" oninput="updateDesvanQty('${item.id}', this.value)" style="width:60px; padding:2px; border:1px solid var(--border); border-radius:4px; background:var(--bg); color:var(--text); font-size:0.85rem;">
            ${item.unidad}
          </div>
          <label style="display:flex; align-items:center; gap:5px; font-size:0.8rem; margin-top:5px; cursor:pointer;">
            <input type="checkbox" onchange="toggleVigilancia('${item.id}')" ${item.vigilar ? 'checked' : ''} style="accent-color:var(--primary);">
            <span style="color:${item.vigilar ? 'var(--primary)' : 'var(--text-muted)'}">Vigilancia Activa</span>
          </label>
        </div>
        <div style="display:flex; gap:10px; align-items:center;">
          <button class="icon-btn" onclick="removeDesvanItem('${item.id}')" style="color:var(--error);">🗑️</button>
        </div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

window.toggleVigilancia = function(id) {
  const item = STATE.desvan.find(i => i.id === id);
  if (item) {
    item.vigilar = !item.vigilar;
    saveState();
    renderDesvan();
  }
};

window.updateDesvanQty = function(id, newVal) {
  const item = STATE.desvan.find(i => i.id === id);
  if (item && newVal !== '') {
    item.cantidad = parseFloat(newVal);
    saveState();
  }
};

window.removeDesvanItem = function(id) {
  STATE.desvan = STATE.desvan.filter(i => i.id !== id);
  saveState();
  renderDesvan();
};

function deductFromDesvan(dia, tipo) {
  // Deduce ingredientes de un menú aceptado del desván
  const recetaRef = STATE.semana[dia][tipo];
  if (!recetaRef || !recetaRef.recetaId) return;

  const recetaIndex = RECETARIO.findIndex(r => r.id === recetaRef.recetaId);
  if (recetaIndex === -1) return;

  const receta = RECETARIO[recetaIndex];
  if (!receta.ingredientes) return;

  let somethingDeducted = false;

  receta.ingredientes.forEach(ingNeed => {
    // Buscar en el desván si existe este ingrediente
    // Hacemos una búsqueda simple por nombre (case-insensitive)
    const despensaItem = STATE.desvan.find(d => 
      ingNeed.nombre.toLowerCase().includes(d.nombre.toLowerCase()) || 
      d.nombre.toLowerCase().includes(ingNeed.nombre.toLowerCase())
    );

    if (despensaItem) {
      const needNum = parseQtyNumber(ingNeed.cantidad) || 1;
      
      despensaItem.cantidad -= needNum;
      somethingDeducted = true;
    }
  });

  if (somethingDeducted) {
    saveState();
    renderDesvan();
    checkVigilancia();
  }
}

function checkVigilancia() {
  // Solo avisar 1 vez por item que llega a 0, si ya está en la lista de compras no duplicar
  let toBuy = [];
  STATE.desvan.forEach(item => {
    if (item.vigilar && item.cantidad <= 0) {
      // Poner a 0 exacto (evitar números negativos locos visualmente)
      item.cantidad = 0;
      
      // Chequear si ya está en la lista de la compra
      const enShopping = STATE.shopping.find(s => s.item.toLowerCase() === item.nombre.toLowerCase());
      if (!enShopping) {
        toBuy.push(item);
      }
    }
  });

  if (toBuy.length > 0) {
    toBuy.forEach(item => {
      STATE.shopping.push({
        id: 'shp-' + Date.now() + Math.random(),
        item: item.nombre,
        info: 'Reabastecimiento automático (agostado)',
        comprado: false
      });
    });
    saveState();
    renderShopping();
    // Enseñar notificación
    const nombres = toBuy.map(i => i.nombre).join(', ');
    showToast(`⚠️ ¡Queda poco! Añadido a la compra: ${nombres}`, 'warning');
    
    if (Notification.permission === 'granted') {
      new Notification('Vigilancia de Desván', {
        body: `Se han agotado: ${nombres}. Se añadieron a la lista de compra.`
      });
    }
  }
}

// ── ROBOLFLOW SCANNER INTERFACE ───────────────────────────
function setupScanner() {
  const btnOpen = document.getElementById('btn-open-scanner');
  if (!btnOpen) return;

  const overlay = document.getElementById('scanner-overlay');
  const btnClose = document.getElementById('scanner-close');
  const video = document.getElementById('scanner-video');
  const captureBtn = document.getElementById('scanner-capture');
  const statusEl = document.getElementById('scanner-status');
  const resultsEl = document.getElementById('scanner-results');
  const scanline = document.getElementById('scanner-scanline');
  
  let stream = null;

  btnOpen.addEventListener('click', async () => {
    window.scannerRestockMode = false;
    overlay.style.display = 'flex';
    resultsEl.style.display = 'none';
    statusEl.innerHTML = 'Apunta a tus ingredientes...<br><small>Coloca la comida bien iluminada</small>';
    scanline.style.display = 'block';

    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      video.srcObject = stream;
    } catch (err) {
      statusEl.textContent = '❌ Error al acceder a la cámara trasera.';
      scanline.style.display = 'none';
    }
  });

  function closeScanner() {
    overlay.style.display = 'none';
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      stream = null;
    }
  }

  btnClose.addEventListener('click', closeScanner);

  captureBtn.addEventListener('click', async () => {
    if (!stream) return;
    
    // UI feedback
    captureBtn.style.transform = 'scale(0.9)';
    setTimeout(() => captureBtn.style.transform = 'scale(1)', 200);
    
    statusEl.textContent = 'Procesando imagen con IA... 🧠';
    scanline.style.animationDuration = '0.5s';

    // Capture frame to base64
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    let base64Image = canvas.toDataURL('image/jpeg', 0.8);
    const base64Data = base64Image.split(',')[1];

    try {
      if (window.scannerRestockMode) {
        // MODO TICKET REABASTECIMIENTO (OCR)
        statusEl.textContent = 'Leyendo texto del ticket (OCR)... 🧾';
        if (typeof Tesseract === 'undefined') {
          throw new Error('La IA de lectura de texto aún está cargando o no está disponible.');
        }

        const { data: { text } } = await Tesseract.recognize(canvas, 'spa', {
          logger: m => console.log(m)
        });

        const ticketText = text.toLowerCase();
        
        // Extracción cruzando con nuestro recetario
        const posibles = new Set();
        RECETARIO.forEach(r => {
          if (r.ingredientes) {
            r.ingredientes.forEach(ing => {
              const name = ing.nombre.toLowerCase().trim();
              // Evitar matcheo de cosas muy cortas
              if (name.length >= 4 && ticketText.includes(name)) {
                 posibles.add(ing.nombre);
              }
            });
          }
        });

        scanline.style.display = 'none';
        resultsEl.style.display = 'block';
        
        const detectados = Array.from(posibles);

        if (detectados.length === 0) {
           resultsEl.innerHTML = `<p style="color:#ffcdd2;">No he podido leer ningún ingrediente conocido en este ticket. Asegúrate de enfocar de cerca e iluminar bien el papel.</p>
           <pre style="font-size:0.6rem; color:#666; max-height:80px; overflow:hidden;">Texto bruto:\n${text}</pre>`;
           statusEl.textContent = 'Reintenta o añade a mano';
           window.scannerRestockMode = false;
           return;
        }

        detectados.forEach(c => {
          const nombreClass = c.charAt(0).toUpperCase() + c.slice(1).toLowerCase();
          const ex = STATE.desvan.find(d => d.nombre.toLowerCase() === c.toLowerCase());
          if (ex) {
            ex.cantidad += 1;
          } else {
            STATE.desvan.push({
              id: Date.now().toString() + Math.random(),
              nombre: nombreClass,
              cantidad: 1,
              unidad: 'ud',
              vigilar: true
            });
          }
        });
        saveState();
        renderDesvan();
        statusEl.textContent = '✅ ¡Ticket procesado!';
        resultsEl.innerHTML = `
          <div style="background:rgba(0,0,0,0.5); padding:15px; border-radius:10px; border:1px solid #444; margin-top:10px;">
            <p style="margin:0;color:var(--primary);">Alimentos detectados y guardados en el Desván (1 ud por defecto):</p>
            <h4 style="margin:5px 0 0 0; color:#fff;">${detectados.join(', ')}</h4>
          </div>
        `;
        window.scannerRestockMode = false;

      } else {
        // MODO FOTO ALMACEN (ROBOFLOW - FREESTYLE RECIPE)
        const resp = await fetch('https://detect.roboflow.com/infer/workflows/welding-hqci3/sam3-2?api_key=K6YHioHqtuwbsNmR2n7O', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inputs: {
               image: { type: "base64", value: base64Data }
            }
          })
        });

        if (!resp.ok) {
          throw new Error('Error HTTP ' + resp.status);
        }

        const data = await resp.json();
        
        // Función para extraer clases recursivamente del workflow de Roboflow
        function extractClasses(obj, classes = new Set()) {
          if (!obj) return classes;
          if (Array.isArray(obj)) {
            obj.forEach(o => extractClasses(o, classes));
          } else if (typeof obj === 'object') {
            if (obj.class && typeof obj.class === 'string') classes.add(obj.class);
            if (obj.label && typeof obj.label === 'string') classes.add(obj.label);
            if (obj.prediction && typeof obj.prediction === 'string') classes.add(obj.prediction);
            Object.values(obj).forEach(v => extractClasses(v, classes));
          }
          return classes;
        }

        const detectadosSet = extractClasses(data);
        const predictedClasses = Array.from(detectadosSet);
        
        scanline.style.display = 'none';
        resultsEl.style.display = 'block';
        
        if (predictedClasses.length === 0) {
           resultsEl.innerHTML = `<p style="color:#ffcdd2;">No pude reconocer ingredientes claros. ¿Has enfocado bien?</p>
           <pre style="font-size:0.6rem; color:#666; max-height:80px; overflow:hidden;">${JSON.stringify(data)}</pre>`;
           statusEl.textContent = 'Inténtalo de nuevo';
           return;
        }

        // MODO FREESTYLE RECIPE (Por defecto de Menú Hoy)
        const ingredList = predictedClasses.join(', ');
        
        let html = `<h4 style="margin:0 0 10px 0; color:var(--primary);">Ingredientes: ${ingredList}</h4>`;
        
        const metodos = ['Salteado rápido', 'Cazuela', 'Revuelto', 'Ensalada tibia', 'Bowl fit', 'Wrap exprés'];
        const metodo = metodos[Math.floor(Math.random() * metodos.length)];
        
        html += `
          <div style="background:rgba(0,0,0,0.5); padding:15px; border-radius:10px; border:1px solid #444; margin-top:10px; text-align:left;">
             <h3 style="margin:0 0 5px 0; color:#fff;">✨ Receta Freestyle: ${metodo} de ${predictedClasses[0]}</h3>
             <p style="font-size:0.85rem; color:var(--primary); margin:0 0 10px 0;">⏳ 15 mins · 🍳 Nivel Fácil</p>
             <ol style="margin:0; padding-left:20px; font-size:0.95rem; line-height:1.5; color:#eee;">
                <li>Lava y prepara todo: <b>${ingredList}</b>.</li>
                <li>Calienta una sartén con un chorrito de aceite de oliva.</li>
                <li>Cocina a fuego medio-alto hasta que dore bien.</li>
                <li>Sazona a tu gusto con sal, pimienta y tus especias favoritas.</li>
                <li>¡Sirve caliente y disfruta!</li>
             </ol>
          </div>
        `;

        resultsEl.innerHTML = html;
        statusEl.textContent = '¡Menú improvisado listo!';
      }

    } catch (err) {
      statusEl.textContent = '❌ Fallo en la IA: ' + err.message;
      scanline.style.animationDuration = '2s';
      scanline.style.display = 'none';
      window.scannerRestockMode = false;
    }
  });
}
