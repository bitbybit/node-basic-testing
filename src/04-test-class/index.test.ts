import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(1000);

    expect(bankAccount.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(1000);

    expect(() => bankAccount.withdraw(1001)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccountFrom = getBankAccount(1000);
    const bankAccountTo = getBankAccount(0);

    expect(() => bankAccountFrom.transfer(1001, bankAccountTo)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(1000);

    expect(() => bankAccount.transfer(1001, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(0);

    bankAccount.deposit(1000);

    expect(bankAccount.getBalance()).toBe(1000);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(1000);

    bankAccount.withdraw(1000);

    expect(bankAccount.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const bankAccountFrom = getBankAccount(1000);
    const bankAccountTo = getBankAccount(0);

    bankAccountFrom.transfer(1000, bankAccountTo);

    expect({
      fromBalance: bankAccountFrom.getBalance(),
      toBalance: bankAccountTo.getBalance(),
    }).toEqual({
      fromBalance: 0,
      toBalance: 1000,
    });
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(1000);

    jest.spyOn(bankAccount, 'fetchBalance').mockImplementation(async () => {
      const balance = 100;
      const requestFailed = false;

      return requestFailed ? null : balance;
    });

    const balance = await bankAccount.fetchBalance();

    expect(balance).toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(1000);

    const balanceOld = bankAccount.getBalance();

    jest.spyOn(bankAccount, 'fetchBalance').mock;

    await bankAccount.synchronizeBalance();

    const balanceNew = bankAccount.getBalance();

    expect(balanceOld).not.toBe(balanceNew);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(1000);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);

    expect.assertions(1);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
