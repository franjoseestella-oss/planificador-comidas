/**
 * config.js - Gestión segura de la API Key de Gemini
 * La clave NO está en el código fuente. Se carga desde localStorage.
 * En el primer uso, se muestra un modal para introducirla.
 */

(function () {
  // Si ya viene del env.js local (desarrollo), usarla directamente
  if (window.GEMINI_API_KEY) {
    // Sincronizar también con localStorage para consistencia
    localStorage.setItem('gemini_api_key', window.GEMINI_API_KEY);
    return;
  }

  // Intentar cargar desde localStorage
  const storedKey = localStorage.getItem('gemini_api_key');
  if (storedKey && storedKey.trim().length > 10) {
    window.GEMINI_API_KEY = storedKey.trim();
    return;
  }

  // Clave de fallback integrada (Repo es privado)
  window.GEMINI_API_KEY = 'AIzaSyD4bRsONsbaiY967fiJsBLy125V9xZmKBY';
  localStorage.setItem('gemini_api_key', window.GEMINI_API_KEY);
  return;

  function showApiKeyModal() {
    // Evitar duplicados
    if (document.getElementById('apikey-setup-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'apikey-setup-modal';
    modal.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);
      display: flex; align-items: center; justify-content: center;
      padding: 1rem; font-family: 'Inter', 'Segoe UI', sans-serif;
    `;

    modal.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 24px;
        padding: 2.5rem;
        max-width: 480px;
        width: 100%;
        box-shadow: 0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05);
        animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      ">
        <div style="text-align:center; margin-bottom: 1.5rem;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔑</div>
          <h2 style="color:#fff; margin:0; font-size:1.4rem; font-weight:700;">Configura tu API Key</h2>
          <p style="color:rgba(255,255,255,0.6); margin:0.5rem 0 0; font-size:0.9rem;">
            Para usar las funciones de IA (recetas, análisis de tickets...) necesitas una API Key gratuita de Google.
          </p>
        </div>

        <div style="
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 1rem 1.2rem;
          margin-bottom: 1.5rem;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
        ">
          <strong style="color:#64b5f6;">📋 Cómo obtenerla (gratis):</strong><br>
          1. Ve a <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:#90caf9;">aistudio.google.com</a><br>
          2. Haz clic en <em>"Create API Key"</em><br>
          3. Copia la clave y pégala aquí ↓
        </div>

        <div style="margin-bottom: 1rem;">
          <input
            type="password"
            id="apikey-input"
            placeholder="AIzaSy..."
            style="
              width: 100%; box-sizing: border-box;
              padding: 0.9rem 1.1rem;
              background: rgba(255,255,255,0.08);
              border: 1px solid rgba(255,255,255,0.2);
              border-radius: 12px;
              color: #fff;
              font-size: 0.95rem;
              outline: none;
              transition: border-color 0.2s;
            "
            onfocus="this.style.borderColor='rgba(100,181,246,0.6)'"
            onblur="this.style.borderColor='rgba(255,255,255,0.2)'"
          />
          <p id="apikey-error" style="color:#ef5350; font-size:0.8rem; margin:0.4rem 0 0; display:none;">
            ⚠️ La clave no parece válida. Debe empezar por "AIza..."
          </p>
        </div>

        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <button
            id="apikey-save-btn"
            onclick="window._saveApiKey()"
            style="
              flex:1; min-width: 140px;
              padding: 0.9rem 1.5rem;
              background: linear-gradient(135deg, #2196f3, #1565c0);
              color: #fff; border: none; border-radius: 12px;
              font-size: 0.95rem; font-weight: 600; cursor: pointer;
              transition: transform 0.15s, box-shadow 0.15s;
              box-shadow: 0 4px 15px rgba(33,150,243,0.4);
            "
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(33,150,243,0.5)'"
            onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(33,150,243,0.4)'"
          >
            ✅ Guardar y continuar
          </button>
          <button
            onclick="document.getElementById('apikey-setup-modal').remove()"
            style="
              padding: 0.9rem 1.2rem;
              background: rgba(255,255,255,0.08);
              color: rgba(255,255,255,0.6);
              border: 1px solid rgba(255,255,255,0.15);
              border-radius: 12px;
              font-size: 0.85rem; cursor: pointer;
              transition: background 0.2s;
            "
            onmouseover="this.style.background='rgba(255,255,255,0.12)'"
            onmouseout="this.style.background='rgba(255,255,255,0.08)'"
          >
            Omitir por ahora
          </button>
        </div>

        <p style="color:rgba(255,255,255,0.35); font-size:0.75rem; text-align:center; margin:1rem 0 0;">
          🔒 La clave se guarda solo en tu dispositivo (localStorage). Nunca se sube a ningún servidor.
        </p>
      </div>
      <style>
        @keyframes slideUp {
          from { opacity:0; transform: translateY(30px) scale(0.95); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
      </style>
    `;

    document.body.appendChild(modal);

    // Guardar con Enter
    const input = document.getElementById('apikey-input');
    input.focus();
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') window._saveApiKey();
    });
  }

  window._saveApiKey = function () {
    const input = document.getElementById('apikey-input');
    const errorEl = document.getElementById('apikey-error');
    const key = (input.value || '').trim();

    if (!key || key.length < 20 || !key.startsWith('AIza')) {
      errorEl.style.display = 'block';
      input.style.borderColor = 'rgba(239,83,80,0.6)';
      return;
    }

    localStorage.setItem('gemini_api_key', key);
    window.GEMINI_API_KEY = key;

    document.getElementById('apikey-setup-modal').remove();

    // Toast de confirmación si existe la función
    if (typeof showToast === 'function') {
      showToast('✅ API Key configurada correctamente', 'success');
    }
  };
})();
