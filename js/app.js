// ============================================================
// APP.JS — Lógica principal del Planificador de Comidas
// ============================================================

// ── ESTADO GLOBAL ──────────────────────────────────────────
const STATE = {
  currentView: 'hoy',
  semana: null,
  planState: {}, // { lunes: { comida: 'accepted'|'rejected'|'pending', cena: '...' }, ... }
  customMenu: {}, // { lunes: { comida: 'recipe-id' } }
  shopping: [],
  desvan: [],
  recipeFilter: 'todos',
  recipeSearch: '',
  comedorMenu: {}, // { "lunes": "Lentejas", "martes": "Pollo", ... }
  customRecipes: {}, // Para recetas modificadas
  quarantineRecipes: [], // Para recetas rechazadas por completo
  importedRecipes: {} // Recetas importadas desde URL o PDF (persistentes)
};

// ── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  STATE.semana = JSON.parse(JSON.stringify(getSemanaActual()));
  
  // Aplicar menús personalizados
  for (const dia in STATE.customMenu) {
    if (STATE.semana[dia]) {
      for (const tipo in STATE.customMenu[dia]) {
        const recipeId = STATE.customMenu[dia][tipo];
        const rec = getRecetaById(recipeId);
        if (rec) STATE.semana[dia][tipo] = rec;
      }
    }
  }

  // Filtrar recetas en cuarentena o eliminadas (forzar una alternativa elegida automáticamente o dejar pendiente)
  for (const dia in STATE.semana) {
    ['comida', 'cena'].forEach(tipo => {
      const meal = STATE.semana[dia][tipo];
      if (meal && (STATE.quarantineRecipes.includes(meal.id) || STATE.deletedRecipes.includes(meal.id))) {
        // Encontrar primera alternativa válida no en cuarentena
        let availableAlts = (ALTERNATIVAS[tipo] || []).filter(a => !STATE.quarantineRecipes.includes(a.id) && !STATE.deletedRecipes.includes(a.id));
        if (typeof RECETAS_NUEVAS !== 'undefined') {
          const newAlts = Object.values(RECETAS_NUEVAS).filter(r => (r.tipo === tipo || !r.tipo) && !STATE.quarantineRecipes.includes(r.id) && !STATE.deletedRecipes.includes(r.id));
          availableAlts = [...availableAlts, ...newAlts];
        }
        if (availableAlts.length > 0) {
          const randAlt = availableAlts[Math.floor(Math.random() * availableAlts.length)];
          STATE.semana[dia][tipo] = randAlt;
          if (!STATE.customMenu[dia]) STATE.customMenu[dia] = {};
          STATE.customMenu[dia][tipo] = randAlt.id;
          setMealStatus(dia, tipo, 'alternative');
        }
      }
    });
  }

  // Fusionar recetas importadas (URL/PDF) en el recetario para que se listen
  if (typeof RECETAS_NUEVAS !== 'undefined' && STATE.importedRecipes) {
    Object.values(STATE.importedRecipes).forEach(r => { if (r && r.id) RECETAS_NUEVAS[r.id] = r; });
  }

  registerServiceWorker();
  renderAll();
  setupNavigation();
  setupModal();
  checkInstallPrompt();
  scheduleLocalNotification();
  setupRecipeSearch();
  setupScanner();
  setupDesvan();
  setupComedor();
  setupImport();

  // Generate shopping list button
  document.getElementById('btn-generate-list').addEventListener('click', () => {
    openShoppingAssistant();
  });

  // Clear shopping list
  document.getElementById('btn-clear-list').addEventListener('click', () => {
    STATE.shopping = [];
    saveState();
    renderShopping();
  });

  // Manual Add Shopping Item
  document.getElementById('btn-sh-add').addEventListener('click', () => {
    const nameInput = document.getElementById('sh-input-name');
    const qtyInput = document.getElementById('sh-input-qty');
    
    if (!nameInput.value.trim()) {
      alert("Por favor, introduce el nombre del artículo a añadir.");
      return;
    }
    
    STATE.shopping.push({
      nombre: nameInput.value.trim(),
      cantidad: qtyInput.value.trim() || '1 ud',
      checked: false,
      tengo: null,
      originalCantidad: parseFloat(qtyInput.value) || 1
    });
    
    saveState();
    renderShopping();
    
    nameInput.value = '';
    qtyInput.value = '';
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
  // Refresh Recipes NotebookLM
  const refreshBtn = document.getElementById('btn-refresh-recipes');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      showToast('🤖 Consultando nuevas recetas en NotebookLM...', 'info');
      
      const prevIcon = refreshBtn.innerHTML;
      refreshBtn.innerHTML = '⏳ Sincronizando...';
      refreshBtn.disabled = true;

      try {
        const response = await fetch('./notebooklm_recipes.json?v=' + new Date().getTime(), { cache: "no-store" });
        if (!response.ok) throw new Error('Network response was not ok');
        const nuevas = await response.json();
        
        let agregadas = 0;
        let numDescargadas = 0;
        if (typeof RECETAS_NUEVAS !== 'undefined') {
          const arrNuevas = Array.isArray(nuevas) ? nuevas : Object.values(nuevas);
          numDescargadas = arrNuevas.length;
          arrNuevas.forEach(r => {
            if (!RECETAS_NUEVAS[r.id]) agregadas++;
            RECETAS_NUEVAS[r.id] = r;
          });
        }
        
        renderRecipes();
        showToast(`✅ ¡${numDescargadas} recetas descargadas (${agregadas} nuevas) desde NotebookLM!`, 'success');
      } catch (error) {
        console.error('Error fetching NotebookLM recipes:', error);
        showToast('❌ Ocurrió un error al cargar recetas. Revisa la consola.', 'error');
      } finally {
        refreshBtn.innerHTML = prevIcon;
        refreshBtn.disabled = false;
      }
    });
  }

  // Quarantine Modal
  const quarantineBtn = document.getElementById('btn-show-quarantine');
  if (quarantineBtn) {
    quarantineBtn.addEventListener('click', () => {
      showQuarantineModal();
    });
  }
});

