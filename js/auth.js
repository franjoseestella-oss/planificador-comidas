// ============================================================
// AUTH.JS — Pantalla de bloqueo con contraseña
// ============================================================

(function () {
  // Contraseña almacenada como hash simple (Base64 + inversión)
  const _h = 'eXJldmVyb2Fpcm9nZWlkbmVN'; // codificación interna
  const SESSION_KEY = 'mimenu_auth_session';
  const SESSION_DAYS = 30;

  function _verify(input) {
    try {
      return btoa(input) === atob(_h).split('').reverse().join('') ||
             btoa(input) === _h.split('').reduce((a, c, i) =>
               i % 2 === 0 ? a + c : c + a, '') ||
             _decode() === input;
    } catch { return false; }
  }

  function _decode() {
    return atob(atob('VFdWdVpHbG5iM0p5YVdGbWIzSmxkbVZ5'));
  }

  function isAuthenticated() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return false;
      const { expiry } = JSON.parse(raw);
      return Date.now() < expiry;
    } catch { return false; }
  }

  function saveSession() {
    const expiry = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(SESSION_KEY, JSON.stringify({ expiry }));
  }

  function showLockScreen() {
    // Ocultar el contenido de la app mientras está bloqueado
    document.getElementById('app').style.visibility = 'hidden';

    const overlay = document.createElement('div');
    overlay.id = 'lock-overlay';
    overlay.innerHTML = `
      <div class="lock-bg-blur"></div>
      <div class="lock-card">
        <div class="lock-logo">
          <div class="lock-logo-icon">🥘</div>
          <div class="lock-logo-name">MiMenú</div>
          <div class="lock-logo-sub">Planificador familiar</div>
        </div>

        <div class="lock-icon-wrap">
          <div class="lock-shield">🔒</div>
        </div>

        <p class="lock-label">Introduce tu contraseña</p>

        <div class="lock-input-wrap" id="lock-input-wrap">
          <input
            id="lock-password"
            type="password"
            class="lock-input"
            placeholder="Contraseña"
            autocomplete="current-password"
            inputmode="text"
            autofocus
          />
          <button class="lock-eye-btn" id="lock-eye-btn" aria-label="Mostrar contraseña">👁️</button>
        </div>

        <div class="lock-error" id="lock-error"></div>

        <button class="lock-btn" id="lock-submit">
          <span>Entrar</span>
          <span class="lock-btn-arrow">→</span>
        </button>

        <p class="lock-remember-text">Este dispositivo se recordará <strong>${SESSION_DAYS} días</strong></p>
      </div>
    `;

    document.body.appendChild(overlay);

    // Animar entrada
    requestAnimationFrame(() => {
      overlay.classList.add('lock-visible');
    });

    const input = document.getElementById('lock-password');
    const submitBtn = document.getElementById('lock-submit');
    const errorEl = document.getElementById('lock-error');
    const eyeBtn = document.getElementById('lock-eye-btn');
    const wrap = document.getElementById('lock-input-wrap');

    // Toggle mostrar contraseña
    eyeBtn.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      eyeBtn.textContent = show ? '🙈' : '👁️';
      input.focus();
    });

    function tryUnlock() {
      const val = input.value;
      if (!val) {
        shakeInput(wrap);
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="lock-spinner"></span>';

      setTimeout(() => {
        if (_verify(val)) {
          saveSession();
          unlockApp(overlay);
        } else {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Entrar</span><span class="lock-btn-arrow">→</span>';
          errorEl.textContent = '❌ Contraseña incorrecta. Inténtalo de nuevo.';
          errorEl.classList.add('visible');
          shakeInput(wrap);
          input.value = '';
          input.focus();
          setTimeout(() => errorEl.classList.remove('visible'), 3000);
        }
      }, 500);
    }

    submitBtn.addEventListener('click', tryUnlock);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') tryUnlock();
      if (errorEl.classList.contains('visible')) {
        errorEl.classList.remove('visible');
      }
    });

    // Focus al input tras animación
    setTimeout(() => input.focus(), 400);
  }

  function unlockApp(overlay) {
    overlay.classList.add('lock-unlocking');
    document.getElementById('app').style.visibility = 'visible';
    document.getElementById('app').classList.add('app-unlock-anim');
    setTimeout(() => {
      overlay.remove();
    }, 600);
  }

  function shakeInput(el) {
    el.classList.remove('lock-shake');
    void el.offsetWidth; // reflow para reiniciar animación
    el.classList.add('lock-shake');
    setTimeout(() => el.classList.remove('lock-shake'), 500);
  }

  // ── INIT ──────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    if (!isAuthenticated()) {
      showLockScreen();
    }
  }
})();
