export function formatCents(cents) {
  if (!Number.isSafeInteger(cents)) {
    throw new TypeError('cents must be a safe integer');
  }

  const sign = cents < 0 ? '-' : '';
  const absoluteCents = BigInt(Math.abs(cents));
  const whole = absoluteCents / 100n;
  const fraction = (absoluteCents % 100n).toString().padStart(2, '0');

  return `${sign}${whole}.${fraction}`;
}
