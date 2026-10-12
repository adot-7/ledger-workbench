export function add(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError('a and b must be finite numbers');
  }
  return a + b;
}

export function subtract(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError('a and b must be finite numbers');
  }
  return a - b;
}
