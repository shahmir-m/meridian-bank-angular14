import { TestBed } from '@angular/core/testing';
import { DataService, Account, Transaction } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loading signal', () => {
    it('should initialize loading as false', () => {
      expect(service.loading()).toBe(false);
    });
  });

  describe('getAccounts', () => {
    it('should return 3 accounts', (done) => {
      service.getAccounts().subscribe((accounts: Account[]) => {
        expect(accounts.length).toBe(3);
        done();
      });
    });

    it('should include checking, savings, and investment accounts', (done) => {
      service.getAccounts().subscribe((accounts: Account[]) => {
        const types = accounts.map(a => a.type);
        expect(types).toContain('checking');
        expect(types).toContain('savings');
        expect(types).toContain('investment');
        done();
      });
    });

    it('should return accounts with required properties', (done) => {
      service.getAccounts().subscribe((accounts: Account[]) => {
        accounts.forEach(account => {
          expect(account.id).toBeTruthy();
          expect(account.name).toBeTruthy();
          expect(account.type).toBeTruthy();
          expect(account.balance).toBeDefined();
          expect(account.accountNumber).toBeTruthy();
          expect(account.routingNumber).toBeTruthy();
        });
        done();
      });
    });
  });

  describe('getAccount', () => {
    it('should return a specific account by id', (done) => {
      service.getAccount('acct-001').subscribe((account: Account | undefined) => {
        expect(account).toBeTruthy();
        expect(account!.name).toBe('Primary Checking');
        expect(account!.type).toBe('checking');
        done();
      });
    });

    it('should return undefined for non-existent id', (done) => {
      service.getAccount('non-existent').subscribe((account: Account | undefined) => {
        expect(account).toBeUndefined();
        done();
      });
    });
  });

  describe('getTransactions', () => {
    it('should return 20 transactions', (done) => {
      service.getTransactions().subscribe((transactions: Transaction[]) => {
        expect(transactions.length).toBe(20);
        done();
      });
    });

    it('should include both debit and credit transactions', (done) => {
      service.getTransactions().subscribe((transactions: Transaction[]) => {
        const types = transactions.map(t => t.type);
        expect(types).toContain('debit');
        expect(types).toContain('credit');
        done();
      });
    });
  });

  describe('getTransactionsByAccount', () => {
    it('should filter transactions by account id', (done) => {
      service.getTransactionsByAccount('acct-001').subscribe((transactions: Transaction[]) => {
        expect(transactions.length).toBeGreaterThan(0);
        transactions.forEach(txn => {
          expect(txn.accountId).toBe('acct-001');
        });
        done();
      });
    });

    it('should return empty array for non-existent account', (done) => {
      service.getTransactionsByAccount('non-existent').subscribe((transactions: Transaction[]) => {
        expect(transactions.length).toBe(0);
        done();
      });
    });
  });

  describe('getTotalBalance', () => {
    it('should return the sum of all account balances', (done) => {
      service.getTotalBalance().subscribe((total: number) => {
        expect(total).toBe(12450.32 + 48200.00 + 124875.50);
        done();
      });
    });
  });
});
