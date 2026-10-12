export function summarizeTransactions(entries) {
  if (!Array.isArray(entries)) {
    throw new TypeError('entries must be an array');
  }

  const byCategory = {};
  let totalCents = 0;

  for (const entry of entries) {
    if (
      entry === null ||
      typeof entry !== 'object' ||
      typeof entry.category !== 'string' ||
      entry.category.length === 0 ||
      !Number.isSafeInteger(entry.cents)
    ) {
      throw new TypeError('entries must contain a non-empty category and safe-integer cents');
    }

    totalCents += entry.cents;

    if (Object.prototype.hasOwnProperty.call(byCategory, entry.category)) {
      byCategory[entry.category] += entry.cents;
    } else {
      Object.defineProperty(byCategory, entry.category, {
        configurable: true,
        enumerable: true,
        value: entry.cents,
        writable: true,
      });
    }
  }

  return {
    count: entries.length,
    totalCents,
    byCategory,
  };
}
