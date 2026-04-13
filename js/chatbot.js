// ============================================================
// CHATBOT.JS — Asistente inteligente del Planificador de Comidas
// Responde sobre recetas, menús, ingredientes, nutrición y compra
// ============================================================

const CHATBOT_STATE = {
  open: false,
  messages: [],
};

// ── PRECIOS MERCADONA (aprox.) ─────────────────────────────
const PRECIOS_MERCADONA = {
  // Carnes y pescados
  'muslos de pollo':        { precio: 3.20,  unidad: 'kg',   cantidad_ref: 'pack ~1kg (6-8 uds)' },
  'pechuga de pollo':       { precio: 6.50,  unidad: 'kg',   cantidad_ref: 'bandeja ~500g' },
  'pechuga pollo asada':    { precio: 4.99,  unidad: 'ud',   cantidad_ref: 'pieza asada 400g aprox.' },
  'carne picada ternera':   { precio: 6.99,  unidad: 'kg',   cantidad_ref: 'bandeja 500g ~3.50€' },
  'ternera para guisar':    { precio: 9.99,  unidad: 'kg',   cantidad_ref: 'bandeja 300g ~3€' },
  'chorizo':                { precio: 2.80,  unidad: 'ud',   cantidad_ref: 'pieza ~200g' },
  'bacon en lonchas':       { precio: 1.79,  unidad: 'pack', cantidad_ref: 'pack 150g' },
  'jamón serrano':          { precio: 2.50,  unidad: '100g', cantidad_ref: 'sobre loncheado' },
  'jamón york':             { precio: 1.89,  unidad: 'pack', cantidad_ref: 'pack 8 lonchas' },
  'jamón cocido':           { precio: 1.99,  unidad: 'pack', cantidad_ref: 'pack 150g' },
  'merluza (rodajas)':      { precio: 8.99,  unidad: 'kg',   cantidad_ref: '4 rodajas ~500g ~4.50€' },
  'filetes de salmón':      { precio: 12.99, unidad: 'kg',   cantidad_ref: '4 filetes ~500g ~6.50€' },
  'gambas':                 { precio: 9.99,  unidad: 'kg',   cantidad_ref: 'bolsa 200g ~2€' },
  'mejillones':             { precio: 3.49,  unidad: 'kg',   cantidad_ref: 'red 1kg o cocidos al vapor' },
  'atún en aceite':         { precio: 0.75,  unidad: 'lata', cantidad_ref: 'lata 80g (escurrido 56g)' },
  // Pasta, arroz, legumbres
  'arroz':                  { precio: 1.20,  unidad: 'kg',   cantidad_ref: 'paquete 1kg' },
  'arroz bomba':            { precio: 2.50,  unidad: 'kg',   cantidad_ref: 'paquete 1kg' },
  'macarrones':             { precio: 0.80,  unidad: 'kg',   cantidad_ref: 'paquete 500g ~0.40€' },
  'espaguetis':             { precio: 0.80,  unidad: 'kg',   cantidad_ref: 'paquete 500g ~0.40€' },
  'tallarines o espaguetis':{ precio: 0.80,  unidad: 'kg',   cantidad_ref: 'paquete 500g ~0.40€' },
  'fideos gordos':          { precio: 0.90,  unidad: 'kg',   cantidad_ref: 'paquete 500g ~0.45€' },
  'lentejas pardinas':      { precio: 1.50,  unidad: 'kg',   cantidad_ref: 'paquete 500g ~0.75€' },
  'garbanzos cocidos (bote)':{ precio: 0.99, unidad: 'bote', cantidad_ref: 'bote 400g' },
  'harina':                 { precio: 0.70,  unidad: 'kg',   cantidad_ref: 'paquete 1kg' },
  'pan rallado':            { precio: 0.85,  unidad: 'kg',   cantidad_ref: 'paquete 500g ~0.43€' },
  // Lácteos y huevos
  'huevos':                 { precio: 2.99,  unidad: 'docena', cantidad_ref: 'caja 12 uds' },
  'leche entera':           { precio: 0.89,  unidad: 'litro',  cantidad_ref: 'brik 1L' },
  'queso rallado mozzarella':{ precio: 2.20, unidad: '200g', cantidad_ref: 'bolsa 200g' },
  'mozzarella rallada':     { precio: 2.20,  unidad: '200g', cantidad_ref: 'bolsa 200g' },
  'queso parmesano':        { precio: 2.80,  unidad: '100g', cantidad_ref: 'trozo 100-150g' },
  'queso en lonchas':       { precio: 1.89,  unidad: 'pack', cantidad_ref: 'pack 8 lonchas' },
  'nata para cocinar':      { precio: 1.10,  unidad: 'brik', cantidad_ref: 'brik 200ml' },
  'mantequilla':            { precio: 1.85,  unidad: '250g', cantidad_ref: 'pastilla 250g' },
  // Verduras y hortalizas
  'patatas':                { precio: 0.90,  unidad: 'kg',   cantidad_ref: 'malla 2kg ~1.80€' },
  'cebolla':                { precio: 0.60,  unidad: 'kg',   cantidad_ref: 'malla 1kg' },
  'zanahoria':              { precio: 0.85,  unidad: 'kg',   cantidad_ref: 'bolsa 1kg' },
  'pimiento rojo':          { precio: 1.99,  unidad: 'kg',   cantidad_ref: 'bandeja 3 uds ~0.80€' },
  'tomate':                 { precio: 1.50,  unidad: 'kg',   cantidad_ref: 'malla 1kg' },
  'lechuga':                { precio: 0.89,  unidad: 'ud',   cantidad_ref: 'pieza' },
  'calabaza':               { precio: 0.99,  unidad: 'kg',   cantidad_ref: 'trozo 700g ~0.69€' },
  'espinacas frescas':      { precio: 1.99,  unidad: 'bolsa', cantidad_ref: 'bolsa 200-250g' },
  'brócoli':                { precio: 1.29,  unidad: 'ud',   cantidad_ref: 'pieza ~600g' },
  'champiñones':            { precio: 1.99,  unidad: 'bandeja', cantidad_ref: 'bandeja 250g' },
  'pepino':                 { precio: 0.49,  unidad: 'ud',   cantidad_ref: 'pieza' },
  'apio':                   { precio: 0.89,  unidad: 'ud',   cantidad_ref: 'rama / manojo' },
  'limón':                  { precio: 0.99,  unidad: 'kg',   cantidad_ref: 'malla 500g ~0.50€' },
  // Conservas y otros
  'tomate triturado':       { precio: 0.55,  unidad: 'lata', cantidad_ref: 'lata/brik 400g' },
  'caldo de pollo':         { precio: 0.99,  unidad: 'brik', cantidad_ref: 'brik 1L' },
  'guisantes':              { precio: 0.79,  unidad: 'lata', cantidad_ref: 'lata 400g' },
  'pimiento rojo asado (bote)':{ precio: 1.39, unidad: 'bote', cantidad_ref: 'bote 480g (escurrido 250g)' },
  // Masas y preparados
  'base de pizza precocinada':{ precio: 1.49, unidad: 'ud',  cantidad_ref: 'masa precocinada grande' },
  'masa para empanada':     { precio: 1.99,  unidad: 'pack', cantidad_ref: '2 planchas refrigeradas' },
  'pan de hamburguesa':     { precio: 1.39,  unidad: 'pack', cantidad_ref: 'bolsa 4 uds' },
  'pan de molde':           { precio: 1.10,  unidad: 'ud',   cantidad_ref: 'molde grande' },
  'tortillas de trigo grandes':{ precio: 1.79, unidad: 'pack', cantidad_ref: 'pack 4-6 uds' },
  // Otros
  'hummus':                 { precio: 1.99,  unidad: 'pack', cantidad_ref: 'tarrina 200g' },
  'arroz bomba paella':     { precio: 2.50,  unidad: 'kg',   cantidad_ref: 'paquete 1kg' },
};

