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

  // === DIBUJAR MALLA AZUL QUE TAPA LA CARA ===
  function drawBlueMesh(ctx, positions) {
    if (!positions || positions.length < 68) return;
    const DELAUNAY_TRIANGLES = [
      [26, 44, 25], [28, 29, 40], [2, 1, 41], [17, 36, 0], [36, 1, 0], [1, 36, 41], [15, 14, 46], [45, 44, 26], [44, 45, 46], [45, 26, 16], [15, 45, 16], [45, 15, 46], [29, 35, 30], [35, 13, 12], [31, 29, 30], [29, 31, 40], [40, 31, 41], [38, 19, 20], [42, 28, 27], [44, 24, 25], [35, 34, 30], [35, 47, 46], [47, 35, 29], [47, 29, 28], [42, 47, 28], [47, 44, 46], [32, 31, 30], [38, 39, 40], [28, 39, 27], [39, 28, 40], [37, 40, 41], [37, 38, 40], [36, 37, 41], [37, 17, 18], [37, 36, 17], [19, 37, 18], [38, 37, 19], [23, 24, 44], [9, 53, 10], [59, 11, 10], [11, 59, 12], [59, 35, 12], [47, 43, 44], [43, 47, 42], [43, 42, 22], [43, 23, 44], [23, 43, 22], [31, 4, 3], [5, 56, 6], [6, 56, 48], [4, 56, 5], [56, 4, 31], [33, 58, 50], [58, 33, 34], [34, 33, 30], [33, 32, 30], [21, 38, 20], [21, 39, 38], [39, 21, 27], [53, 65, 64], [65, 53, 9], [59, 51, 35], [7, 55, 67], [55, 6, 48], [55, 7, 6], [33, 57, 32], [57, 33, 50], [61, 57, 50], [54, 9, 8], [54, 65, 9], [54, 66, 65], [66, 54, 67], [7, 54, 8], [54, 7, 67], [51, 52, 64], [52, 51, 59], [53, 52, 10], [52, 53, 64], [52, 59, 10], [65, 63, 64], [63, 51, 64], [51, 63, 58], [58, 63, 50], [56, 49, 48], [49, 56, 31], [49, 57, 61], [66, 62, 65], [62, 63, 65], [63, 62, 50], [61, 62, 67], [62, 61, 50], [62, 66, 67], [60, 61, 67], [55, 60, 67], [60, 49, 61], [60, 55, 48], [49, 60, 48], [13, 35, 14], [14, 35, 46], [2, 31, 3], [31, 2, 41], [24, 23, 19], [19, 23, 20], [23, 21, 20], [21, 23, 22], [21, 42, 27], [42, 21, 22], [51, 58, 34], [51, 34, 35], [57, 49, 32], [32, 49, 31]
    ];
    
    // 1. Dibujamos un contorno exterior gigante ("Máscara entera") usando el contorno facial y subiendo a la frente.
    ctx.beginPath();
    ctx.moveTo(positions[0].x, positions[0].y); // Borde izquierdo mandíbula
    for (let i = 1; i <= 16; i++) {
        ctx.lineTo(positions[i].x, positions[i].y); // Borde derecho mandíbula
    }
    // Frente: ir por las cejas sumando altura (Y hacia arriba)
    for (let i = 26; i >= 17; i--) {
        ctx.lineTo(positions[i].x, positions[i].y - 30);
    }
    ctx.closePath();
    
    ctx.fillStyle = 'rgba(0, 150, 255, 0.2)'; // Relleno azul
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#0096ff';
    ctx.stroke();

    // 2. Dibujamos la malla interior de rasgos
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(0, 150, 255, 0.5)';
    DELAUNAY_TRIANGLES.forEach(tri => {
      const A = positions[tri[0]];
      const B = positions[tri[1]];
      const C = positions[tri[2]];
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.lineTo(C.x, C.y);
      ctx.closePath();
      ctx.stroke();
    });
    
    // 3. Dibujar puntos brillantes de la malla
    ctx.fillStyle = '#fff';
    positions.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  function isAuthenticated() {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  }

  function saveSession() {
    sessionStorage.setItem(SESSION_KEY, 'true');
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

        <div id="lock-face-wrap" style="position: relative; width: 180px; height: 180px; margin: 0 auto 15px auto; border-radius: 50%; overflow: hidden; background: #222; border: 3px solid var(--border); display: none;">
          <video id="lock-video" autoplay muted playsinline style="width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1);"></video>
          <canvas id="lock-canvas" style="position: absolute; top:0; left:0; width:100%; height:100%; transform: scaleX(-1);"></canvas>
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
        </div>

        <p class="lock-remember-text" style="margin-top:0">Se pedirá el rostro cada vez que abras la app para mayor seguridad.</p>
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
    let registeredFaces = [];
    let currentDescriptor = null;

    try {
      const savedStr = localStorage.getItem('mimenu_faces');
      const oldSaved = localStorage.getItem(FACE_DESCRIPTOR_KEY);
      
      if (savedStr) {
        registeredFaces = JSON.parse(savedStr).map(f => ({ name: f.name, descriptor: new Float32Array(f.descriptor) }));
      } else if (oldSaved) {
        // Migramos el anterior a la nueva estructura de multiples caras
        const oldDesc = JSON.parse(oldSaved);
        registeredFaces = [{ name: 'Usuario Principal', descriptor: new Float32Array(oldDesc) }];
        localStorage.setItem('mimenu_faces', JSON.stringify([{ name: 'Usuario Principal', descriptor: Array.from(oldDesc) }]));
        localStorage.removeItem(FACE_DESCRIPTOR_KEY);
      }
    } catch { }

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

      } catch (err) {
        console.error("Camera/FaceAPI error", err);
        statusText.textContent = "Cámara no disponible, usa la clave.";
        faceWrap.style.display = 'none';
        input.focus();
      }
    }

    video.addEventListener('play', () => {
      statusText.textContent = registeredFaces.length > 0 ? "Buscando rostro registrado..." : "Ningún rostro registrado.";

      const canvas = document.getElementById('lock-canvas');
      const displaySize = { width: video.videoWidth || 140, height: video.videoHeight || 140 };
      faceapi.matchDimensions(canvas, displaySize);

      faceDetectionInterval = setInterval(async () => {
        if (submitBtn.disabled) return;

        const detection = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor();

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (detection) {
          const displaySize = { width: video.offsetWidth, height: video.offsetHeight };
          faceapi.matchDimensions(canvas, displaySize);
          const resizedDetections = faceapi.resizeResults(detection, displaySize);

          // === Dibujar Malla Azul Precisa ===
          drawBlueMesh(ctx, resizedDetections.landmarks.positions);

          currentDescriptor = detection.descriptor;
          if (registeredFaces.length > 0) {
            let bestMatch = null;
            let minDistance = 1;
            
            registeredFaces.forEach(face => {
               const dist = faceapi.euclideanDistance(face.descriptor, currentDescriptor);
               if(dist < minDistance) {
                  minDistance = dist;
                  bestMatch = face;
               }
            });

            if (bestMatch && minDistance < 0.55) { // Threshold de seguridad relajado para mejor reconocimiento
              statusText.textContent = `✅ ¡Hola ${bestMatch.name}!`;
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
      }, 100); // 10 fps aprox para ver la malla fluida
    });

    // Registro movido a biometry setup externo

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

  // ============================================================================
  // DEDICATED BIOMETRY SETUP SCREEN WITH MASK EFFECT
  // ============================================================================
  window.openBiometrySetup = async function () {
    if (typeof faceapi === 'undefined') {
      alert("Cargando la IA biométrica... por favor, intenta en unos segundos.");
      return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'lock-overlay lock-visible';
    overlay.style.zIndex = '99999';
    overlay.style.background = 'rgba(0,0,0,0.85)';
    overlay.style.backdropFilter = 'blur(10px)';

    const facesJSON = localStorage.getItem('mimenu_faces');
    let savedFaces = facesJSON ? JSON.parse(facesJSON) : [];
    
    // Migración por si acaso entran directo
    if (!facesJSON && localStorage.getItem(FACE_DESCRIPTOR_KEY)) {
        savedFaces = [{ name: 'Usuario Principal', descriptor: JSON.parse(localStorage.getItem(FACE_DESCRIPTOR_KEY)) }];
        localStorage.setItem('mimenu_faces', JSON.stringify(savedFaces));
        localStorage.removeItem(FACE_DESCRIPTOR_KEY);
    }

    let facesHTML = '';
    if (savedFaces.length > 0) {
       facesHTML = `<div style="margin: 15px 0; background: rgba(0,0,0,0.2); border-radius: 10px; overflow-y: auto; max-height: 150px; border: 1px solid var(--border);">
                      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem; color: var(--text);">
                        <thead style="position: sticky; top: 0; background: #222; z-index: 1;">
                          <tr style="text-transform: uppercase; font-size: 0.75rem; color: #888;">
                            <th style="padding: 10px; border-bottom: 1px solid var(--border);">Personas Registradas</th>
                            <th style="padding: 10px; border-bottom: 1px solid var(--border); width: 70px; text-align: center;">Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${savedFaces.map((f, i) => `
                          <tr>
                            <td style="padding: 10px; border-bottom: 1px solid var(--border);">
                               <span style="font-size:1.1rem; margin-right:5px;">👤</span> 
                               <strong>${f.name}</strong>
                            </td>
                            <td style="padding: 10px; border-bottom: 1px solid var(--border); text-align: center;">
                              <button class="bio-del-item" data-index="${i}" style="background: var(--error); border: none; color: white; border-radius: 6px; padding: 5px 10px; cursor: pointer; font-size: 0.8rem; font-weight: bold;" title="Borrar este rostro">Borrar</button>
                            </td>
                          </tr>`).join('')}
                        </tbody>
                      </table>
                    </div>`;
    }

    overlay.innerHTML = `
      <div class="lock-card" style="width: 360px; max-width: 90vw; padding: 15px 25px 25px; text-align: center; position:relative;">
        <button id="bio-close" class="icon-btn" style="position:absolute; top: 10px; right: 10px; background:transparent; font-size:1.5rem; color:var(--text); border:none;">✖</button>
        
        <div class="lock-logo" style="margin-bottom: 10px;">
          <div class="lock-logo-icon" style="font-size: 2rem;">👤</div>
          <div class="lock-logo-name" style="font-size: 1.3rem; font-weight: bold; margin-top: 5px;">Configurar Rostro</div>
        </div>

        <div id="bio-face-wrap" style="position: relative; width: 260px; height: 260px; max-width: 100%; margin: 0 auto 10px auto; border-radius: 20px; overflow: hidden; background: #222; border: 3px solid var(--border);">
          <video id="bio-video" autoplay muted playsinline style="width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1);"></video>
          <canvas id="bio-canvas" style="position: absolute; top:0; left:0; width:100%; height:100%; transform: scaleX(-1);"></canvas>
        </div>

        ${facesHTML}

        <p id="bio-status" style="font-size: 0.85rem; font-weight:bold; color: var(--text); margin-bottom: 10px;">Encendiendo cámara...</p>

        <input type="text" id="bio-name-input" placeholder="Nombre de quien se registra..." style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border); background:rgba(0,0,0,0.2); color:var(--text); margin-bottom: 10px; font-family:inherit; outline:none;">

        <button class="lock-btn" id="bio-save-btn" disabled style="width: 100%; opacity: 0.5;">
          <span>📸 Guardar rostro</span>
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    const video = overlay.querySelector('#bio-video');
    const canvas = overlay.querySelector('#bio-canvas');
    const faceWrap = overlay.querySelector('#bio-face-wrap');
    const statusText = overlay.querySelector('#bio-status');
    const saveBtn = overlay.querySelector('#bio-save-btn');
    const closeBtn = overlay.querySelector('#bio-close');
    const nameInput = overlay.querySelector('#bio-name-input');

    let localStream = null;
    let bioInterval = null;
    let latestDescriptor = null;

    function cleanup() {
      if (bioInterval) clearInterval(bioInterval);
      if (localStream) {
        localStream.getTracks().forEach(t => t.stop());
      }
      overlay.remove();
    }

    closeBtn.addEventListener('click', cleanup);

    // Borrado individual
    overlay.querySelectorAll('.bio-del-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        savedFaces.splice(idx, 1);
        localStorage.setItem('mimenu_faces', JSON.stringify(savedFaces));
        cleanup(); 
        setTimeout(() => window.openBiometrySetup(), 100);
      });
    });

    saveBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      if (!name) {
         nameInput.style.borderColor = 'var(--error)';
         nameInput.focus();
         return;
      }
      nameInput.style.borderColor = 'var(--border)';

      if (latestDescriptor) {
        savedFaces.push({ name: name, descriptor: Array.from(latestDescriptor) });
        localStorage.setItem('mimenu_faces', JSON.stringify(savedFaces));
        
        statusText.textContent = '✅ ¡Guardado como ' + name + '!';
        statusText.style.color = 'var(--primary)';
        faceWrap.style.borderColor = 'var(--primary)';
        saveBtn.style.display = 'none';
        nameInput.style.display = 'none';
        setTimeout(() => {
           cleanup();
           setTimeout(() => window.openBiometrySetup(), 50);
        }, 1200);
      }
    });

    try {
      statusText.textContent = "Cargando IA facial...";
      if (!faceapi.nets.ssdMobilenetv1.isLoaded) await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      if (!faceapi.nets.faceLandmark68Net.isLoaded) await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      if (!faceapi.nets.faceRecognitionNet.isLoaded) await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

      statusText.textContent = "Encendiendo cámara...";
      localStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      video.srcObject = localStream;
    } catch (err) {
      statusText.textContent = "Error al abrir la cámara.";
    }

    video.addEventListener('play', () => {
      statusText.textContent = "Buscando rostro...";
      const displaySize = { width: video.videoWidth || 220, height: video.videoHeight || 220 };
      faceapi.matchDimensions(canvas, displaySize);

      bioInterval = setInterval(async () => {
        const detection = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor();
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (detection) {
          const dSize = { width: video.offsetWidth, height: video.offsetHeight };
          faceapi.matchDimensions(canvas, dSize);
          const resizedDetections = faceapi.resizeResults(detection, dSize);

          latestDescriptor = detection.descriptor;
          saveBtn.disabled = false;
          saveBtn.style.opacity = '1';
          nameInput.style.display = 'block'; // Ensure input is visible
          statusText.textContent = "¡Rostro detectado! Pon un nombre y pulsa botón para añadirte.";
          statusText.style.color = "var(--primary)";
          faceWrap.style.borderColor = "var(--primary)";

          // === DIBUJAR MALLA AZUL QUE TAPA LA CARA ===
          const positions = resizedDetections.landmarks.positions;
          drawBlueMesh(ctx, positions);
        } else {
          latestDescriptor = null;
          saveBtn.disabled = true;
          saveBtn.style.opacity = '0.5';
          statusText.textContent = "Mirando a la cámara...";
          statusText.style.color = "var(--text)";
          faceWrap.style.borderColor = "var(--border)";
        }
      }, 100);
    });
  };
})();
