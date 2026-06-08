export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url = req.body && req.body.url;
  if (!url || !/^https?:\/\//i.test(url)) {
    return res.status(400).json({ error: 'URL no válida.' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MiMenuBot/1.0; +https://planificador-comidas)',
        'Accept': 'text/html,application/xhtml+xml'
      },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!r.ok) {
      return res.status(502).json({ error: `La web respondió con el código ${r.status}.` });
    }

    let html = await r.text();

    // Eliminar bloques no informativos
    html = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ');

    // Quitar etiquetas HTML
    let text = html.replace(/<[^>]+>/g, ' ');

    // Decodificar entidades HTML básicas
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));

    // Normalizar espacios
    text = text.replace(/\s+/g, ' ').trim();

    if (!text) {
      return res.status(422).json({ error: 'No se encontró texto legible en la página.' });
    }

    return res.status(200).json({ text: text.slice(0, 20000) });
  } catch (err) {
    clearTimeout(timeout);
    const msg = err.name === 'AbortError'
      ? 'La web tardó demasiado en responder.'
      : (err.message || 'Error al leer la página.');
    return res.status(500).json({ error: msg });
  }
}