// ── KNOWLEDGE BASE ────────────────────────────────────────
const KB = {
  greetings: ['hola', 'hey', 'buenos días', 'buenas', 'saludos', 'buenas tardes', 'buenas noches'],
  farewells: ['adiós', 'bye', 'hasta luego', 'chao', 'hasta pronto'],
  thanks: ['gracias', 'perfecto', 'genial', 'ok', 'vale', 'entendido'],

  // Áreas de conocimiento
  topics: {
    precio: ['precio', 'cuesta', 'cuanto vale', 'cuánto vale', 'caro', 'barato', 'coste', 'costo', 'presupuesto', 'mercadona', 'lista'],
    receta: ['receta', 'cómo', 'como se hace', 'ingredientes', 'preparar', 'cocinar', 'pasos', 'elaboración'],
    menu_hoy: ['hoy', 'menú de hoy', 'que hay hoy', 'qué comemos'],
    menu_semana: ['semana', 'menú semanal', 'esta semana', 'planificación', 'plan'],
    nutricion: ['calorías', 'calorias', 'proteínas', 'proteinas', 'carbohidratos', 'grasas', 'nutri', 'kcal', 'sano'],
    compra: ['compra', 'lista', 'supermercado', 'mercadona', 'necesito comprar', 'hacer la compra'],
    aprovechamiento: ['aprovechamiento', 'sobras', 'reciclaje', 'reutilizar'],
    presupuesto: ['presupuesto', 'total', 'gasto', 'semana cuanto', 'cuanto gasto', 'dinero'],
  }
};

