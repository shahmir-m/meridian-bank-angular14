import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment';
  balance: number;
  accountNumber: string;
  routingNumber: string;
}

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  category: 'food' | 'transport' | 'utilities' | 'entertainment' | 'income' | 'transfer' | 'healthcare';
  accountId: string;
  status: 'completed' | 'pending' | 'failed';
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private accounts: Account[] = [
    {
      id: 'acct-001',
      name: 'Primary Checking',
      type: 'checking',
      balance: 12450.32,
      accountNumber: '****4821',
      routingNumber: '026009593'
    },
    {
      id: 'acct-002',
      name: 'High-Yield Savings',
      type: 'savings',
      balance: 48200.00,
      accountNumber: '****7734',
      routingNumber: '026009593'
    },
    {
      id: 'acct-003',
      name: 'Investment Portfolio',
      type: 'investment',
      balance: 124875.50,
      accountNumber: '****2291',
      routingNumber: '026009593'
    }
  ];

  private transactions: Transaction[] = [
    { id: 't-001', date: new Date('2026-03-15'), description: 'Whole Foods Market', amount: -127.43, type: 'debit', category: 'food', accountId: 'acct-001', status: 'completed' },
    { id: 't-002', date: new Date('2026-03-15'), description: 'Direct Deposit - Payroll', amount: 4200.00, type: 'credit', category: 'income', accountId: 'acct-001', status: 'completed' },
    { id: 't-003', date: new Date('2026-03-14'), description: 'AT&T Wireless', amount: -89.99, type: 'debit', category: 'utilities', accountId: 'acct-001', status: 'completed' },
    { id: 't-004', date: new Date('2026-03-14'), description: 'Uber', amount: -18.75, type: 'debit', category: 'transport', accountId: 'acct-001', status: 'completed' },
    { id: 't-005', date: new Date('2026-03-13'), description: 'Netflix', amount: -15.99, type: 'debit', category: 'entertainment', accountId: 'acct-001', status: 'completed' },
    { id: 't-006', date: new Date('2026-03-13'), description: 'Transfer to Savings', amount: -500.00, type: 'debit', category: 'transfer', accountId: 'acct-001', status: 'completed' },
    { id: 't-007', date: new Date('2026-03-13'), description: 'Transfer from Checking', amount: 500.00, type: 'credit', category: 'transfer', accountId: 'acct-002', status: 'completed' },
    { id: 't-008', date: new Date('2026-03-12'), description: 'CVS Pharmacy', amount: -34.21, type: 'debit', category: 'healthcare', accountId: 'acct-001', status: 'completed' },
    { id: 't-009', date: new Date('2026-03-12'), description: 'Starbucks', amount: -6.75, type: 'debit', category: 'food', accountId: 'acct-001', status: 'completed' },
    { id: 't-010', date: new Date('2026-03-11'), description: 'Electric Bill - Austin Energy', amount: -142.80, type: 'debit', category: 'utilities', accountId: 'acct-001', status: 'completed' },
    { id: 't-011', date: new Date('2026-03-11'), description: 'Amazon.com', amount: -67.99, type: 'debit', category: 'entertainment', accountId: 'acct-001', status: 'completed' },
    { id: 't-012', date: new Date('2026-03-10'), description: 'HEB Grocery', amount: -211.54, type: 'debit', category: 'food', accountId: 'acct-001', status: 'completed' },
    { id: 't-013', date: new Date('2026-03-10'), description: 'Dividend Payment', amount: 312.50, type: 'credit', category: 'income', accountId: 'acct-003', status: 'completed' },
    { id: 't-014', date: new Date('2026-03-09'), description: 'Lyft', amount: -22.40, type: 'debit', category: 'transport', accountId: 'acct-001', status: 'completed' },
    { id: 't-015', date: new Date('2026-03-09'), description: 'Domain Renewal', amount: -14.99, type: 'debit', category: 'utilities', accountId: 'acct-001', status: 'completed' },
    { id: 't-016', date: new Date('2026-03-08'), description: 'Direct Deposit - Payroll', amount: 4200.00, type: 'credit', category: 'income', accountId: 'acct-001', status: 'completed' },
    { id: 't-017', date: new Date('2026-03-08'), description: 'Planet Fitness', amount: -24.99, type: 'debit', category: 'healthcare', accountId: 'acct-001', status: 'completed' },
    { id: 't-018', date: new Date('2026-03-07'), description: 'Gas Station - Shell', amount: -58.32, type: 'debit', category: 'transport', accountId: 'acct-001', status: 'completed' },
    { id: 't-019', date: new Date('2026-03-06'), description: 'Interest Payment', amount: 18.41, type: 'credit', category: 'income', accountId: 'acct-002', status: 'completed' },
    { id: 't-020', date: new Date('2026-03-05'), description: 'Pending: Online Order', amount: -199.00, type: 'debit', category: 'entertainment', accountId: 'acct-001', status: 'pending' },
  ];

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  getAccounts(): Observable<Account[]> {
    return of(this.accounts).pipe(delay(200));
  }

  getAccount(id: string): Observable<Account | undefined> {
    return of(this.accounts.find(a => a.id === id)).pipe(delay(100));
  }

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions).pipe(delay(300));
  }

  getTransactionsByAccount(accountId: string): Observable<Transaction[]> {
    return of(this.transactions.filter(t => t.accountId === accountId)).pipe(delay(200));
  }

  getTotalBalance(): Observable<number> {
    const total = this.accounts.reduce((sum, a) => sum + a.balance, 0);
    return of(total);
  }
}
