/**
 * config.js - Gestión segura de la API Key de Gemini
 * La clave NO está en el código fuente. Se carga desde localStorage.
 * En el primer uso, se muestra un modal para introducirla.
 */

(function () {
  // Ya no necesitamos pedir API Key en local. 
  // Ahora la app hace las peticiones directamente a /api/gemini 
  // usando la Variable de Entorno de Vercel.
})();