// ── MOTOR DE RESPUESTAS ───────────────────────────────────
function chatbotResponse(userMsg) {
  const msg = userMsg.toLowerCase().trim();

  // Saludos
  if (KB.greetings.some(g => msg.includes(g))) {
    return `👋 ¡Hola! Soy tu asistente de MiMenú. Puedo ayudarte con:\n• 🍽️ Recetas e ingredientes\n• 💰 Precios de Mercadona\n• 📊 Información nutricional\n• 🛒 Lista de la compra\n• 📅 Menú de la semana\n\n¿Qué quieres saber?`;
  }

  // Despedidas
  if (KB.farewells.some(f => msg.includes(f))) {
    return `👋 ¡Hasta luego! Que aproveche 😄`;
  }

  // Agradecimientos
  if (KB.thanks.some(t => msg === t || msg.startsWith(t))) {
    return `😊 ¡De nada! ¿Hay algo más en lo que pueda ayudarte?`;
  }

  // ── PRECIO de un ingrediente ──────────────────────────
  if (KB.topics.precio.some(t => msg.includes(t))) {
    // Buscar qué ingrediente pregunta
    const ingredienteEncontrado = buscarIngredienteEnMensaje(msg);
    if (ingredienteEncontrado) {
      const p = PRECIOS_MERCADONA[ingredienteEncontrado];
      return `🏷️ **${capitalizar(ingredienteEncontrado)}** en Mercadona:\n` +
             `• Precio aprox: **${p.precio.toFixed(2)}€** por ${p.unidad}\n` +
             `• Referencia: ${p.cantidad_ref}\n\n` +
             `_Precios orientativos, pueden variar según zona y fecha._`;
    }

    // Si pregunta por el presupuesto total de la semana
    if (msg.includes('semana') || msg.includes('total') || msg.includes('presupuesto') || msg.includes('gasto')) {
      return calcularPresupuestoSemana();
    }

    return `💰 Puedo decirte el precio de cualquier ingrediente de Mercadona.\nDime, por ejemplo: "¿cuánto cuestan los muslos de pollo?" o "precio del salmón".`;
  }

  // ── PRESUPUESTO TOTAL ──────────────────────────────────
  if (KB.topics.presupuesto.some(t => msg.includes(t))) {
    return calcularPresupuestoSemana();
  }

  // ── INFORMACIÓN NUTRICIONAL ────────────────────────────
  if (KB.topics.nutricion.some(t => msg.includes(t))) {
    const mealFound = buscarRecetaEnMensaje(msg);
    if (mealFound) {
      const n = mealFound.nutricion;
      return `📊 **${mealFound.nombre}** — Valores nutricionales (por ración):\n` +
             `• 🔥 ${n.calorias} kcal\n` +
             `• 💪 Proteínas: ${n.proteinas}g\n` +
             `• 🌾 Carbohidratos: ${n.carbohidratos}g\n` +
             `• 🥑 Grasas: ${n.grasas}g\n` +
             `• 🌿 Fibra: ${n.fibra || '—'}g`;
    }

    // Resumen nutricional de la semana
    return resumenNutricionSemana();
  }

  // ── MENÚ DE HOY ───────────────────────────────────────
  if (KB.topics.menu_hoy.some(t => msg.includes(t))) {
    return menuDeHoy();
  }

  // ── MENÚ DE LA SEMANA ──────────────────────────────────
  if (KB.topics.menu_semana.some(t => msg.includes(t)) && !KB.topics.nutricion.some(t => msg.includes(t))) {
    return menuDeSemanaResumen();
  }

  // ── RECETA ESPECÍFICA ──────────────────────────────────
  if (KB.topics.receta.some(t => msg.includes(t))) {
    const mealFound = buscarRecetaEnMensaje(msg);
    if (mealFound) {
      return `🍳 **${mealFound.nombre}**\n\n` +
             `📝 ${mealFound.descripcion}\n\n` +
             `⏱ ${mealFound.tiempo} min · 👥 ${mealFound.porciones} personas\n\n` +
             `**Ingredientes principales:**\n` +
             mealFound.ingredientes.filter(i => i.comprar).slice(0, 5).map(i => `• ${i.nombre} — ${i.cantidad}`).join('\n') +
             `\n\n_Pulsa en la receta en la app para ver todos los pasos_`;
    }
    return `🔍 No encontré esa receta. Prueba con el nombre exacto o busca en la pestaña 📖 **Recetas**.`;
  }

  // ── APROVECHAMIENTO ────────────────────────────────────
  if (KB.topics.aprovechamiento.some(t => msg.includes(t))) {
    return `♻️ **Comidas de aprovechamiento en el menú:**\n\n` +
           `**Semana 1 — Miércoles:**\n🟡 Croquetas de pollo (con el pollo del arroz del lunes)\n\n` +
           `**Semana 2 — Miércoles:**\n🍲 Arroz con pollo desmigado (con el pollo de la sopa del martes)\n\n` +
           `💡 Para el aprovechamiento funcione bien: el **lunes/martes** cocina un poco más de proteína de lo habitual y guarda 150g en el frigorífico para el miércoles.`;
  }

  // ── LISTA DE COMPRA ────────────────────────────────────
  if (KB.topics.compra.some(t => msg.includes(t))) {
    if (msg.includes('precio') || msg.includes('cuanto') || msg.includes('cuánto') || msg.includes('coste')) {
      return calcularPresupuestoSemana();
    }
    return `🛒 Ve a la pestaña **Compra** y pulsa "🔄 Generar lista".\n\n` +
           `La lista se crea automáticamente con los ingredientes de los menús de la semana.\n\n` +
           `💡 **Función "Tengo":** Al lado de cada ingrediente puedes indicar cuánto tienes en casa, y la app calculará exactamente lo que necesitas comprar.`;
  }

  // ── PREGUNTAS SOBRE LA APP ─────────────────────────────
  if (msg.includes('notificac') || msg.includes('aviso') || msg.includes('alarma') || msg.includes('21')) {
    return `🔔 Las notificaciones se envían **cada día a las 21:00** con el menú del día siguiente.\n\n` +
           `Desde la notificación puedes:\n• ✅ **Aceptar** el menú propuesto\n• 🔄 **Cambiar** a otra opción\n\n` +
           `Para activarlas, pulsa el ícono 🔔 en la barra superior o el botón "Activar" que aparece en la pantalla de Hoy.`;
  }

  if (msg.includes('instalar') || msg.includes('descargar') || msg.includes('pwa') || msg.includes('pantalla de inicio')) {
    return `📲 **¿Cómo instalar MiMenú en tu móvil?**\n\n` +
           `**Android (Chrome):**\n1. Abre la app en Chrome\n2. Menú ⋮ → "Añadir a pantalla de inicio"\n3. Confirma → ya aparece como app nativa\n\n` +
           `**iPhone (Safari):**\n1. Abre la app en Safari\n2. Botón compartir ⬆️ → "Añadir a inicio"\n3. Confirma\n\n` +
           `O pulsa el banner "**Instalar**" que aparece en la pantalla de Hoy 👆`;
  }

  if (msg.includes('semana 1') || msg.includes('semana 2') || msg.includes('segunda semana') || msg.includes('primera semana')) {
    const esSemana1 = msg.includes('semana 1') || msg.includes('primera');
    const semana = SEMANAS[esSemana1 ? 0 : 1];
    return formatearMenuSemana(semana, esSemana1 ? 1 : 2);
  }

  // ── AYUDA GENERAL ──────────────────────────────────────
  if (msg.includes('ayuda') || msg.includes('help') || msg.includes('qué puedes') || msg.includes('que puedes')) {
    return `🤖 **¿En qué puedo ayudarte?**\n\n` +
           `• 💰 **"precio del arroz"** — Precio en Mercadona\n` +
           `• 📊 **"calorías del arroz con pollo"** — Nutrición de un plato\n` +
           `• 🍽️ **"menú de hoy"** — Qué hay para comer\n` +
           `• 📅 **"menú de la semana"** — Plan completo Lun-Vie\n` +
           `• 🍳 **"receta de las lentejas"** — Ingredientes y pasos\n` +
           `• 🛒 **"presupuesto de la semana"** — Estimación de gasto total\n` +
           `• ♻️ **"aprovechamiento"** — Cómo reutilizar sobras`;
  }

  // ── RESPUESTA POR DEFECTO ──────────────────────────────
  // Intentar buscar receta o ingrediente por si acaso
  const posibleReceta = buscarRecetaEnMensaje(msg);
  if (posibleReceta) {
    return `🍽️ ¿Preguntas por **${posibleReceta.nombre}**?\n\n` +
           `• ⏱ Tiempo: ${posibleReceta.tiempo} min\n` +
           `• 👥 Porciones: ${posibleReceta.porciones}\n` +
           `• 🔥 ${posibleReceta.nutricion.calorias} kcal por ración\n\n` +
           `¿Quieres la receta completa, sus ingredientes o la información nutricional?`;
  }

  const posibleIngrediente = buscarIngredienteEnMensaje(msg);
  if (posibleIngrediente && PRECIOS_MERCADONA[posibleIngrediente]) {
    const p = PRECIOS_MERCADONA[posibleIngrediente];
    return `🏷️ **${capitalizar(posibleIngrediente)}** en Mercadona: ~${p.precio.toFixed(2)}€/${p.unidad}\n(${p.cantidad_ref})`;
  }

  return `🤔 No estoy seguro de lo que preguntas. Intenta ser más específico, por ejemplo:\n• "precio del salmón"\n• "receta de las lentejas"\n• "menú de hoy"\n• "presupuesto semana"\n\nEscribe **ayuda** para ver todo lo que puedo hacer.`;
}

