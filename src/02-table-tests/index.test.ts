import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 5, b: 10, action: Action.Multiply, expected: 50 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 10, b: 5, action: Action.Exponentiate, expected: 100000 },
  { a: 10, b: 5, action: '%', expected: null },
  { a: 'ten', b: 'five', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should run actions as expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({
        a,
        b,
        action,
      });

      expect(result).toBe(expected);
    },
  );
});
