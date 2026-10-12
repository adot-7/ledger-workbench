export function multiply(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError('a and b must be finite numbers');
  }
  return a * b;
}