// ── FUNCIONES AUXILIARES ──────────────────────────────────

function buscarRecetaEnMensaje(msg) {
  // Recopilar todas las recetas
  const todasRecetas = [];
  SEMANAS.forEach(semana => {
    DIAS.forEach(dia => {
      ['comida', 'cena'].forEach(tipo => {
        const m = semana[dia][tipo];
        if (!todasRecetas.find(r => r.id === m.id)) todasRecetas.push(m);
      });
    });
  });

  // Buscar por nombre o palabras clave
  const palabrasClave = {
    'arroz-pollo': ['arroz', 'pollo', 'verduras'],
    'macarrones-tomate': ['macarrones', 'tomate', 'queso gratinado'],
    'lentejas-chorizo': ['lentejas', 'chorizo'],
    'crema-calabaza': ['calabaza', 'crema'],
    'croquetas-pollo': ['croquetas'],
    'tortilla-patatas': ['tortilla', 'tortilla española'],
    'pasta-bolonesa': ['boloñesa', 'bolonesa', 'espaguetis carne', 'ternera pasta'],
    'pizza-casera': ['pizza'],
    'merluza-horno': ['merluza', 'pescado horno'],
    'hamburguesas-caseras': ['hamburguesas', 'hamburguesa'],
    'cocido-verduras': ['garbanzos', 'cocido', 'espinacas jamón'],
    'pasta-carbonara': ['carbonara', 'bacon pasta'],
    'sopa-fideo': ['sopa', 'fideos', 'sopa fideos'],
    'empanada-atun': ['empanada', 'atún empanada'],
    'caldo-arroz-pollo': ['arroz desmigado', 'arroz pollo aprovechamiento'],
    'salmon-limon': ['salmón', 'salmon', 'limón'],
    'estofado-ternera': ['estofado', 'ternera guisada', 'carne patatas'],
    'wrap-pollo': ['wrap', 'wraps', 'tortilla wrap'],
    'paella-mixta': ['paella', 'arroz bomba'],
    'crepes-jamon-queso': ['crepes', 'crêpes'],
  };

  for (const [id, palabras] of Object.entries(palabrasClave)) {
    if (palabras.some(p => msg.includes(p.toLowerCase()))) {
      return todasRecetas.find(r => r.id === id);
    }
  }

  // Búsqueda directa por nombre
  return todasRecetas.find(r => msg.includes(r.nombre.toLowerCase().substring(0, 8)));
}

