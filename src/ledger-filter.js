function parseIsoDate(value, label) {
  if (typeof value !== 'string' || value.length === 0) {
    throw new RangeError(`Invalid date for ${label}: expected an ISO date string.`);
  }

  const datePart = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/.exec(value);
  const timestamp = Date.parse(value);

  if (
    !datePart ||
    Number.isNaN(timestamp) ||
    Number(datePart[2]) < 1 ||
    Number(datePart[2]) > 12 ||
    Number(datePart[3]) < 1 ||
    Number(datePart[3]) > new Date(Date.UTC(Number(datePart[1]), Number(datePart[2]), 0)).getUTCDate()
  ) {
    throw new RangeError(`Invalid date for ${label}: expected an ISO date string.`);
  }

  return timestamp;
}

export function filterTransactions(entries, options = {}) {
  if (!Array.isArray(entries)) {
    throw new TypeError('entries must be an array.');
  }
  if (options === null || typeof options !== 'object') {
    throw new TypeError('options must be an object.');
  }

  const fromTime = options.from === undefined ? undefined : parseIsoDate(options.from, 'from');
  const toTime = options.to === undefined ? undefined : parseIsoDate(options.to, 'to');

  if (fromTime !== undefined && toTime !== undefined && fromTime > toTime) {
    throw new RangeError('The from date must be on or before the to date.');
  }

  const datedEntries = entries.map((entry, index) => ({
    entry,
    time: parseIsoDate(entry?.date, `entry at index ${index}`),
  }));

  return datedEntries
    .filter(({ entry, time }) => {
      if (options.category !== undefined && entry.category !== options.category) {
        return false;
      }
      if (fromTime !== undefined && time < fromTime) {
        return false;
      }
      if (toTime !== undefined && time > toTime) {
        return false;
      }
      return true;
    })
    .map(({ entry }) => entry);
}
