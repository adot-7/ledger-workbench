import test from 'node:test';
import assert from 'node:assert/strict';
import { add, subtract } from '../src/math.js';

test('add returns the sum', () => {
  assert.equal(add(2, 3), 5);
});

test('add rejects non-finite inputs', () => {
  assert.throws(() => add(Infinity, 1), TypeError);
});

test('subtract returns the difference for positive values', () => {
  assert.equal(subtract(8, 3), 5);
});

test('subtract handles negative values', () => {
  assert.equal(subtract(-2, 3), -5);
});

test('subtract handles zero values', () => {
  assert.equal(subtract(0, 0), 0);
});

test('subtract rejects non-finite inputs', () => {
  assert.throws(() => subtract(NaN, 1), TypeError);
  assert.throws(() => subtract(1, Infinity), TypeError);
});
