export function summarizeTransactions(entries) {
  if (!Array.isArray(entries)) {
    throw new TypeError('entries must be an array');
  }

  let totalCents = 0;
  const categoryTotals = new Map();

  for (const entry of entries) {
    if (
      entry === null ||
      typeof entry !== 'object' ||
      typeof entry.category !== 'string' ||
      entry.category.trim().length === 0 ||
      !Number.isSafeInteger(entry.cents)
    ) {
      throw new TypeError('each entry must have a non-empty category and safe-integer cents');
    }

    totalCents += entry.cents;
    categoryTotals.set(
      entry.category,
      (categoryTotals.get(entry.category) ?? 0) + entry.cents,
    );
  }

  return {
    count: entries.length,
    totalCents,
    byCategory: Object.fromEntries(categoryTotals),
  };
}
