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
  return str.replace(/^[\d.\/]+\s*/, '').trim();
}
function calcRemaining(cantidadStr, haveNum) {
  if (haveNum === null || haveNum === 0) return cantidadStr;
  const needed = parseQtyNumber(cantidadStr);
  if (needed === null) return cantidadStr;
  const unit = parseQtyUnit(cantidadStr);
  const remaining = needed - haveNum;
  if (remaining <= 0) return null;
  const remStr = Number.isInteger(remaining) ? remaining : remaining.toFixed(1);
  return unit ? `${remStr} ${unit}` : `${remStr}`;
}
console.log('400 vs 500:', calcRemaining('400', 500));
console.log('400 vs undefined:', calcRemaining('400', undefined));
console.log('400 vs null:', calcRemaining('400', null));
