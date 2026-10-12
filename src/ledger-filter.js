const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/i;

function parseIsoDate(value, label) {
  if (typeof value !== 'string') {
    throw new TypeError(`${label} is an invalid date; expected an ISO date`);
  }

  const match = ISO_DATE_PATTERN.exec(value);
  if (!match) {
    throw new RangeError(`${label} is an invalid date; expected an ISO date`);
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

  if (month < 1 || month > 12 || day < 1 || day > daysInMonth) {
    throw new RangeError(`${label} is an invalid date; expected an ISO date`);
  }

  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    throw new RangeError(`${label} is an invalid date; expected an ISO date`);
  }

  return timestamp;
}

export function filterTransactions(entries, options = {}) {
  if (!Array.isArray(entries)) {
    throw new TypeError('entries must be an array');
  }

  if (options === null || typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }

  const hasCategory = options.category !== undefined;
  const from = options.from === undefined
    ? undefined
    : parseIsoDate(options.from, 'from date');
  const to = options.to === undefined
    ? undefined
    : parseIsoDate(options.to, 'to date');

  if (from !== undefined && to !== undefined && from > to) {
    throw new RangeError('from date cannot be after to date');
  }

  return entries.filter((entry, index) => {
    if (entry === null || typeof entry !== 'object') {
      throw new TypeError(`entry at index ${index} must be an object`);
    }

    const date = parseIsoDate(entry.date, `date for entry at index ${index}`);

    return (!hasCategory || entry.category === options.category)
      && (from === undefined || date >= from)
      && (to === undefined || date <= to);
  });
}
