const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const code = fs.readFileSync('js/app.js', 'utf8');

const dom = new JSDOM(`<!DOCTYPE html><html><body><div id='app'></div></body></html>`, { runScripts: 'dangerously' });
dom.window.eval('localStorage = { getItem: () => null, setItem: () => {} };');
dom.window.eval('Notification = { permission: \"default\" };');
dom.window.eval('DIAS = ["lunes"]; DIAS_LABEL = {lunes: "Lunes"};');
dom.window.eval(code);

dom.window.document.body.innerHTML = `
<div id="shopping-list"></div>
<div id="assistant-items"></div>
<div id="assistant-modal"></div>
`;

dom.window.STATE.semana = {
   lunes: { comida: { ingredientes: [{ nombre: 'Espaguetis', cantidad: '100g', comprar: true }] }, cena: { ingredientes: [] } }
};
dom.window.STATE.desvan = [];
dom.window.STATE.shopping = [];
dom.window.showToast = function(msg) { console.log("TOAST:", msg); };

try {
  dom.window.openShoppingAssistant();
  
  // mock the value
  const input = dom.window.document.getElementById('assist-qty-0');
  input.value = '100';
  
  dom.window.acceptAssistantItem(0);
  console.log('Success! Items length:', dom.window.STATE.shopping.length);
} catch (e) {
  console.error('ERROR CAUGHT:', e.message);
  console.error(e.stack);
}
