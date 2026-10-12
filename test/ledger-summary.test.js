import test from 'node:test';
import assert from 'node:assert/strict';
import { summarizeTransactions } from '../src/ledger-summary.js';

test('summarizes transaction totals by category', () => {
  const entries = [
    { category: 'food', cents: 1250 },
    { category: 'travel', cents: 500 },
    { category: 'food', cents: -250 },
  ];

  assert.deepEqual(summarizeTransactions(entries), {
    count: 3,
    totalCents: 1500,
    byCategory: {
      food: 1000,
      travel: 500,
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

test('does not mutate entries', () => {
  const entries = [{ category: 'food', cents: -250 }];
  const original = structuredClone(entries);

  summarizeTransactions(entries);

  assert.deepEqual(entries, original);
});

test('rejects invalid entries with TypeError', () => {
  const invalidEntries = [
    null,
    { category: '', cents: 1 },
    { category: 'food', cents: 1.5 },
    { category: 'food', cents: Number.MAX_SAFE_INTEGER + 1 },
  ];

  for (const entry of invalidEntries) {
    assert.throws(() => summarizeTransactions([entry]), TypeError);
  }
});
