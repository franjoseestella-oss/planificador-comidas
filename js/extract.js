const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/franj/.gemini/antigravity/brain/09600aec-8246-4c20-8efa-fdb0908a3a54/.system_generated/steps/946/output.txt', 'utf8'));
const ans = data.answer.replace(/```json/g, '').replace(/```/g, '').trim();
try {
  const p = JSON.parse(ans);
  fs.writeFileSync('../notebooklm_recipes.json', JSON.stringify(p, null, 2));
  console.log(Object.keys(p).length + ' recipes found, saved to ../notebooklm_recipes.json');
} catch(e) {
  console.log(e);
}
