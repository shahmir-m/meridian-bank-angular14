import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService, Account } from '../shared/data.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts$: Observable<Account[]> | null = null;
  selectedAccount: Account | null = null;
  loading = true;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.accounts$ = this.dataService.getAccounts();
    setTimeout(() => this.loading = false, 300);
  }

  selectAccount(account: Account): void {
    this.selectedAccount = account;
  }

  getAccountIcon(type: string): string {
    switch (type) {
      case 'checking': return 'account_balance_wallet';
      case 'savings': return 'savings';
      case 'investment': return 'trending_up';
      default: return 'account_balance';
    }
  }

  getAccountColor(type: string): string {
    switch (type) {
      case 'checking': return '#1976d2';
      case 'savings': return '#388e3c';
      case 'investment': return '#f57c00';
      default: return '#1a237e';
    }
  }
}
