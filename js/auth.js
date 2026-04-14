// ============================================================
// AUTH.JS — Pantalla de bloqueo con contraseña y Reconocimiento Facial
// ============================================================

(function () {
  // Contraseña almacenada como hash simple (Base64 + inversión)
  const _h = 'eXJldmVyb2Fpcm9nZWlkbmVN'; // codificación interna
  const SESSION_KEY = 'mimenu_auth_session';
  const FACE_DESCRIPTOR_KEY = 'mimenu_face_descriptor';
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

  let videoStream = null;
  let faceDetectionInterval = null;

  async function showLockScreen() {
    // Ocultar el contenido de la app mientras está bloqueado
    document.getElementById('app').style.visibility = 'hidden';

    const overlay = document.createElement('div');
    overlay.id = 'lock-overlay';
    overlay.innerHTML = `
      <div class="lock-bg-blur"></div>
      <div class="lock-card" style="width: 340px; padding: 25px; text-align: center;">
        <div class="lock-logo" style="margin-bottom: 15px;">
          <div class="lock-logo-icon" style="font-size: 2.5rem;">🥘</div>
          <div class="lock-logo-name" style="font-size: 1.5rem; font-weight: bold; margin-top: 5px;">MiMenú</div>
          <div class="lock-logo-sub" style="font-size: 0.85rem; color: #888;">Seguridad Inteligente</div>
        </div>

        <div id="lock-face-wrap" style="position: relative; width: 140px; height: 140px; margin: 0 auto 15px auto; border-radius: 50%; overflow: hidden; background: #222; border: 3px solid var(--border); display: none;">
          <video id="lock-video" autoplay muted playsinline style="width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1);"></video>
          <div id="lock-face-overlay" style="position: absolute; top:0; left:0; width:100%; height:100%; pointer-events: none;"></div>
        </div>

        <p class="lock-label" id="lock-status-text" style="font-size: 0.85rem; color: #aaa; margin-bottom: 15px;">Iniciando seguridad...</p>

        <div class="lock-input-wrap" id="lock-input-wrap" style="margin-bottom: 10px;">
          <input
            id="lock-password"
            type="password"
            class="lock-input"
            placeholder="Contraseña"
            autocomplete="current-password"
            inputmode="text"
          />
          <button class="lock-eye-btn" id="lock-eye-btn" aria-label="Mostrar contraseña">👁️</button>
        </div>

        <div class="lock-error" id="lock-error" style="margin-bottom: 10px;"></div>

        <div style="display:flex; gap:10px; margin-bottom: 15px;">
          <button class="lock-btn" id="lock-submit" style="flex:1;">
            <span>Entrar</span>
          </button>
          <button class="lock-btn" id="lock-register-face" style="flex:1; background: var(--bg-card2); color: var(--text); border: 1px solid var(--border); display: none;" title="Escribe tu contraseña y registra tu rostro">
            <span>👤 Guardar</span>
          </button>
        </div>

        <p class="lock-remember-text" style="margin-top:0">Este dispositivo se recordará <strong>${SESSION_DAYS} días</strong></p>
      </div>
    `;

    document.body.appendChild(overlay);

    // Animar entrada
    requestAnimationFrame(() => {
      overlay.classList.add('lock-visible');
    });

    const input = document.getElementById('lock-password');
    const submitBtn = document.getElementById('lock-submit');
    const registerBtn = document.getElementById('lock-register-face');
    const errorEl = document.getElementById('lock-error');
    const eyeBtn = document.getElementById('lock-eye-btn');
    const wrap = document.getElementById('lock-input-wrap');
    const video = document.getElementById('lock-video');
    const faceWrap = document.getElementById('lock-face-wrap');
    const statusText = document.getElementById('lock-status-text');

    // Toggle mostrar contraseña
    eyeBtn.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      eyeBtn.textContent = show ? '🙈' : '👁️';
      input.focus();
    });

    function cleanUpCamera() {
      if (faceDetectionInterval) clearInterval(faceDetectionInterval);
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    }

    function tryUnlock(skipPasswordCheck = false) {
      if (skipPasswordCheck) {
        cleanUpCamera();
        saveSession();
        unlockApp(overlay);
        return;
      }

      const val = input.value;
      if (!val) {
        shakeInput(wrap);
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="lock-spinner"></span>';

      setTimeout(() => {
        if (_verify(val)) {
          cleanUpCamera();
          saveSession();
          unlockApp(overlay);
        } else {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Entrar</span>';
          errorEl.textContent = '❌ Contraseña incorrecta.';
          errorEl.classList.add('visible');
          shakeInput(wrap);
          input.value = '';
          input.focus();
          setTimeout(() => errorEl.classList.remove('visible'), 3000);
        }
      }, 500);
    }

    submitBtn.addEventListener('click', () => tryUnlock(false));
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') tryUnlock(false);
      if (errorEl.classList.contains('visible')) {
        errorEl.classList.remove('visible');
      }
    });

    // FACE API LOGIC
    let isFaceApiLoaded = false;
    let registeredDescriptor = null;
    let currentDescriptor = null;

    try {
      const saved = localStorage.getItem(FACE_DESCRIPTOR_KEY);
      if (saved) registeredDescriptor = new Float32Array(JSON.parse(saved));
    } catch {}

    async function initFaceApi() {
      if (typeof faceapi === 'undefined') {
        statusText.textContent = "Introduce la contraseña.";
        input.focus();
        return;
      }
      try {
        statusText.textContent = "Cargando IA facial...";
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        isFaceApiLoaded = true;

        statusText.textContent = "Enciende la cámara...";
        videoStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        video.srcObject = videoStream;
        faceWrap.style.display = 'block';
        registerBtn.style.display = 'block';

      } catch (err) {
        console.error("Camera/FaceAPI error", err);
        statusText.textContent = "Cámara no disponible, usa la clave.";
        faceWrap.style.display = 'none';
        input.focus();
      }
    }

    video.addEventListener('play', () => {
      statusText.textContent = registeredDescriptor ? "Buscando rostro registrado..." : "Ningún rostro registrado.";

      faceDetectionInterval = setInterval(async () => {
        if (submitBtn.disabled) return; 
        
        const detection = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor();
        if (detection) {
          currentDescriptor = detection.descriptor;
          if (registeredDescriptor) {
            const distance = faceapi.euclideanDistance(registeredDescriptor, currentDescriptor);
            if (distance < 0.45) { // Threshold de seguridad
              statusText.textContent = "✅ ¡Hola Franji!";
              statusText.style.color = "var(--primary)";
              faceWrap.style.borderColor = "var(--primary)";
              clearInterval(faceDetectionInterval);
              setTimeout(() => { tryUnlock(true); }, 800);
            } else {
              statusText.textContent = "⚠️ Rostro no reconocido.";
              statusText.style.color = "var(--error)";
              faceWrap.style.borderColor = "var(--error)";
            }
          } else {
            statusText.textContent = "Rostro detectado (sin registrar)";
            statusText.style.color = "var(--text)";
            faceWrap.style.borderColor = "var(--border)";
          }
        } else {
          statusText.textContent = "Mirando a la cámara...";
          statusText.style.color = "#aaa";
          faceWrap.style.borderColor = "var(--border)";
          currentDescriptor = null;
        }
      }, 500);
    });

    registerBtn.addEventListener('click', () => {
      const val = input.value;
      if (!val) {
        errorEl.textContent = 'Introduce la clave para poder guardar tu rostro';
        errorEl.classList.add('visible');
        shakeInput(wrap);
        setTimeout(() => errorEl.classList.remove('visible'), 3000);
        return;
      }
      if (!_verify(val)) {
        errorEl.textContent = '❌ Contraseña incorrecta.';
        errorEl.classList.add('visible');
        shakeInput(wrap);
        return;
      }
      if (!currentDescriptor) {
        errorEl.textContent = '⚠️ ¡Ponte frente a la cámara primero!';
        errorEl.classList.add('visible');
        shakeInput(wrap);
        setTimeout(() => errorEl.classList.remove('visible'), 3000);
        return;
      }

      // Guardar descriptor
      localStorage.setItem(FACE_DESCRIPTOR_KEY, JSON.stringify(Array.from(currentDescriptor)));
      registeredDescriptor = currentDescriptor;
      statusText.textContent = '✅ ¡Rostro guardado correctamente!';
      statusText.style.color = "var(--primary)";
      
      // Auto unlock
      setTimeout(() => { tryUnlock(true); }, 1500);
    });

    // Arrancar modelos si faceapi existe
    let faceApiCheckCount = 0;
    const checkFaceApi = setInterval(() => {
      if (typeof faceapi !== 'undefined') {
        clearInterval(checkFaceApi);
        initFaceApi();
      } else if (faceApiCheckCount > 10) {
        clearInterval(checkFaceApi); // Fallback: stop trying after 2s
      }
      faceApiCheckCount++;
    }, 200);
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
