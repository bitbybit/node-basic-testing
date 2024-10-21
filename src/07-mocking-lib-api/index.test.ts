import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn) => fn),
}));

let axiosInstance: any;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'mocked' }),
    };

    (axios.create as jest.Mock).mockReturnValue(axiosInstance);
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/test');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/path/to/test');

    expect(axiosInstance.get).toHaveBeenCalledWith('/path/to/test');
  });

  test('should return response data', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: 'mocked' });

    const result = await throttledGetDataFromApi('/path/to/test');

    expect(result).toBe('mocked');
  });
});