// Expose switchView globally for inline onclick handlers
window.switchView = function(viewName) {
  if (window.speechSynthesis && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  
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
  localStorage.setItem('customMenu', JSON.stringify(STATE.customMenu));
  localStorage.setItem('shopping', JSON.stringify(STATE.shopping));
  localStorage.setItem('desvan', JSON.stringify(STATE.desvan));
  localStorage.setItem('comedorMenu', JSON.stringify(STATE.comedorMenu));
  localStorage.setItem('customRecipes', JSON.stringify(STATE.customRecipes));
  localStorage.setItem('quarantineRecipes', JSON.stringify(STATE.quarantineRecipes));
  localStorage.setItem('deletedRecipes', JSON.stringify(STATE.deletedRecipes));
  localStorage.setItem('importedRecipes', JSON.stringify(STATE.importedRecipes));
}

function loadState() {
  try {
    STATE.planState  = JSON.parse(localStorage.getItem('planState') || '{}');
    STATE.customMenu = JSON.parse(localStorage.getItem('customMenu') || '{}');
    STATE.shopping   = JSON.parse(localStorage.getItem('shopping')  || '[]');
    STATE.desvan     = JSON.parse(localStorage.getItem('desvan')    || '[]');
    STATE.comedorMenu = JSON.parse(localStorage.getItem('comedorMenu') || '{}');
    STATE.customRecipes = JSON.parse(localStorage.getItem('customRecipes') || '{}');
    STATE.quarantineRecipes = JSON.parse(localStorage.getItem('quarantineRecipes') || '[]');
    STATE.deletedRecipes = JSON.parse(localStorage.getItem('deletedRecipes') || '[]');
    STATE.importedRecipes = JSON.parse(localStorage.getItem('importedRecipes') || '{}');
  } catch {
    STATE.planState = {}; 
    STATE.customMenu = {}; 
    STATE.shopping = []; 
    STATE.desvan = []; 
    STATE.comedorMenu = {};
    STATE.customRecipes = {};
    STATE.quarantineRecipes = [];
    STATE.deletedRecipes = [];
    STATE.importedRecipes = {};
  }

  // Limpiar estados de semanas pasadas
  const keys = Object.keys(STATE.planState);
  // Reset si la semana cambió
  const semanaKey = getWeekKey();
  if (STATE.planState._semanaKey !== semanaKey) {
    STATE.planState = { _semanaKey: semanaKey };
    STATE.customMenu = {};
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
  if (str === null || str === undefined) return null;
  if (typeof str === 'number') return str;
  str = String(str);
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
  if (str === null || str === undefined) return '';
  str = String(str);
  return str.replace(/^[\d.\/]+\s*/, '').trim();
}

const UNIT_GROUPS = {
  g: { base: 'g', factor: 1, type: 'weight' },
  kg: { base: 'g', factor: 1000, type: 'weight' },
  ml: { base: 'ml', factor: 1, type: 'volume' },
  l: { base: 'ml', factor: 1000, type: 'volume' },
  ud: { base: 'ud', factor: 1, type: 'count' },
  uds: { base: 'ud', factor: 1, type: 'count' }
};

// Dado lo que se necesita y lo que se tiene (ahora considerando unidades), devuelve la cantidad restante
function calcRemaining(cantidadStr, haveNum, haveUnitStr) {
  if (haveNum === null || haveNum === undefined || haveNum === 0) return cantidadStr;
  const neededNum = parseQtyNumber(cantidadStr);
  if (neededNum === null) return cantidadStr; // No parseable (c/s, etc)
  
  const rawNeededUnit = parseQtyUnit(cantidadStr).toLowerCase();
  const rawHaveUnit = typeof haveUnitStr === 'string' ? haveUnitStr.toLowerCase().trim() : '';

  const nUnitObj = UNIT_GROUPS[rawNeededUnit] || { base: rawNeededUnit, factor: 1, type: 'unknown' };
  const hUnitObj = UNIT_GROUPS[rawHaveUnit] || { base: rawHaveUnit, factor: 1, type: 'unknown' };

  // Conversión exacta si son del mismo tipo
  if ((nUnitObj.type === hUnitObj.type && nUnitObj.type !== 'unknown') || rawNeededUnit === rawHaveUnit) {
      const neededInBase = neededNum * nUnitObj.factor;
      const haveInBase = haveNum * hUnitObj.factor;
      const remInBase = neededInBase - haveInBase;
      if (remInBase <= 0) return null; // Ya se tiene o sobrepasa
      const remNeededUnit = remInBase / nUnitObj.factor;
      const remStr = Number.isInteger(remNeededUnit) ? remNeededUnit : remNeededUnit.toFixed(1);
      return parseQtyUnit(cantidadStr) ? `${remStr} ${parseQtyUnit(cantidadStr)}` : `${remStr}`;
  }

  // Incompatibles (ej. weight vs count). Asumimos que 1 'ud' en Despensa cubre lo del planificador.
  if ((nUnitObj.type === 'weight' || nUnitObj.type === 'volume') && hUnitObj.type === 'count') {
      if (haveNum >= 1) return null; // Tienes al menos 1 paquete, cubre la receta.
  }
  if (nUnitObj.type !== 'unknown' && hUnitObj.type === 'unknown' && haveNum >= 1) {
      return null; // Si tienes algo y la unidad es rara, lo damos por bueno
  }

  // Fallback resta directa
  const remaining = neededNum - haveNum;
  if (remaining <= 0) return null;
  const remStr = Number.isInteger(remaining) ? remaining : remaining.toFixed(1);
  const u = parseQtyUnit(cantidadStr);
  return u ? `${remStr} ${u}` : `${remStr}`;
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

  const tzoffsetHoy = now.getTimezoneOffset() * 60000;
  const isodateHoy = (new Date(now - tzoffsetHoy)).toISOString().split('T')[0];
  const menuNinosHoy = STATE.comedorMenu[isodateHoy];
  
  let kidsHtmlHoy = '';
  if (menuNinosHoy) {
    kidsHtmlHoy = `
      <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:12px; margin-bottom:12px;">
        <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:4px; text-transform:uppercase; letter-spacing:0.05em; font-weight:700;">🏫 Comedor Niños</div>
        <div style="font-size:0.9rem;">${menuNinosHoy}</div>
      </div>
    `;
  }

  mealRowEl.innerHTML = `
    ${kidsHtmlHoy}
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

    const tzoffset = fecha.getTimezoneOffset() * 60000;
    const isodate = (new Date(fecha - tzoffset)).toISOString().split('T')[0];
    const menuNinos = STATE.comedorMenu[isodate];
    let kidsHtml = '';
    if (menuNinos) {
      kidsHtml = `
      <div style="padding: 10px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid var(--border);">
        <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:2px; font-weight:700; text-transform:uppercase;">🏫 Comedor Niños:</div>
        <div style="font-size:0.85rem; color: #ccc;">${menuNinos}</div>
      </div>
      `;
    }

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
        ${kidsHtml}
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
    deductFromDesvan(dia, tipo);
    showToast('✅ Menú confirmado y descontado', 'success');
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
    showToast('✅ Menú aceptado y descontado de la despensa', 'success');
  }
  renderPlanSemanal();
  renderHoy();
  if (status === 'rejected') showAlternatives(dia, tipo);
}

// ── ALTERNATIVES MODAL ──────────────────────────────────────
function showAlternatives(dia, tipo) {
  let alts = [];
  if (typeof RECETAS_NUEVAS !== 'undefined' && Object.keys(RECETAS_NUEVAS).length > 0) {
    const allRecipes = Object.values(RECETAS_NUEVAS).filter(r => r.tipo === tipo || r.tipo === 'aprovechamiento' || r.tipo === 'normal' || !r.tipo);
    if (allRecipes.length > 0) {
      alts = allRecipes.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
  }
  if (alts.length === 0) {
    alts = (ALTERNATIVAS[tipo] || []).sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
  
  // Filtrar cuarentenas y borradas
  alts = alts.filter(a => !STATE.quarantineRecipes.includes(a.id) && !STATE.deletedRecipes.includes(a.id));


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
          <span class="alt-emoji">${a.icono || '🍲'}</span>
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
        if (STATE.customMenu[dia]) delete STATE.customMenu[dia][tipo];
        STATE.semana[dia][tipo] = getSemanaActual()[dia][tipo];
        setMealStatus(dia, tipo, 'accepted');
        showToast('✅ Menú original mantenido', 'success');
      } else {
        if (!STATE.customMenu[dia]) STATE.customMenu[dia] = {};
        STATE.customMenu[dia][tipo] = id;
        STATE.semana[dia][tipo] = getRecetaById(id) || alts.find(a => a.id === id) || STATE.semana[dia][tipo];
        setMealStatus(dia, tipo, 'alternative');
        showToast('✅ Alternativa seleccionada', 'success');
      }
      saveState();
      closeModal();
      renderPlanSemanal();
      renderHoy();
    });
  });

  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
}

// ── QUARANTINE MODAL ──────────────────────────────────────────
function showQuarantineModal() {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  // Asegurar que exista state de borrados
  if (!STATE.deletedRecipes) STATE.deletedRecipes = [];

  let listHTML = '';

  if (!STATE.quarantineRecipes || STATE.quarantineRecipes.length === 0) {
    listHTML = `<div class="empty-state" style="padding:40px 20px">
                  <div class="empty-icon">✨</div>
                  <h3>No hay recetas en cuarentena</h3>
                  <p>Las recetas que mandes a cuarentena aparecerán aquí.</p>
                </div>`;
  } else {
    listHTML = `<div class="alternatives-list" style="margin-top:10px;">` + 
      STATE.quarantineRecipes.map(id => {
        const recipe = getRecetaById(id) || { id, nombre: 'Receta desconocida', icono: '🍽️' };
        return `
          <div class="alt-card" style="display:flex; justify-content:space-between; align-items:center; cursor:default;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="alt-emoji">${recipe.icono || '🍽️'}</span>
              <div class="alt-info">
                <h4>${recipe.nombre}</h4>
                <p style="font-size:0.75rem;">En cuarentena</p>
              </div>
            </div>
            <div style="display:flex; gap: 8px;">
              <button class="icon-btn btn-restore-quarantine" data-id="${id}" style="background:var(--success);color:var(--bg);font-size:1rem;width:35px;height:35px;" title="Devolver al recetario">♻️</button>
              <button class="icon-btn btn-delete-quarantine" data-id="${id}" style="background:var(--danger);color:var(--bg);font-size:1rem;width:35px;height:35px;" title="Eliminar para siempre">🗑️</button>
            </div>
          </div>
        `;
      }).join('') + `</div>`;
  }

  content.innerHTML = `
    <div class="modal-handle"></div>
    <div class="modal-header" style="text-align:center;padding:20px 20px 10px;">
      <div class="modal-emoji">🚫</div>
      <div class="modal-title">Recetas en Cuarentena</div>
      <p style="text-align:center;padding:0 20px;color:var(--text-muted);font-size:.88rem">
        Gestiona las recetas bloqueadas. Puedes devolverlas o eliminarlas permanentemente.
      </p>
    </div>
    ${listHTML}
    <div class="modal-close-btn" style="margin-top:20px;">
      <button class="btn-full" id="close-quarantine-btn">Cerrar</button>
    </div>`;

  modal.classList.add('open');

  // Event Listeners
  document.querySelectorAll('.btn-restore-quarantine').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      STATE.quarantineRecipes = STATE.quarantineRecipes.filter(r => r !== id);
      saveState();
      showToast('✅ Receta devuelta al recetario', 'success');
      showQuarantineModal(); // Refresh modal
    });
  });

  document.querySelectorAll('.btn-delete-quarantine').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if(confirm('¿Estás seguro de eliminar esta receta para siempre?')) {
        const id = e.currentTarget.dataset.id;
        STATE.quarantineRecipes = STATE.quarantineRecipes.filter(r => r !== id);
        if (!STATE.deletedRecipes.includes(id)) {
          STATE.deletedRecipes.push(id);
        }
        // Cleanup custom recipe
        if (STATE.customRecipes && STATE.customRecipes[id]) {
          delete STATE.customRecipes[id];
        }
        saveState();
        showToast('🗑️ Receta eliminada para siempre', 'error');
        showQuarantineModal(); // Refresh modal
      }
    });
  });

  document.getElementById('close-quarantine-btn').addEventListener('click', () => {
    closeModal();
    renderRecipes(); // Render recipes to sync views
  });
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

  // Filtrar cuarentenas y borradas para no listarlas en el recetario principal
  filtered = filtered.filter(m => !STATE.quarantineRecipes.includes(m.id) && !STATE.deletedRecipes.includes(m.id));

  function getRecipeCategory(meal) {
    const text = ((meal.nombre || '') + " " + (meal.descripcion || '')).toLowerCase();
    
    if (/pescado|salmón|salmon|sardina|boqueron|merluza|atún|atun|marisco|langostino|calamar|pulpo|bacalao|lubina|dorada/i.test(text)) return '🐟 Pescados y Mariscos';
    if (/carne|pollo|cerdo|ternera|pavo|lomo|hamburguesa|burger|pechuga|albóndigas|albondigas|salchicha|costilla/i.test(text)) return '🥩 Carnes y Aves';
    if (/pasta|macarrones|espagueti|spaghetti|arroz|risotto|fideo|gnocchi/i.test(text)) return '🍝 Pasta y Arroces';
    if (/garbanzo|lenteja|alubia|hummus|guisante|frijol/i.test(text)) return '🫘 Legumbres';
    if (/ensa[l|r]ada|verdura|calabaza|pepino|pimiento|berenjena|setas|champiñon|champiñón|tomate|gazpacho|zanahoria|kale|aguacate/i.test(text)) return '🥗 Verduras y Ensaladas';
    
    return '🍽️ Variados / Otros';
  }

  const listEl = document.getElementById('recipe-list');
  if (!filtered.length) {
    listEl.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><h3>Sin resultados</h3><p>Prueba con otra búsqueda</p></div>`;
    return;
  }

  // Agrupar por género
  const categories = {};
  filtered.forEach(m => {
    const cat = getRecipeCategory(m);
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(m);
  });

  const sortedCategories = Object.keys(categories).sort();

  listEl.innerHTML = sortedCategories.map(cat => {
    const recipesHtml = categories[cat].map(m => `
      <div class="recipe-card ${m.esNueva ? 'recipe-card-nueva' : ''}" data-id="${m.id}" data-tipo="${m.mealType || 'cena'}">
        <div class="recipe-emoji">${m.icono}</div>
        <div class="recipe-info">
          <h3 style="margin-bottom:4px;">${m.nombre}</h3>
          <div class="recipe-meta">
            <span>⏱ ${m.tiempo} min</span>
            <span>👥 ${m.porciones} pers.</span>
            <span>${m.tipo === 'aprovechamiento' ? '♻️ Aprovech.' : m.esNueva ? '📖 Recetario' : '🥗 Menú'}</span>
          </div>
        </div>
        <span class="recipe-chevron">›</span>
      </div>`).join('');

    return `
      <details class="recipe-category" style="margin-bottom: 5px;">
        <summary style="font-size: 1.1rem; color: var(--accent); border-bottom: 2px solid var(--border); padding-bottom: 5px; margin: 20px 0 10px; cursor: pointer; font-weight: bold; list-style: none;">
          ${cat} <span style="float: right; font-size: 0.9rem; margin-top: 4px;">▼</span>
        </summary>
        <div style="margin-top: 10px;">
          ${recipesHtml}
        </div>
      </details>
    `;
  }).join('');

  listEl.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
      const meal = allMeals.find(m => m.id === card.dataset.id);
      if (meal) openMealModal(meal, null, card.dataset.tipo);
    });
  });
}


