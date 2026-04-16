// Test unit logic
function parseQtyNumber(str) {
  if (str === null || str === undefined) return null;
  if (typeof str === 'number') return str;
  str = String(str);
  const frac = str.match(/^(\d+)\/(\d+)/);
  if (frac) return parseInt(frac[1]) / parseInt(frac[2]);
  const num = str.match(/^([\d.]+)/);
  if (num) return parseFloat(num[1]);
  return null;
}
function parseQtyUnit(str) {
  if (str === null || str === undefined) return '';
  str = String(str);
  return str.replace(/^[\d.\/]+\s*/, '').trim().toLowerCase();
}

const UNIT_GROUPS = {
  g: { base: 'g', factor: 1, type: 'weight' },
  kg: { base: 'g', factor: 1000, type: 'weight' },
  ml: { base: 'ml', factor: 1, type: 'volume' },
  l: { base: 'ml', factor: 1000, type: 'volume' },
  ud: { base: 'ud', factor: 1, type: 'count' },
  uds: { base: 'ud', factor: 1, type: 'count' }
};

function smartCalcRemaining(neededStr, haveNum, haveUnitStr) {
  if (haveNum === null || haveNum === undefined || haveNum === 0) return neededStr;
  
  const neededNum = parseQtyNumber(neededStr);
  if (neededNum === null) return neededStr; // c/s
  
  const rawNeededUnit = parseQtyUnit(neededStr);
  const rawHaveUnit = parseQtyUnit(haveUnitStr || '');
  
  const nUnitObj = UNIT_GROUPS[rawNeededUnit] || { base: rawNeededUnit, factor: 1, type: 'unknown' };
  const hUnitObj = UNIT_GROUPS[rawHaveUnit] || { base: rawHaveUnit, factor: 1, type: 'unknown' };
  
  // If exact same type and base (e.g. weight to weight) OR exactly same unknown unit
  if ((nUnitObj.type === hUnitObj.type && nUnitObj.type !== 'unknown') || rawNeededUnit === rawHaveUnit) {
      const neededInBase = neededNum * nUnitObj.factor;
      const haveInBase = haveNum * hUnitObj.factor;
      const remInBase = neededInBase - haveInBase;
      if (remInBase <= 0) return null; // Complete
      const remNeededUnit = remInBase / nUnitObj.factor;
      const remStr = Number.isInteger(remNeededUnit) ? remNeededUnit : remNeededUnit.toFixed(1);
      return rawNeededUnit ? `${remStr} ${rawNeededUnit}` : `${remStr}`;
  }
  
  // Mismatched known types: e.g. needed 'g' (weight), have 'ud' (count)
  // Assumption: if we need weight/volume, and we have >= 1 'ud' (package/bottle) in pantry, we consider it covered.
  if ((nUnitObj.type === 'weight' || nUnitObj.type === 'volume') && hUnitObj.type === 'count') {
      if (haveNum >= 1) return null; // we have 1 "unit" (package/bottle) of this, so it covers it.
  }
  
  // Fallback if totally incompatible or strange combinations (like needed 400g, have 1 "bote")
  if (nUnitObj.type !== 'unknown' && hUnitObj.type === 'unknown' && haveNum >= 1) {
      return null;
  }
  
  // Worst case: direct naive subtraction as fallback
  const remaining = neededNum - haveNum;
  if (remaining <= 0) return null;
  const remStr = Number.isInteger(remaining) ? remaining : remaining.toFixed(1);
  return rawNeededUnit ? `${remStr} ${rawNeededUnit}` : `${remStr}`;
}

console.log("400g vs 500g:", smartCalcRemaining("400g", 500, "g"));
console.log("400g vs 1ud:", smartCalcRemaining("400g", 1, "ud"));
console.log("2kg vs 500g:", smartCalcRemaining("2kg", 500, "g"));
console.log("2kg vs 2.5kg:", smartCalcRemaining("2kg", 2.5, "kg"));
console.log("Espaguetis 400g vs 0ud:", smartCalcRemaining("400g", 0, "ud"));
