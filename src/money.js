export function formatCents(cents) {
  if (!Number.isSafeInteger(cents)) {
    throw new TypeError('cents must be a safe integer');
  }

  const sign = cents < 0 ? '-' : '';
  const absoluteCents = Math.abs(cents);
  const whole = Math.floor(absoluteCents / 100);
  const fractional = String(absoluteCents % 100).padStart(2, '0');

  return `${sign}${whole}.${fractional}`;
}
