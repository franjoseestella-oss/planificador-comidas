const fs = require('fs');

const dataPath = './data.js';
const recipesPath = './recipes.json';

const content = fs.readFileSync(dataPath, 'utf8');
const recetasNuevas = fs.readFileSync(recipesPath, 'utf8');

const startIndex = content.indexOf('const RECETAS_NUEVAS = {');
if (startIndex !== -1) {
    const endRegex = /^};\s*$/gm;
    const afterStart = content.substring(startIndex);
    let found;
    let endIndex = -1;
    while ((found = endRegex.exec(afterStart)) !== null) {
        endIndex = startIndex + found.index + 1;
        break; // Stop at the first closing bracket on its own line
    }
    
    if (endIndex !== -1) {
        const replacement = 'const RECETAS_NUEVAS = ' + recetasNuevas + ';';
        const finalContent = content.substring(0, startIndex) + replacement + content.substring(endIndex + 1);
        fs.writeFileSync(dataPath, finalContent);
        console.log('Successfully updated RECETAS_NUEVAS.');
    } else {
        console.log('Error: Could not find closing bracket.');
    }
} else {
    console.log('Error: Could not find start of RECETAS_NUEVAS.');
}
