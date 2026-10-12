export function divide(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError('a and b must be finite numbers');
  }
  if (b === 0) {
    throw new RangeError('b must not be zero');
  }
  return a / b;
}
