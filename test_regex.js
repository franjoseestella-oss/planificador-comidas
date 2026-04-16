const stem = str => str.replace(/\b(\w{3,})es\b/g, '$1').replace(/\b(\w{2,})s\b/g, '$1');
console.log(stem('espinacas'), stem('bolsa de espinacas'), stem('sal'), stem('salmon'), stem('limones'));

const check = (a, b) => {
    const normA = a.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    const normB = b.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    
    // Direct or plural match
    if (normA === normB || normA+'s'===normB || normB+'s'===normA || normA+'es'===normB || normB+'es'===normA) return true;
    
    // Substring with word boundaries (stemming plurals first)
    const sA = stem(normA);
    const sB = stem(normB);
    
    const escA = sA.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escB = sB.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    return new RegExp('\\b' + escA + '\\b').test(sB) || new RegExp('\\b' + escB + '\\b').test(sA);
};

console.log('espinaca vs bolsa de espinacas:', check('espinaca', 'bolsa de espinacas'));
console.log('sal vs salmon:', check('sal', 'salmon'));
console.log('ajo vs dientes de ajo:', check('ajo', 'dientes de ajo'));
