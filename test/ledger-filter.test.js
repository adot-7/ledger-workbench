import test from 'node:test';
import assert from 'node:assert/strict';
import { filterTransactions } from '../src/ledger-filter.js';

const entries = [
  { id: 'one', category: 'food', date: '2024-01-01' },
  { id: 'two', category: 'travel', date: '2024-01-02' },
  { id: 'three', category: 'food', date: '2024-01-03' },
  { id: 'four', category: 'food', date: '2024-01-04' },
];

test('filters by exact category and inclusive date bounds in input order', () => {
  const result = filterTransactions(entries, {
    category: 'food',
    from: '2024-01-01',
    to: '2024-01-03',
  });

  assert.deepEqual(result.map(({ id }) => id), ['one', 'three']);
});

test('returns a new array without mutating entries', () => {
  const snapshot = structuredClone(entries);
  const result = filterTransactions(entries);

  assert.notStrictEqual(result, entries);
  assert.deepEqual(result, entries);
  assert.deepEqual(entries, snapshot);
});

test('rejects invalid dates', () => {
  assert.throws(
    () => filterTransactions(entries, { from: 'not-a-date' }),
    /Invalid date for from/,
  );
  assert.throws(
    () => filterTransactions([{ category: 'food', date: '2024-02-30' }]),
    /Invalid date for entry at index 0/,
  );
});

test('rejects a from date after the to date', () => {
  assert.throws(
    () => filterTransactions(entries, { from: '2024-02-04', to: '2024-01-01' }),
    /from date must be on or before the to date/,
  );
});