function buscarIngredienteEnMensaje(msg) {
  const ingredientes = Object.keys(PRECIOS_MERCADONA);
  // Buscar coincidencia más larga primero
  const ordenados = ingredientes.sort((a, b) => b.length - a.length);
  return ordenados.find(ing => msg.includes(ing.toLowerCase()));
}

function menuDeHoy() {
  const now = new Date();
  const diasJS = { 1: 'lunes', 2: 'martes', 3: 'miercoles', 4: 'jueves', 5: 'viernes' };
  const hoyKey = diasJS[now.getDay()];

  if (!hoyKey) {
    return `🏖️ Hoy es fin de semana — ¡descansa y disfruta! El menú planificado es de lunes a viernes.`;
  }

  const semana = STATE.semana || getSemanaActual();
  const diaData = semana[hoyKey];
  const diaLabel = DIAS_LABEL[hoyKey];

  return `🍽️ **Menú de hoy — ${diaLabel}:**\n\n` +
         `☀️ **Comida** (2 adultos):\n${diaData.comida.icono} ${diaData.comida.nombre}\n⏱ ${diaData.comida.tiempo} min · ${diaData.comida.nutricion.calorias} kcal/ración\n\n` +
         `🌙 **Cena** (4 personas):\n${diaData.cena.icono} ${diaData.cena.nombre}\n⏱ ${diaData.cena.tiempo} min · ${diaData.cena.nutricion.calorias} kcal/ración\n\n` +
         `${diaData.comida.tipo === 'aprovechamiento' ? '♻️ Comida de aprovechamiento — ¡menos desperdicio!' : ''}`;
}

