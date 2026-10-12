import test from 'node:test';
import assert from 'node:assert/strict';
import { filterTransactions } from '../src/ledger-filter.js';

const entries = [
  { id: 1, category: 'food', date: '2024-01-01' },
  { id: 2, category: 'travel', date: '2024-01-02' },
  { id: 3, category: 'food', date: '2024-01-03' },
  { id: 4, category: 'food', date: '2024-01-04' },
];

test('filters by exact category and inclusive date bounds in input order', () => {
  const result = filterTransactions(entries, {
    category: 'food',
    from: '2024-01-01',
    to: '2024-01-03',
  });

  assert.deepEqual(result, [entries[0], entries[2]]);
  assert.notStrictEqual(result, entries);
  assert.deepEqual(entries, [
    { id: 1, category: 'food', date: '2024-01-01' },
    { id: 2, category: 'travel', date: '2024-01-02' },
    { id: 3, category: 'food', date: '2024-01-03' },
    { id: 4, category: 'food', date: '2024-01-04' },
  ]);
});

test('returns all entries when no filters are provided', () => {
  const result = filterTransactions(entries);

  assert.deepEqual(result, entries);
  assert.notStrictEqual(result, entries);
});

test('rejects invalid dates and reversed date bounds', () => {
  assert.throws(
    () => filterTransactions([{ category: 'food', date: 'not-a-date' }]),
    /invalid date/i,
  );
  assert.throws(
    () => filterTransactions(entries, { from: '2024-01-04', to: '2024-01-01' }),
    /from date cannot be after to date/i,
  );
  assert.throws(
    () => filterTransactions(entries, { from: 'not-a-date' }),
    /from date.*invalid date/i,
  );
});
