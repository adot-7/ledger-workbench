import test from 'node:test';
import assert from 'node:assert/strict';
import { formatCents } from '../src/money.js';

test('formatCents formats cents with two fractional digits', () => {
  assert.equal(formatCents(1234), '12.34');
  assert.equal(formatCents(5), '0.05');
  assert.equal(formatCents(0), '0.00');
});

test('formatCents preserves negative amounts', () => {
  assert.equal(formatCents(-5), '-0.05');
  assert.equal(formatCents(-1234), '-12.34');
});

test('formatCents rejects non-safe integers', () => {
  for (const value of [1.5, Number.MAX_SAFE_INTEGER + 1, Infinity, NaN, '1234', 1234n]) {
    assert.throws(() => formatCents(value), TypeError);
  }
});