function menuDeSemanaResumen() {
  const semana = STATE.semana || getSemanaActual();
  let resp = `📅 **Menú de esta semana:**\n\n`;
  DIAS.forEach(dia => {
    const d = semana[dia];
    const aprove = d.comida.tipo === 'aprovechamiento' ? ' ♻️' : '';
    resp += `**${DIAS_LABEL[dia]}**\n`;
    resp += `☀️ ${d.comida.nombre}${aprove} (${d.comida.tiempo}min)\n`;
    resp += `🌙 ${d.cena.nombre} (${d.cena.tiempo}min)\n\n`;
  });
  return resp.trim();
}

function formatearMenuSemana(semana, numSemana) {
  let resp = `📅 **Menú Semana ${numSemana}:**\n\n`;
  DIAS.forEach(dia => {
    const d = semana[dia];
    const aprove = d.comida.tipo === 'aprovechamiento' ? ' ♻️' : '';
    resp += `**${DIAS_LABEL[dia]}**\n☀️ ${d.comida.nombre}${aprove}\n🌙 ${d.cena.nombre}\n\n`;
  });
  return resp.trim();
}

function resumenNutricionSemana() {
  const semana = STATE.semana || getSemanaActual();
  let totalCals = 0, totalProt = 0;
  DIAS.forEach(dia => {
    const d = semana[dia];
    totalCals += d.comida.nutricion.calorias + Math.round(d.cena.nutricion.calorias / (d.cena.porciones / 2));
    totalProt += d.comida.nutricion.proteinas + d.cena.nutricion.proteinas;
  });
  const avgCals = Math.round(totalCals / 5);
  const avgProt = Math.round(totalProt / 5);
  return `📊 **Resumen nutricional semanal (media por adulto/día):**\n\n` +
         `🔥 ~${avgCals} kcal/día\n💪 ~${avgProt}g proteínas/día\n\n` +
         `Para ver el detalle día a día, ve a la pestaña **📊 Nutrición**.\n\n` +
         `¿Quieres la nutrición de una receta específica? Dime cuál.`;
}

