import test from 'node:test';
import assert from 'node:assert/strict';
import { multiply } from '../src/multiply.js';

test('multiply returns the product', () => {
  assert.equal(multiply(6, 7), 42);
});

test('multiply preserves JavaScript decimal arithmetic', () => {
  assert.equal(multiply(0.1, 0.2), 0.020000000000000004);
});

test('multiply rejects non-finite inputs', () => {
  assert.throws(() => multiply(Infinity, 1), TypeError);
  assert.throws(() => multiply(1, NaN), TypeError);
});

test('multiply rejects non-number inputs', () => {
  assert.throws(() => multiply('2', 3), TypeError);
});