// ── HELPER: EMPAREJAMIENTO DE INGREDIENTES ─────────────────────────────────
function areIngredientsSimilar(a, b) {
  if (!a || typeof a !== 'string' || !b || typeof b !== 'string') return false;
  const normA = a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  const normB = b.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  
  if (normA === normB || normA+'s'===normB || normB+'s'===normA || normA+'es'===normB || normB+'es'===normA) return true;
  
  // Basic stemming for regular Spanish plurals
  const stem = str => str.replace(/\b(\w{3,})es\b/g, '$1').replace(/\b(\w{2,})s\b/g, '$1');
  const sA = stem(normA);
  const sB = stem(normB);
  
  // Word matching logic (avoiding substring boundaries like 'sal' in 'salmon')
  const escA = sA.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escB = sB.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  if (new RegExp(`\\b${escA}\\b`).test(sB)) return true;
  if (new RegExp(`\\b${escB}\\b`).test(sA)) return true;

  return false;
}

// ── VIEW: COMPRA (ASISTENTE) ────────────────────────────────────────────
let pendingShoppingItems = [];

function openShoppingAssistant() {
  const items = {};

  DIAS.forEach(dia => {
    const diaData = STATE.semana[dia];
    const comidaStatus = getMealStatus(dia, 'comida');
    const cenaStatus   = getMealStatus(dia, 'cena');

    if (comidaStatus !== 'rejected') {
      diaData.comida.ingredientes.forEach(ing => {
        if (ing.comprar) {
          const key = ing.nombre.toLowerCase();
          if (!items[key]) items[key] = { ...ing, dias: [DIAS_LABEL[dia]], recetas: [diaData.comida.nombre], tipo: 'comida' };
          else {
            if (!items[key].dias.includes(DIAS_LABEL[dia])) items[key].dias.push(DIAS_LABEL[dia]);
            if (!items[key].recetas.includes(diaData.comida.nombre)) items[key].recetas.push(diaData.comida.nombre);
          }
        }
      });
    }
    if (cenaStatus !== 'rejected') {
      diaData.cena.ingredientes.forEach(ing => {
        if (ing.comprar) {
          const key = ing.nombre.toLowerCase();
          if (!items[key]) items[key] = { ...ing, dias: [DIAS_LABEL[dia]], recetas: [diaData.cena.nombre], tipo: 'cena' };
          else {
            if (!items[key].dias.includes(DIAS_LABEL[dia])) items[key].dias.push(DIAS_LABEL[dia]);
            if (!items[key].recetas.includes(diaData.cena.nombre)) items[key].recetas.push(diaData.cena.nombre);
          }
        }
      });
    }
  });

  pendingShoppingItems = Object.values(items).map(item => {
    let checked = false;
    let tengo = null;
    let tengoUnit = '';
    
    // Comparar con mi Despensa automáticamente
    if (STATE.desvan) {
       const dsv = STATE.desvan.find(d => areIngredientsSimilar(item.nombre, d.nombre));
       if (dsv && dsv.cantidad > 0) {
         tengo = dsv.cantidad;
         tengoUnit = dsv.unidad || '';
       }
    }
    
    return { ...item, checked, tengo, tengoUnit, originalCantidad: parseFloat(item.cantidad) };
  });

  renderShoppingAssistant();
  document.getElementById('assistant-modal').style.display = 'flex';
}

