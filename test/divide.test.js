import test from 'node:test';
import assert from 'node:assert/strict';
import { divide } from '../src/divide.js';

test('divide returns the quotient', () => {
  assert.equal(divide(6, 2), 3);
});

test('divide rejects non-finite inputs', () => {
  assert.throws(() => divide(Infinity, 2), TypeError);
  assert.throws(() => divide(6, NaN), TypeError);
});

test('divide rejects a zero divisor', () => {
  assert.throws(() => divide(6, 0), RangeError);
  assert.throws(() => divide(6, -0), RangeError);
});
