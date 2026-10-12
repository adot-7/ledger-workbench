import test from 'node:test';
import assert from 'node:assert/strict';
import { summarizeTransactions } from '../src/ledger-summary.js';

test('summarizes transaction count, total, and category totals', () => {
  const entries = [
    { category: 'food', cents: 1250 },
    { category: 'transport', cents: -300 },
    { category: 'food', cents: 250 },
  ];

  assert.deepEqual(summarizeTransactions(entries), {
    count: 3,
    totalCents: 1200,
    byCategory: {
      food: 1500,
      transport: -300,
    },
  });
});

test('returns zero totals for an empty array', () => {
  assert.deepEqual(summarizeTransactions([]), {
    count: 0,
    totalCents: 0,
    byCategory: {},
  });
});

test('does not mutate the input entries', () => {
  const entries = [
    { category: 'food', cents: 100 },
    { category: 'books', cents: -50 },
  ];
  const originalEntries = structuredClone(entries);

  summarizeTransactions(entries);

  assert.deepEqual(entries, originalEntries);
});

test('rejects invalid entries with TypeError', () => {
  const invalidEntries = [
    [{ category: '', cents: 100 }],
    [{ category: 'food', cents: 1.5 }],
    [{ category: 'food', cents: Number.MAX_SAFE_INTEGER + 1 }],
    [{ category: 'food', cents: Infinity }],
    [{ category: 'food' }],
    [null],
  ];

  for (const entries of invalidEntries) {
    assert.throws(() => summarizeTransactions(entries), TypeError);
  }
});

test('rejects a non-array input with TypeError', () => {
  assert.throws(() => summarizeTransactions(null), TypeError);
});