function renderShoppingAssistant() {
  const container = document.getElementById('assistant-items');
  if (pendingShoppingItems.length === 0) {
     container.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding: 20px;">No hay ingredientes pendientes de revisar en el planificado.</p>`;
     return;
  }

  let html = '';
  pendingShoppingItems.forEach((item, i) => {
      // Comparativa
      const diffHtml = item.tengo !== null
          ? `<span style="color:var(--info); font-weight:bold; font-size:1.1rem;">${item.tengo} <small style="font-size:0.7rem; font-weight:normal;">${item.tengoUnit}</small></span>` 
          : `<span style="color:var(--error); font-weight:bold; font-size:1.1rem;">0 <small style="font-size:0.7rem; font-weight:normal;">${parseQtyUnit(item.cantidad)}</small></span>`;
          
      let proposedBuy = item.originalCantidad;
      if (item.tengo !== null && item.tengo > 0) {
          // Usamos la nueva función inteligente para saber cuánto proponer
          const remStr = calcRemaining(item.cantidad, item.tengo, item.tengoUnit);
          if (remStr === null) {
              proposedBuy = 0; // Ya se tiene todo
          } else {
              const remN = parseQtyNumber(remStr);
              proposedBuy = remN !== null ? remN : item.originalCantidad;
          }
      }

      html += `
       <div class="assistant-item fade-in-up" style="display:flex; flex-direction:column; background:#111; border:1px solid #333; border-radius:12px; padding:16px;">
         <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <strong style="color:var(--primary); font-size:1.1rem;">${item.nombre}</strong>
            <span style="font-size:0.75rem; color:var(--text-muted); background:rgba(255,255,255,0.1); padding:4px 8px; border-radius:6px; max-width: 120px; text-align: right; line-height: 1.2;">Para: ${item.dias ? item.dias.join(', ') : ''}</span>
         </div>
         <div style="display:flex; justify-content:space-between; margin-top:14px; font-size:0.9rem; align-items:flex-end;">
            <div style="flex:1;">
               <span style="color:var(--text-muted); font-size:0.7rem; display:block; margin-bottom:2px;">NECESITAMOS</span>
               <strong style="font-size:1.1rem;">${item.originalCantidad}</strong> <small style="color:var(--text-muted);">${parseQtyUnit(item.cantidad) || 'ud'}</small>
            </div>
            <div style="flex:1; text-align:center;">
               <span style="color:var(--text-muted); font-size:0.7rem; display:block; margin-bottom:2px;">EN DESPENSA</span>
               ${diffHtml}
            </div>
            <div style="flex:1.2; text-align:right;">
               <span style="color:var(--text-muted); font-size:0.7rem; display:block; margin-bottom:2px;">🛒 A COMPRAR</span>
               <input type="number" id="assist-qty-${i}" value="${proposedBuy}" step="any" min="0" style="width:65px; height: 32px; text-align:right; border-radius:6px; border:1px solid var(--accent); background:#222; color:white; font-size: 1rem; padding: 0 4px;"> <small style="color:var(--text-muted);">${parseQtyUnit(item.cantidad) || 'ud'}</small>
            </div>
         </div>
         <button class="btn-assistant-accept" onclick="acceptAssistantItem(${i})" style="margin-top:16px; background:linear-gradient(135deg, var(--accent), #15e364); color:var(--bg); border:none; padding:12px; border-radius:10px; cursor:pointer; font-weight:700; font-size:0.95rem; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow: 0 4px 12px rgba(34,197,94,0.2);">
            <span style="font-size:1.1rem;">✅</span> Incorporar a la Compra
         </button>
      </div>
      `;
  });
  container.innerHTML = html;
}

window.acceptAssistantItem = function(index) {
   const item = pendingShoppingItems[index];
   const buyQtyInput = document.getElementById(`assist-qty-${index}`);
   const buyQty = parseFloat(buyQtyInput.value);

   if (!isNaN(buyQty)) {
      const exIdx = STATE.shopping.findIndex(s => s.nombre.toLowerCase() === item.nombre.toLowerCase());
      
      if (buyQty > 0) {
          if (exIdx >= 0) {
             let currentQty = parseFloat(STATE.shopping[exIdx].cantidad) || 0;
             STATE.shopping[exIdx].cantidad = currentQty + buyQty;
             STATE.shopping[exIdx].tengo = null;
             STATE.shopping[exIdx].checked = false;
          } else {
             item.cantidad = buyQty;
             item.tengo = null;
             item.checked = false;
             STATE.shopping.unshift(item);
          }
      }
      
      saveState();
      renderShopping();
   }

   // Animación rápida y borrar
   pendingShoppingItems.splice(index, 1);
   
   if (pendingShoppingItems.length === 0) {
      document.getElementById('assistant-modal').style.display = 'none';
      showToast('¡Asistente finalizado! Revisa tu lista.', 'success');
   } else {
       if (navigator.vibrate) navigator.vibrate(50);
       renderShoppingAssistant();
   }
};

