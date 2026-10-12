import test from 'node:test';
import assert from 'node:assert/strict';
import { formatCents } from '../src/money.js';

test('formatCents formats cents with two fractional digits', () => {
  assert.equal(formatCents(1234), '12.34');
  assert.equal(formatCents(7), '0.07');
  assert.equal(formatCents(0), '0.00');
});

test('formatCents preserves the sign for negative cents', () => {
  assert.equal(formatCents(-5), '-0.05');
  assert.equal(formatCents(-1234), '-12.34');
});

test('formatCents handles the safe-integer boundaries', () => {
  assert.equal(formatCents(Number.MAX_SAFE_INTEGER), '90071992547409.91');
  assert.equal(formatCents(Number.MIN_SAFE_INTEGER), '-90071992547409.91');
});

test('formatCents rejects values that are not safe integers', () => {
  for (const value of [1.5, Number.MAX_SAFE_INTEGER + 1, Infinity, '1234', null]) {
    assert.throws(() => formatCents(value), TypeError);
  }
});
