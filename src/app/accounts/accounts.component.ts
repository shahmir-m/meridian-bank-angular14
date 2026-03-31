import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { DataService, Account } from '../shared/data.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts = signal<Account[]>([]);
  selectedAccount = signal<Account | null>(null);
  loading = signal(true);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAccounts().subscribe(a => {
      this.accounts.set(a);
      this.loading.set(false);
    });
  }

  selectAccount(account: Account): void {
    this.selectedAccount.set(account);
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
