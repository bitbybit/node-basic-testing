import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();

    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 2000);

    expect(setTimeout).toHaveBeenCalledWith(callback, 2000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 2000);

    expect(callback).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(2000);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 1000);

    expect(setInterval).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);

    expect(callback).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000 * 3);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    (join as jest.Mock).mockReturnValue('/full/path/to/test');
    (existsSync as jest.Mock).mockReturnValue(false);

    await readFileAsynchronously('test');

    expect(join).toHaveBeenCalledWith(__dirname, 'test');
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously('nonexistent');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'Test';

    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(fileContent));

    const result = await readFileAsynchronously('test');

    expect(result).toBe(fileContent);
  });
});
