/* ============================================================
   SERVICE WORKER — Notificaciones a las 21:00
   ============================================================ */

const CACHE_NAME = 'planificador-v9';
const ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/face-api.min.js',
  '/js/auth.js',
  '/js/data.js',
  '/js/app.js',
  '/js/chatbot.js',
  '/manifest.json'
];

// ── INSTALL ────────────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ────────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => {
      self.clients.claim();
      scheduleNightlyNotification();
    })
  );
});

// ── FETCH (cache first) ─────────────────────────────────────
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

// ── NOTIFICATION CLICK ─────────────────────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const action = e.action;
  const data = e.notification.data || {};

  if (action === 'accept') {
    // Guardar aceptación y abrir app
    broadcastMessage({ type: 'MEAL_RESPONSE', dia: data.dia, comida: data.comida, status: 'accepted' });
    openApp('#plan');
  } else if (action === 'reject') {
    broadcastMessage({ type: 'MEAL_RESPONSE', dia: data.dia, comida: data.comida, status: 'rejected' });
    openApp('#plan');
  } else {
    openApp('#hoy');
  }
});

// ── MENSAJE DESDE LA APP ────────────────────────────────────
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_NOTIFICATION') {
    scheduleNightlyNotification();
  }
});

// ── PERIODIC BACKGROUND SYNC ────────────────────────────────
self.addEventListener('periodicsync', e => {
  if (e.tag === 'nightly-menu') {
    e.waitUntil(showMenuNotification());
  }
});

// ── HELPERS ────────────────────────────────────────────────
function scheduleNightlyNotification() {
  const now = new Date();
  const target = new Date();
  target.setHours(21, 0, 0, 0); // 21:00

  // Si ya pasaron las 21:00 de hoy, programar para mañana
  if (now >= target) {
    target.setDate(target.getDate() + 1);
  }

  const msUntilTarget = target.getTime() - now.getTime();

  // Limpiar timer anterior si existe
  if (self._notifTimer) clearTimeout(self._notifTimer);

  self._notifTimer = setTimeout(async () => {
    await showMenuNotification();
    // Reprogramar para el día siguiente
    scheduleNightlyNotification();
  }, msUntilTarget);
}

async function showMenuNotification() {
  const mañana = getManana();
  if (!mañana) return; // Fin de semana, no hay menú

  const { diaLabel, comida, cena } = mañana;

  await self.registration.showNotification('🍽️ Menú de mañana — ' + diaLabel, {
    body: `🥘 Comida: ${comida.nombre}\n🌙 Cena: ${cena.nombre}`,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-72.png',
    tag: 'menu-diario',
    renotify: true,
    requireInteraction: true,
    vibrate: [200, 100, 200],
    data: { dia: mañana.diaKey, comida: 'comida' },
    actions: [
      { action: 'accept', title: '✅ Mantener menú' },
      { action: 'reject', title: '🔄 Cambiar algo' }
    ]
  });
}

function getManana() {
  const hoy = new Date();
  const mañana = new Date(hoy);
  mañana.setDate(mañana.getDate() + 1);

  const diasMap = {
    1: { key: 'lunes',     label: 'Lunes' },
    2: { key: 'martes',    label: 'Martes' },
    3: { key: 'miercoles', label: 'Miércoles' },
    4: { key: 'jueves',    label: 'Jueves' },
    5: { key: 'viernes',   label: 'Viernes' }
  };
  const dia = diasMap[mañana.getDay()];
  if (!dia) return null;

  // Las semanas se alternan según el número de semana
  const weekNum = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  // Guardamos los datos de menú como texto (simplificado para SW)
  // La app completa los detalles cuando se abre
  return {
    diaKey: dia.key,
    diaLabel: dia.label,
    comida: { nombre: 'Comida del ' + dia.label },
    cena:   { nombre: 'Cena del ' + dia.label }
  };
}

function broadcastMessage(msg) {
  self.clients.matchAll({ type: 'window' }).then(clients => {
    clients.forEach(c => c.postMessage(msg));
  });
}

function openApp(hash) {
  const url = (self.registration.scope || '/') + 'index.html' + hash;
  self.clients.matchAll({ type: 'window' }).then(clients => {
    for (const c of clients) {
      if ('focus' in c) { c.focus(); c.navigate(url); return; }
    }
    return self.clients.openWindow(url);
  });
}