document.addEventListener('DOMContentLoaded', () => {
    const btnCloseAssist = document.getElementById('btn-close-assistant');
    if (btnCloseAssist) {
        btnCloseAssist.addEventListener('click', () => {
            document.getElementById('assistant-modal').style.display = 'none';
        });
    }
});

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
    // Sincronizar dinámicamente con Despensa en tiempo real
    if (STATE.desvan) {
       const dsv = STATE.desvan.find(d => areIngredientsSimilar(item.nombre, d.nombre));
       if (dsv && dsv.cantidad > 0) {
           item.tengo = dsv.cantidad;
           item.tengoUnit = dsv.unidad || '';
       } else {
           item.tengo = null;
           item.tengoUnit = '';
       }
    }

    const cat = categorize(item.nombre);
    // Calcular cantidad restante teniendo en cuenta el stock y las unidades
    let remaining = calcRemaining(item.cantidad, item.tengo, item.tengoUnit);
    let yaCompleto  = remaining === null; // Ya tiene suficiente
    
    if (item.comprarForzado) {
       remaining = item.cantidad; // Forzamos mostrar lo que dice
       yaCompleto = false;
    }
    
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

  // Event: click en toda la tarjeta muestra para qué es (días y recetas)
  container.querySelectorAll('.shopping-item').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const idx = +el.dataset.idx;
      const itemNode = STATE.shopping[idx];
      const diasStr = itemNode.dias ? itemNode.dias.join(', ') : 'Desconocido';
      const recetasStr = itemNode.recetas ? itemNode.recetas.join(', ') : 'Desconocido';
      
      alert(`📌 ${itemNode.nombre.toUpperCase()}\n\n📅 Días: ${diasStr}\n🍲 Recetas: ${recetasStr}`);
    });
  });

  container.querySelectorAll('.sh-del-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const idx = +btn.dataset.idx;
      const itemNode = STATE.shopping[idx];
      if (confirm(`¿Estás seguro de que deseas eliminar "${itemNode.nombre}" de la lista de la compra?`)) {
        
        if (confirm(`¿Quieres registrar "${itemNode.nombre}" en la Despensa antes de borrarlo?\n(Pulsa Cancelar si solo quieres borrarlo sin guardarlo)`)) {
             const qty = parseFloat(parseQtyNumber(itemNode.cantidad)) || 1;
             const unit = parseQtyUnit(itemNode.cantidad) || 'ud';
             const dsv = STATE.desvan.find(d => areIngredientsSimilar(itemNode.nombre, d.nombre));
             
             if (dsv) {
               dsv.cantidad += qty;
             } else {
               const nombreClass = itemNode.nombre.charAt(0).toUpperCase() + itemNode.nombre.slice(1).toLowerCase();
               STATE.desvan.push({
                 id: Date.now().toString() + Math.random(),
                 nombre: nombreClass,
                 cantidad: qty,
                 unidad: unit,
                 vigilar: true
               });
             }
             if (typeof renderDesvan === 'function') renderDesvan();
             showToast(`📦 ${itemNode.nombre} añadido a Despensa`, 'success');
        }

        STATE.shopping.splice(idx, 1);
        // actualizamos índices de todo lo demás
        STATE.shopping.forEach((it, i) => it.idx = i);
        saveState();
        renderShopping();
      }
    });
  });

  container.querySelectorAll('.sh-force-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const idx = +btn.dataset.idx;
      STATE.shopping[idx].comprarForzado = true;
      saveState();
      renderShopping();
    });
  });

  container.querySelectorAll('.sh-unforce-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const idx = +btn.dataset.idx;
      STATE.shopping[idx].comprarForzado = false;
      saveState();
      renderShopping();
    });
  });

  container.querySelectorAll('.sh-edit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const idx = +btn.dataset.idx;
      const itemNode = STATE.shopping[idx];
      const unit = parseQtyUnit(itemNode.cantidad);
      const prevNum = parseQtyNumber(itemNode.cantidad);
      const newQty = prompt(`Introduce la nueva cantidad que necesitas comprar de "${itemNode.nombre}" (ejemplo: ${prevNum})\n\n*(Deja '${unit}' intacto o ignóralo si solo cambias el número)*`, prevNum);
      if (newQty !== null) {
        const floatNuevo = parseFloat(newQty);
        if (!isNaN(floatNuevo) && floatNuevo > 0) {
          // mantenemos la unidad original
          itemNode.cantidad = `${floatNuevo} ${unit}`.trim();
          saveState();
          renderShopping();
        } else if (floatNuevo === 0) {
           if (confirm("Al poner 0, se eliminará o marcará como completo. ¿Deseas eliminarlo?")) {
              STATE.shopping.splice(idx, 1);
              STATE.shopping.forEach((it, i) => it.idx = i);
              saveState();
              renderShopping();
           }
        }
      }
    });
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

  const despensaUnit = item.tengoUnit ? ` ${item.tengoUnit}` : '';
  const bottomRowHtml = `
    <div class="sh-bottom-row" style="font-size:0.75rem; color:var(--text-muted); display:flex; justify-content:space-between; margin-top:4px;">
      <span>Receta pide: <strong style="color:#ddd">${item.cantidad}</strong></span>
      <span>En Despensa: <strong style="color:#ddd">${tengoVal || 0}${despensaUnit}</strong></span>
    </div>
  `;

  let forceAddBtn = '';
  if (yaCompleto && !item.comprarForzado) {
    forceAddBtn = `<span class="sh-force-btn" data-idx="${item.idx}" style="font-size: 0.8rem; padding: 6px 10px; background: rgba(50,200,50,0.15); border:1px solid var(--accent); color:var(--accent); border-radius: 6px; font-weight:bold; height:auto; text-transform:uppercase;" title="Comprar de todos modos">Añadir 🛒</span>`;
  }
  
  let unforceAddBtn = '';
  if (item.comprarForzado) {
    unforceAddBtn = `<span class="sh-unforce-btn" data-idx="${item.idx}" style="font-size: 0.8rem; padding: 6px 10px; background: rgba(200,50,50,0.15); border:1px solid var(--error); color:var(--error); border-radius: 6px; font-weight:bold; height:auto; text-transform:uppercase;" title="Dejar de forzar compra">Quitar ❌</span>`;
  }

  return `
    <div class="${clases}" data-idx="${item.idx}" style="cursor: pointer; position: relative; display: flex; align-items: center;">
      ${(completado || yaCompleto) ? '<div style="position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:1.2rem; filter:grayscale(1) opacity(0.5);">✅</div><div class="sh-body" style="padding-left: 28px; flex: 1;">' : '<div class="sh-body" style="flex: 1;">'}
        <div class="sh-top-row">
          <span class="sh-name ${yaCompleto ? 'sh-name-done' : ''}">${item.nombre}</span>
          <span class="sh-qty-wrap">
            ${precioBadge}
            ${cantidadMostrar}
          </span>
        </div>
        ${bottomRowHtml}
      </div>
      <div class="sh-actions-right" style="padding-left: 8px; display: flex; gap: 8px; align-items: center;">
        ${forceAddBtn}
        ${unforceAddBtn}
        <span class="sh-edit-btn" data-idx="${item.idx}" style="font-size: 1.1rem; padding: 4px; background: rgba(255,255,255,0.05); border-radius: 4px;" title="Editar cantidad">✏️</span>
        <span class="sh-del-btn" data-idx="${item.idx}" style="font-size: 1.1rem; padding: 4px; background: rgba(255,100,100,0.1); border-radius: 4px;" title="Borrar artículo">🗑️</span>
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

  // 🔍 Buscar versión completa de la receta (con imagen) en RECETAS_NUEVAS
  if (typeof RECETAS_NUEVAS !== 'undefined') {
    const fullById = RECETAS_NUEVAS[meal.id];
    // Buscar también por nombre similar si no coincide el ID
    const fullByName = !fullById ? Object.values(RECETAS_NUEVAS).find(r =>
      r.nombre && meal.nombre && r.nombre.toLowerCase().trim() === meal.nombre.toLowerCase().trim()
    ) : null;
    const full = fullById || fullByName;
    if (full) {
      if (full.imagen && !meal.imagen) meal.imagen = full.imagen;
      if (full.ingredientes && full.ingredientes.length > 0 && (!meal.ingredientes || meal.ingredientes.length === 0)) meal.ingredientes = full.ingredientes;
      if (full.pasos && full.pasos.length > 0 && (!meal.pasos || meal.pasos.length === 0)) meal.pasos = full.pasos;
      if (full.descripcion && !meal.descripcion) meal.descripcion = full.descripcion;
      if (full.nutricion) meal.nutricion = Object.assign({}, full.nutricion, meal.nutricion);
    }
  }

  // Fallbacks para datos ausentes (común en recetas externas)
  meal.ingredientes = meal.ingredientes || [];
  meal.pasos = meal.pasos && meal.pasos.length > 0 ? meal.pasos : ["Sigue tu instinto en la cocina o busca inspiración online."];
  meal.nutricion = meal.nutricion || { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 };

  const totalMacros = (meal.nutricion.proteinas || 0) + (meal.nutricion.carbohidratos || 0) + (meal.nutricion.grasas || 0) || 1;
  const protPct = Math.round(((meal.nutricion.proteinas || 0) / totalMacros) * 100);
  const carbPct = Math.round(((meal.nutricion.carbohidratos || 0) / totalMacros) * 100);
  const fatPct  = Math.round(((meal.nutricion.grasas || 0) / totalMacros) * 100);

  content.innerHTML = `
    <div class="modal-handle"></div>
    <div style="width:100%; height:200px; border-radius:12px; margin-bottom:15px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1); background:#111;">
      <img src="${meal.imagen || `https://image.pollinations.ai/prompt/delicious%20professional%20food%20photography%20of%20${encodeURIComponent(meal.nombre)}?width=600&height=400&nologo=true`}" style="width:100%; height:100%; object-fit:cover; display:block;" alt="${meal.nombre}" loading="lazy">
    </div>
    <div class="modal-header">
      <div class="modal-emoji">${meal.icono}</div>
      <div class="modal-title">${meal.nombre}</div>
      <p class="modal-desc">${meal.descripcion}</p>
      <div class="modal-badges">
        <span class="modal-badge badge-tiempo">⏱ ${meal.tiempo} min</span>
        <span class="modal-badge badge-porciones">👥 ${meal.porciones} pers.</span>
        <span class="modal-badge badge-tipo">${meal.tipo === 'aprovechamiento' ? '♻️ Aprovechamiento' : '🥗 Receta'}</span>
      </div>
    </div>

    <div style="padding:0 20px 10px;">
      <button id="btn-play-recipe-audio" class="btn-primary" style="width:100%; border-radius:12px; background:var(--accent); color:var(--bg); border:none; padding:12px; font-weight:bold; cursor:pointer;">
        🎙️ Escuchar receta de Arguiñano
      </button>
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
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h3>🥕 Ingredientes</h3>
        <button id="btn-add-ingredient" style="font-size:1.2rem; background:none; border:none; cursor:pointer;" title="Añadir ingrediente">➕</button>
      </div>
      <ul class="ingredient-list">
         ${meal.ingredientes.map((ing, idx) => {
           let nombre, cantidad;
           if (typeof ing === 'string') {
             // Detectar "400g garbanzos", "Garbanzos 400g", "2 latas atún", "sal", etc.
             const mFront = ing.match(/^([\d,.\/ ]*\s*(?:kg?|g|ml|l|cl|dl|uds?|cdas?|cditas?|tazas?|latas?|puñados?|manojos?|dientes?|piezas?|filetes?|bolsas?)\.?)\s+(.+)$/i);
             const mBack  = ing.match(/^(.+?)\s+([\d,.\/ ]*\s*(?:kg?|g|ml|l|cl|dl|uds?|cdas?|cditas?|tazas?|latas?|puñados?)\.?)$/i);
             if (mFront && mFront[1].trim()) { cantidad = mFront[1].trim(); nombre = mFront[2].trim(); }
             else if (mBack && mBack[2].trim() && /\d/.test(mBack[2])) { nombre = mBack[1].trim(); cantidad = mBack[2].trim(); }
             else { cantidad = ''; nombre = ing; }
           } else { nombre = ing.nombre || ''; cantidad = ing.cantidad || ''; }
           return `
           <li class="ingredient-item" style="display:flex; justify-content:space-between; align-items:center;">
             <div style="flex:1">
               <span class="ingredient-name">${nombre}</span>
               <span class="ingredient-qty" style="color:var(--text-muted); font-size:0.85rem; margin-left:8px;">${cantidad}</span>
             </div>
             <div style="display:flex; gap:8px;">
               <button class="btn-edit-ing" data-idx="${idx}" style="font-size:1rem; background:none; border:none; cursor:pointer;" title="Editar">✏️</button>
               <button class="btn-del-ing" data-idx="${idx}" style="font-size:1rem; background:none; border:none; cursor:pointer;" title="Eliminar">🗑️</button>
             </div>
           </li>`;
         }).join('')}
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

    <div class="modal-close-btn" style="display:flex; flex-direction:column; gap:10px; margin-top:20px;">
      <button class="btn-full" id="btn-quarantine-recipe" style="background:#cc3333; color:white; border:none;" title="No volver a mostrar en los planes semanales">🚫 Mandar a cuarentena</button>
      <button class="btn-full" id="modal-close-btn">Cerrar</button>
    </div>`;

  modal.classList.add('open');
  setTimeout(() => content.scrollTop = 0, 50);

  document.getElementById('modal-close-btn').addEventListener('click', closeModal);

  // -- Edit Ingredients Logic --
  document.getElementById('btn-add-ingredient').addEventListener('click', () => {
    const nombre = prompt('Nombre del nuevo ingrediente:');
    if (!nombre) return;
    const cantidad = prompt('Cantidad (ej. 2 uds, 100g):');
    if (!cantidad) return;
    
    let clonedMeal = JSON.parse(JSON.stringify(meal));
    clonedMeal.ingredientes.push({ nombre, cantidad, comprar: true });
    STATE.customRecipes[clonedMeal.id] = clonedMeal;
    saveState();
    openMealModal(clonedMeal, dia, tipo); // re-render
  });

  document.querySelectorAll('.btn-edit-ing').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.currentTarget.dataset.idx;
      const ing = meal.ingredientes[idx];
      const newQty = prompt(`Nueva cantidad para ${ing.nombre}:`, ing.cantidad);
      if (newQty !== null && newQty !== ing.cantidad) {
        let clonedMeal = JSON.parse(JSON.stringify(meal));
        clonedMeal.ingredientes[idx].cantidad = newQty;
        STATE.customRecipes[clonedMeal.id] = clonedMeal;
        saveState();
        openMealModal(clonedMeal, dia, tipo);
      }
    });
  });

  document.querySelectorAll('.btn-del-ing').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (confirm('¿Seguro que quieres eliminar este ingrediente de la receta?')) {
        const idx = e.currentTarget.dataset.idx;
        let clonedMeal = JSON.parse(JSON.stringify(meal));
        clonedMeal.ingredientes.splice(idx, 1);
        STATE.customRecipes[clonedMeal.id] = clonedMeal;
        saveState();
        openMealModal(clonedMeal, dia, tipo);
      }
    });
  });

  // -- Quarantine Logic --
  document.getElementById('btn-quarantine-recipe').addEventListener('click', () => {
    if (confirm('¿Estás seguro de mandar esta receta a cuarentena? No volverá a planificarse en las semanas ni aparecerá en alternativas.')) {
      if (!STATE.quarantineRecipes.includes(meal.id)) {
        STATE.quarantineRecipes.push(meal.id);
        saveState();
      }
      showToast('🚫 Receta en cuarentena', 'warning');
      
      // Si la receta apartada era de este día planificado, la marcamos rechazada.
      if (dia) {
        setMealStatus(dia, tipo, 'rejected');
      }
      
      closeModal();
      renderPlanSemanal();
      renderHoy();
    }
  });

  const btnPlayAudio = document.getElementById('btn-play-recipe-audio');
  if (btnPlayAudio) {
    btnPlayAudio.addEventListener('click', () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        btnPlayAudio.innerHTML = '🎙️ Escuchar receta (Sintetizador)';
        return;
      }
      btnPlayAudio.innerHTML = '🛑 Detener audio';
      const textToRead = `¡Muy buenas familia! Hoy vamos a preparar una recetita estupenda: ${meal.nombre}. 
      Atentos a los ingredientes. Necesitaremos puras cosas buenas: ${meal.ingredientes.map(i => i.cantidad + ' de ' + i.nombre).join(', ')}. 
      Y ahora, al lío con la preparación: ${meal.pasos.join('. ')}. 
      Y como siempre digo, ¡una ramita de perejil, rico, rico, y con fundamento! Que aproveche.`;
      
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'es-ES';
      utterance.rate = 0.95; // Ligeramente más lento y pausado
      utterance.pitch = 0.8; // Voz un poco más grave
      
      const voices = window.speechSynthesis.getVoices();
      // Buscamos voces masculinas en español
      const maleVoice = voices.find(v => v.lang.startsWith('es') && (v.name.toLowerCase().includes('diego') || v.name.toLowerCase().includes('pablo') || v.name.toLowerCase().includes('jorge') || v.name.toLowerCase().includes('male')));
      if (maleVoice) utterance.voice = maleVoice;
      
      utterance.onend = () => { btnPlayAudio.innerHTML = '🎙️ Escuchar receta de Arguiñano'; };
      window.speechSynthesis.speak(utterance);
    });
  }

  if (dia) {
    content.querySelector('.btn-modal-accept').addEventListener('click', () => {
      setMealStatus(dia, tipo, 'accepted');
      deductFromDesvan(dia, tipo);
      closeModal();
      renderPlanSemanal(); renderHoy();
      showToast('✅ Menú confirmado y descontado de la despensa', 'success');
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
  if (window.speechSynthesis && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
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

// ── IMPORTAR RECETAS (URL / PDF) ────────────────────────────
const IMPORT_RECIPE_PROMPT = `Eres un extractor experto de recetas de cocina. A partir del contenido proporcionado, identifica TODAS las recetas que encuentres.
Devuelve ÚNICAMENTE un array JSON válido (sin markdown, sin texto antes ni después). Cada receta debe seguir EXACTAMENTE este esquema:
[{
  "nombre": "Nombre de la receta",
  "tipo": "comida",
  "porciones": 4,
  "tiempo": 30,
  "icono": "🍽️",
  "descripcion": "Descripción breve y apetecible",
  "ingredientes": [ { "nombre": "Ingrediente", "cantidad": "200 g", "comprar": false } ],
  "pasos": [ "Paso 1 detallado", "Paso 2 detallado" ],
  "nutricion": { "calorias": 0, "proteinas": 0, "carbohidratos": 0, "grasas": 0, "fibra": 0 },
  "nota": "📥 Importado"
}]
Reglas:
- "tipo" debe ser "comida", "cena" o "aprovechamiento" (por defecto "comida").
- "icono" un único emoji representativo del plato.
- Estima valores nutricionales razonables por ración si no aparecen.
- Traduce todo al español si el contenido está en otro idioma.
- Si no hay ninguna receta, devuelve exactamente [].`;

function slugify(str) {
  return (str || 'receta').toString().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'receta';
}

function setImportStatus(msg, working) {
  const el = document.getElementById('import-status');
  if (el) el.innerHTML = working ? `⏳ ${msg}` : msg;
}

function normalizeImportedRecipe(r) {
  const nombre = r.nombre || r.title || 'Receta importada';
  const id = slugify(nombre) + '-' + Date.now().toString(36) + Math.floor(Math.random() * 1000);
  let tipo = (r.tipo || 'comida').toString().toLowerCase();
  if (!['comida', 'cena', 'aprovechamiento'].includes(tipo)) tipo = 'comida';
  return {
    id,
    nombre,
    tipo,
    mealType: tipo === 'aprovechamiento' ? 'cena' : tipo,
    porciones: r.porciones || 2,
    tiempo: r.tiempo || 30,
    icono: r.icono || '🍽️',
    descripcion: r.descripcion || '',
    ingredientes: Array.isArray(r.ingredientes) ? r.ingredientes.map(i => (typeof i === 'string'
      ? { nombre: i, cantidad: '', comprar: false }
      : { nombre: i.nombre || i.name || '', cantidad: i.cantidad || i.qty || '', comprar: i.comprar !== undefined ? !!i.comprar : false })) : [],
    pasos: Array.isArray(r.pasos) ? r.pasos : (Array.isArray(r.steps) ? r.steps : []),
    nutricion: r.nutricion || { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0, fibra: 0 },
    nota: r.nota || '📥 Importado',
    esNueva: true
  };
}

function parseRecipesFromGemini(data) {
  let jsonText = data && data.candidates && data.candidates[0] &&
    data.candidates[0].content && data.candidates[0].content.parts &&
    data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text;
  if (!jsonText) throw new Error('La IA no devolvió contenido.');
  jsonText = jsonText.replace(/```json/gi, '').replace(/```/g, '').trim();
  // Recortar a los límites del array/objeto por si añade texto
  const firstBracket = jsonText.search(/[\[{]/);
  if (firstBracket > 0) jsonText = jsonText.slice(firstBracket);
  let parsed = JSON.parse(jsonText);
  if (!Array.isArray(parsed)) parsed = [parsed];
  return parsed;
}

function finishImport(recipes) {
  recipes = (recipes || []).filter(r => r && (r.nombre || r.title));
  if (!recipes.length) {
    showToast('No se encontró ninguna receta en la fuente.', 'warning');
    setImportStatus('No se encontró ninguna receta. Prueba con otra fuente.', false);
    return;
  }
  const saved = [];
  recipes.forEach(raw => {
    const rec = normalizeImportedRecipe(raw);
    STATE.importedRecipes[rec.id] = rec;
    if (typeof RECETAS_NUEVAS !== 'undefined') RECETAS_NUEVAS[rec.id] = rec;
    saved.push(rec);
  });
  saveState();
  renderRecipes();

  setImportStatus(`✅ ${saved.length} receta(s) guardada(s) en tu recetario.`, false);
  showToast(`✅ ${saved.length} receta(s) importada(s)`, 'success');

  if (saved[0] && typeof openMealModal === 'function') {
    openMealModal(saved[0], null, saved[0].tipo);
  }
}

async function handleImportUrl(url) {
  if (!url) { showToast('Pega primero una URL.', 'warning'); return; }
  if (!/^https?:\/\//i.test(url)) { showToast('La URL debe empezar por http:// o https://', 'warning'); return; }

  const btn = document.getElementById('btn-import-url');
  const orig = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '⏳ Importando…'; btn.style.opacity = '0.7'; }
  setImportStatus('Leyendo la página…', true);

  try {
    const r = await fetch('/api/fetch-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.error || 'No se pudo leer la página.');
    }
    const { text } = await r.json();
    if (!text || text.length < 40) throw new Error('La página no tiene contenido legible.');

    setImportStatus('Extrayendo la receta con IA…', true);
    const resp = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: IMPORT_RECIPE_PROMPT + '\n\nCONTENIDO:\n' + text.slice(0, 18000) }] }],
        generationConfig: { temperature: 0.4 }
      })
    });
    if (!resp.ok) throw new Error('La IA no pudo procesar la receta.');
    finishImport(parseRecipesFromGemini(await resp.json()));
  } catch (err) {
    console.error('Import URL error:', err);
    showToast('❌ ' + err.message, 'error');
    setImportStatus('❌ ' + err.message, false);
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = orig; btn.style.opacity = '1'; }
  }
}

async function handleImportPdf(file) {
  if (file.size > 4.5 * 1024 * 1024) {
    showToast('El PDF es demasiado grande (máx. ~4.5 MB).', 'warning');
    setImportStatus('El PDF supera el tamaño permitido (~4.5 MB).', false);
    return;
  }

  setImportStatus('Leyendo el PDF…', true);
  showToast('🤖 Procesando PDF con IA…', 'info');

  try {
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
      reader.readAsDataURL(file);
    });

    setImportStatus('Extrayendo recetas del PDF con IA…', true);
    const resp = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [
          { text: IMPORT_RECIPE_PROMPT },
          { inlineData: { mimeType: 'application/pdf', data: base64 } }
        ] }],
        generationConfig: { temperature: 0.4 }
      })
    });
    if (!resp.ok) throw new Error('La IA no pudo procesar el PDF.');
    finishImport(parseRecipesFromGemini(await resp.json()));
  } catch (err) {
    console.error('Import PDF error:', err);
    showToast('❌ ' + err.message, 'error');
    setImportStatus('❌ ' + err.message, false);
  }
}

function setupImport() {
  // Botón de acceso rápido desde la vista Recetas → abre la pestaña Importar
  const shortcutBtn = document.getElementById('btn-import-recipe');
  if (shortcutBtn) shortcutBtn.addEventListener('click', () => window.switchView('importar'));

  const urlInput = document.getElementById('import-url-input');
  const urlBtn   = document.getElementById('btn-import-url');
  const pdfInput = document.getElementById('import-pdf-input');
  const pdfName  = document.getElementById('import-pdf-name');

  if (urlBtn)   urlBtn.addEventListener('click', () => handleImportUrl(urlInput.value.trim()));
  if (urlInput) urlInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleImportUrl(urlInput.value.trim()); });

  if (pdfInput) pdfInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (pdfName) pdfName.textContent = file.name;
    handleImportPdf(file);
    e.target.value = '';
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

// ── DESPENSA (INVENTARIO) ─────────────────────────────────────
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

    const n = nameInput.value.trim();
    const qty = parseFloat(qtyInput.value);
    
    const existing = STATE.desvan.find(d => areIngredientsSimilar(d.nombre, n));
    if (existing) {
      existing.cantidad += qty;
      existing.vigilar = vigilarInput.checked;
      showToast(`📦 Sumada la cantidad a ${n} existente`, 'success');
    } else {
      const item = {
        id: Date.now().toString(),
        nombre: n,
        cantidad: qty,
        unidad: unitInput.value,
        vigilar: vigilarInput.checked
      };
      STATE.desvan.push(item);
      showToast('📦 Añadido a la despensa', 'success');
    }

    saveState();
    nameInput.value = '';
    qtyInput.value = '';
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
      
      showToast('Analizando ticket con Gemini AI... 🧠', 'info');
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result.split(',')[1];
        
        try {
          const resp = await fetch(`/api/gemini`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: 'Extrae los alimentos de comida (solo comida) de este ticket o imagen. Devuelve ÚNICAMENTE un array JSON válido, sin formato markdown ni comillas extrañas. Ejemplo: [{"nombre": "Tomate", "cantidad": 2}]. Agrupa si son similares. Mantenlo ultra limplio, no añadas textos explicativos. Si no hay ingredientes devuelve []' },
                  { inlineData: { mimeType: file.type, data: base64Data } }
                ]
              }]
            })
          });

          if (!resp.ok) {
            const errData = await resp.json().catch(() => ({}));
            console.error("Gemini Error:", errData);
            if (resp.status === 401 || resp.status === 403) {
               localStorage.removeItem('gemini_api_key');
               throw new Error("API Key inválida o caducada.");
            }
            throw new Error(`Error en Gemini: ${errData?.error?.message || resp.statusText}`);
          }

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
          showToast(`¡${countMsg} ingredientes guardados en la Despensa con Gemini!`, 'success');

        } catch (error) {
          showToast('❌ Error: ' + error.message, 'error');
        } finally {
          e.target.value = '';
        }
      };
    });
  }

  const handleGeneratePantryRecipe = async (e) => {
    const despensaItems = STATE.desvan.filter(i => i.cantidad > 0).map(i => `${i.nombre} (${i.cantidad} ${i.unidad || ''})`).join(', ');
    
    if (!despensaItems) {
      showToast('Tu despensa está vacía. Añade ingredientes primero.', 'warning');
      return;
    }

    const btn1 = document.getElementById('btn-desvan-recipe');
    const btn2 = document.getElementById('btn-recetas-desvan');
    const btn1Html = btn1 ? btn1.innerHTML : '';
    const btn2Html = btn2 ? btn2.innerHTML : '';

    if (btn1) { btn1.disabled = true; btn1.innerHTML = '⏳'; btn1.style.opacity = '0.7'; }
    if (btn2) { btn2.disabled = true; btn2.innerHTML = '<span style="font-size: 1.1rem">⏳</span> Creando receta (En proceso...)'; btn2.style.opacity = '0.7'; }

    showToast('🤖 Diseñando receta de aprovechamiento...', 'info');

    try {
      const response = await fetch(`/api/gemini`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Crea una receta tipo "aprovechamiento" usando principamente estos ingredientes que tengo en mi despensa: ${despensaItems}. Puedes asumir agua, sal, pimienta, y aceite básicos.
              Devuelve SOLO un objeto JSON válido (sin etiquetas markdown ni texto de relleno) basado STRICTAMENTE en este esquema:
              {
                "id": "nombre-inventado-guiones",
                "nombre": "Nombre original de tu Receta",
                "tipo": "aprovechamiento",
                "porciones": 2,
                "tiempo": 20,
                "icono": "🥘",
                "descripcion": "Pequeña descripción atractiva",
                "ingredientes": [
                  { "nombre": "Ingrediente usado o recomendado", "cantidad": "100g", "comprar": false }
                ],
                "pasos": [
                  "Paso 1 detallado", "Paso 2 detallado"
                ],
                "nutricion": { "calorias": 300, "proteinas": 15, "carbohidratos": 30, "grasas": 10, "fibra": 5 },
                "nota": "Receta creada con tu IA de cocina"
              }`
            }]
          }],
          generationConfig: { temperature: 0.7 }
        })
      });

      if (!response.ok) throw new Error('Error en conexión con Gemini');
      const data = await response.json();
      let jsonText = data.candidates[0].content.parts[0].text;
      jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
      const nuevaReceta = JSON.parse(jsonText);
      
      if (typeof RECETAS_NUEVAS !== 'undefined') {
         RECETAS_NUEVAS[nuevaReceta.id] = nuevaReceta;
      }

      if (typeof openMealModal === 'function') {
         openMealModal(nuevaReceta, null, nuevaReceta.tipo);
      }
      
      showToast('✅ ¡Receta lista!', 'success');
      
    } catch(err) {
       console.error("AI Recipe creation failed: ", err);
       showToast('❌ Error creando la receta. Revisa consola.', 'error');
    } finally {
      if (btn1) { btn1.disabled = false; btn1.innerHTML = btn1Html; btn1.style.opacity = '1'; }
      if (btn2) { btn2.disabled = false; btn2.innerHTML = btn2Html; btn2.style.opacity = '1'; }
    }
  };

  const btnDesvanRecipe = document.getElementById('btn-desvan-recipe');
  if (btnDesvanRecipe) {
    btnDesvanRecipe.addEventListener('click', handleGeneratePantryRecipe);
  }

  const btnRecetasDesvan = document.getElementById('btn-recetas-desvan');
  if (btnRecetasDesvan) {
    btnRecetasDesvan.addEventListener('click', handleGeneratePantryRecipe);
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
        <div class="empty-title">Tu despensa está vacía</div>
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
  // Deduce ingredientes de un menú aceptado de la despensa
  const receta = STATE.semana[dia][tipo];
  if (!receta || !receta.ingredientes) return;

  let somethingDeducted = false;

  receta.ingredientes.forEach(ingNeed => {
    // Buscar en la despensa si existe este ingrediente
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
      new Notification('Vigilancia de Despensa', {
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
  let zxingReader = null;

  btnOpen.addEventListener('click', async () => {
    window.scannerRestockMode = false;
    overlay.style.display = 'flex';
    resultsEl.style.display = 'none';
    captureBtn.style.display = 'block';
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

  const btnDesvanScan = document.getElementById('btn-desvan-scan');
  if (btnDesvanScan) {
    btnDesvanScan.addEventListener('click', async () => {
      window.scannerRestockMode = 'barcode';
      overlay.style.display = 'flex';
      resultsEl.style.display = 'none';
      captureBtn.style.display = 'none'; 
      statusEl.innerHTML = 'Enfoca el código de barras...<br><small>Reconocimiento automático</small>';
      scanline.style.display = 'block';

      try {
        if (typeof ZXing === 'undefined') {
            statusEl.textContent = '❌ Lector de códigos de barras (ZXing) no cargado.';
            return;
        }

        zxingReader = new ZXing.BrowserMultiFormatReader();
        const videoInputDevices = await zxingReader.listVideoInputDevices();
        const selectedDeviceId = videoInputDevices.length > 1 ? videoInputDevices[videoInputDevices.length - 1].deviceId : undefined;
        
        zxingReader.decodeFromVideoDevice(selectedDeviceId, 'scanner-video', async (result, err) => {
          if (result) {
             const code = result.getText();
             if(zxingReader) {
               zxingReader.reset();
               zxingReader = null;
             }
             await handleBarcodeFound(code);
          }
        });
      } catch (err) {
        statusEl.textContent = '❌ Error al acceder a la cámara para el lector de barras.';
        scanline.style.display = 'none';
      }
    });
  }

  async function handleBarcodeFound(code) {
      if(navigator.vibrate) navigator.vibrate(200);
      statusEl.textContent = `Código: ${code}. Buscando datos... 🔎`;
      scanline.style.display = 'none';

      try {
         const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
         const data = await res.json();
         if (data.status === 1) {
            const productName = data.product.product_name_es || data.product.product_name || "Producto Desconocido";
            
            const nombreClass = productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase();
            const ex = STATE.desvan.find(d => d.nombre.toLowerCase() === productName.toLowerCase());
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
            saveState();
            renderDesvan();
            
            resultsEl.style.display = 'block';
            statusEl.textContent = '✅ ¡Añadido a Despensa!';
            resultsEl.innerHTML = `
              <div style="background:rgba(0,0,0,0.5); padding:15px; border-radius:10px; border:1px solid var(--primary); margin-top:10px;">
                <p style="margin:0;color:var(--primary);">Alimento Identificado:</p>
                <h4 style="margin:5px 0 0 0; color:#fff;">${nombreClass}</h4>
              </div>
            `;
            setTimeout(closeScanner, 3000);
         } else {
            statusEl.textContent = `❌ Código (${code}) no encontrado en la base de datos Open Food Facts.`;
            setTimeout(closeScanner, 3500);
         }
      } catch (e) {
         statusEl.textContent = '❌ Error de conexión al buscar producto.';
         setTimeout(closeScanner, 3000);
      }
  }

  function closeScanner() {
    overlay.style.display = 'none';
    captureBtn.style.display = 'block';
    if (zxingReader) {
      zxingReader.reset();
      zxingReader = null;
    }
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
            <p style="margin:0;color:var(--primary);">Alimentos detectados y guardados en la Despensa (1 ud por defecto):</p>
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

// ── COMEDOR (PDF) ───────────────────────────────────────────
const COMEDOR_DB_NAME = "MiComedorDB";
const COMEDOR_STORE_NAME = "pdfStore";

function initComedorDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(COMEDOR_DB_NAME, 1);
    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(COMEDOR_STORE_NAME)) {
        db.createObjectStore(COMEDOR_STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function saveComedorPDF(dataUrl) {
  return initComedorDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(COMEDOR_STORE_NAME, 'readwrite');
      tx.objectStore(COMEDOR_STORE_NAME).put(dataUrl, 'menu_actual');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  });
}

function loadComedorPDF() {
  return initComedorDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(COMEDOR_STORE_NAME, 'readonly');
      const req = tx.objectStore(COMEDOR_STORE_NAME).get('menu_actual');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  });
}

function setupComedor() {
  const uploadInput = document.getElementById('comedor-upload');
  const viewer = document.getElementById('comedor-pdf-viewer');
  const emptyState = document.getElementById('comedor-empty-state');

  if (!viewer || !emptyState) return;

  // Load existing PDF if any
  loadComedorPDF().then(dataUrl => {
    if (dataUrl) {
      viewer.src = dataUrl;
      viewer.style.display = 'block';
      emptyState.style.display = 'none';
    }
  }).catch(e => console.log('No existing PDF found or error:', e));

  if (uploadInput) {
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file || file.type !== 'application/pdf') {
        showToast('Por favor, selecciona un archivo PDF.', 'warning');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const dataUrl = evt.target.result;
        try {
          await saveComedorPDF(dataUrl);
          viewer.src = dataUrl;
          viewer.style.display = 'block';
          emptyState.style.display = 'none';
          showToast('PDF guardado. Procesando menú con IA... 🤖', 'info');
          
          // Send to Gemini
          if (typeof window.GEMINI_API_KEY === 'undefined' || !window.GEMINI_API_KEY) {
            showToast('⚠️ No hay API KEY para leer el menú', 'warning');
            return;
          }
          
          const base64Data = dataUrl.split(',')[1];
          const response = await fetch(`/api/gemini`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: `Extrae el menú escolar día a día (solo la comida principal del mediodía). Retorna SOLO un array de JSON válido. Cada objeto debe tener la clave "fecha" (en formato YYYY-MM-DD) y la clave "comida" (un string resumiendo lo que comen: primero, segundo y postre). No incluyas markdown, saltos de línea extra ni comentarios. Solo un arreglo JSON de la forma [{"fecha": "2024-05-01", "comida": "Lentejas y merluza"}, ...]. Ten en cuenta que estamos alrededor del mes actual (${new Date().toISOString().split('T')[0]}), por lo que debes deducir correctamente el año y el mes para crear la fecha exacta YYYY-MM-DD.` },
                  { inlineData: { mimeType: 'application/pdf', data: base64Data } }
                ]
              }],
              generationConfig: { temperature: 0.1 }
            })
          });
          
          if (!response.ok) throw new Error('Error en API Gemini');
          
          const data = await response.json();
          let jsonText = data.candidates[0].content.parts[0].text;
          jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
          
          const menuArray = JSON.parse(jsonText);
          let added = 0;
          menuArray.forEach(item => {
            if (item.fecha && item.comida) {
              STATE.comedorMenu[item.fecha] = item.comida;
              added++;
            }
          });
          saveState();
          // Update views to reflect new menu data
          renderHoy();
          renderPlanSemanal();
          
          showToast(`¡Extraídos ${added} días de menú escolar! 🏫`, 'success');
        } catch (err) {
          console.error(err);
          showToast('Error procesando el PDF con IA.', 'error');
        }
      };
      reader.readAsDataURL(file);
    });
  }
}
