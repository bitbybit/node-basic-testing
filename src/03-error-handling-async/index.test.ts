import {
  MyAwesomeError,
  rejectCustomError,
  resolveValue,
  throwCustomError,
  throwError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(true);

    expect(result).toBe(true);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('error')).toThrow('error');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1);

    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