function calcularPresupuestoSemana() {
  const semana = STATE.semana || getSemanaActual();
  const itemsCompra = {};

  DIAS.forEach(dia => {
    const d = semana[dia];
    [...d.comida.ingredientes, ...d.cena.ingredientes].forEach(ing => {
      if (!ing.comprar) return;
      const key = ing.nombre.toLowerCase();
      if (!itemsCompra[key]) itemsCompra[key] = ing;
    });
  });

  let total = 0;
  let detalles = [];
  let sinPrecio = [];

  Object.values(itemsCompra).forEach(ing => {
    const key = ing.nombre.toLowerCase();
    const precioInfo = PRECIOS_MERCADONA[key];
    if (precioInfo) {
      total += precioInfo.precio;
      detalles.push({ nombre: ing.nombre, precio: precioInfo.precio, ref: precioInfo.cantidad_ref });
    } else {
      sinPrecio.push(ing.nombre);
    }
  });

  // Ordenar por precio descendente
  detalles.sort((a, b) => b.precio - a.precio);

  let resp = `💰 **Presupuesto estimado semana actual (Mercadona):**\n\n`;
  resp += `**Top ingredientes a comprar:**\n`;
  detalles.slice(0, 8).forEach(d => {
    resp += `• ${d.nombre}: ~${d.precio.toFixed(2)}€\n`;
  });
  if (detalles.length > 8) resp += `• _(y ${detalles.length - 8} más...)_\n`;
  resp += `\n💶 **Total estimado: ~${total.toFixed(2)}€/semana**\n`;
  resp += `_Para 2 comidas + 4 cenas de lun-vie_\n\n`;
  resp += `⚠️ Precios orientativos de Mercadona. Pueden variar según zona y promociones.\n`;
  if (sinPrecio.length) {
    resp += `\n📝 Sin precio registrado: ${sinPrecio.slice(0, 3).join(', ')}...`;
  }
  return resp;
}

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── RENDER DEL CHATBOT ────────────────────────────────────
function initChatbot() {
  // Crear el botón flotante y el panel del chat
  const chatHTML = `
    <button id="chat-fab" class="chat-fab" aria-label="Abrir asistente">
      <span class="chat-fab-icon">🤖</span>
      <span class="chat-fab-badge" id="chat-badge" style="display:none">1</span>
    </button>

    <div id="chat-panel" class="chat-panel" aria-hidden="true">
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-avatar">🤖</div>
          <div>
            <div class="chat-title">Asistente MiMenú</div>
            <div class="chat-subtitle">Preguntas sobre recetas, precios y menús</div>
          </div>
        </div>
        <button id="chat-close" class="chat-close-btn" aria-label="Cerrar">✕</button>
      </div>

      <div class="chat-messages" id="chat-messages">
        <!-- mensajes generados por JS -->
      </div>

      <div class="chat-input-area">
        <div class="chat-suggestions" id="chat-suggestions">
          <button class="chat-chip" data-q="Menú de hoy">🍽️ Menú hoy</button>
          <button class="chat-chip" data-q="Presupuesto de la semana">💰 Presupuesto</button>
          <button class="chat-chip" data-q="Receta de las lentejas">🍳 Lentejas</button>
          <button class="chat-chip" data-q="Aprovechamiento">♻️ Sobras</button>
        </div>
        <div class="chat-input-row">
          <input
            id="chat-input"
            type="text"
            placeholder="Pregunta algo…"
            autocomplete="off"
            aria-label="Mensaje al asistente"
          />
          <button id="chat-send" class="chat-send-btn" aria-label="Enviar">➤</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('app').insertAdjacentHTML('beforeend', chatHTML);

  // Mensaje de bienvenida
  addBotMessage(`👋 ¡Hola! Soy tu asistente. Puedo decirte precios de Mercadona, recetas, nutrición y más.\n\n¿En qué puedo ayudarte?`);

  // Event listeners
  document.getElementById('chat-fab').addEventListener('click', toggleChat);
  document.getElementById('chat-close').addEventListener('click', toggleChat);

  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');

  sendBtn.addEventListener('click', () => sendMessage());
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  // Chips de sugerencia
  document.getElementById('chat-suggestions').querySelectorAll('.chat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      input.value = chip.dataset.q;
      sendMessage();
    });
  });

  // Mostrar badge tras 3 seg (primer visit)
  if (!localStorage.getItem('chatbot_opened')) {
    setTimeout(() => {
      const badge = document.getElementById('chat-badge');
      if (badge && !CHATBOT_STATE.open) badge.style.display = 'flex';
    }, 3000);
  }
}

function toggleChat() {
  CHATBOT_STATE.open = !CHATBOT_STATE.open;
  const panel = document.getElementById('chat-panel');
  const fab = document.getElementById('chat-fab');
  const badge = document.getElementById('chat-badge');

  panel.classList.toggle('open', CHATBOT_STATE.open);
  panel.setAttribute('aria-hidden', String(!CHATBOT_STATE.open));
  fab.classList.toggle('active', CHATBOT_STATE.open);

  if (CHATBOT_STATE.open) {
    badge.style.display = 'none';
    localStorage.setItem('chatbot_opened', '1');
    setTimeout(() => scrollToBottom(), 100);
    document.getElementById('chat-input').focus();
  }
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  // Añadir mensaje del usuario
  addUserMessage(text);
  input.value = '';

  // Typing indicator
  const typingId = addTypingIndicator();

  // Generar respuesta con pequeño delay realista
  setTimeout(() => {
    removeTypingIndicator(typingId);
    const response = chatbotResponse(text);
    addBotMessage(response);
  }, 600 + Math.random() * 400);
}

function addUserMessage(text) {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg user-msg';
  div.textContent = text;
  msgs.appendChild(div);
  scrollToBottom();
}

function addBotMessage(text) {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot-msg';
  // Convertir markdown básico a HTML
  div.innerHTML = markdownToHTML(text);
  msgs.appendChild(div);
  scrollToBottom();
}

let _typingCounter = 0;
function addTypingIndicator() {
  const id = 'typing-' + (++_typingCounter);
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot-msg typing-indicator';
  div.id = id;
  div.innerHTML = '<span></span><span></span><span></span>';
  msgs.appendChild(div);
  scrollToBottom();
  return id;
}

function removeTypingIndicator(id) {
  document.getElementById(id)?.remove();
}

function scrollToBottom() {
  const msgs = document.getElementById('chat-messages');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}

function markdownToHTML(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
    .replace(/• /g, '&bull; ');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initChatbot, 500); // pequeño delay para que cargue el resto
});
