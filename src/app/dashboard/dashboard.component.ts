import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { DataService, Account, Transaction } from '../shared/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  accounts = signal<Account[]>([]);
  transactions = signal<Transaction[]>([]);
  totalBalance = signal<number>(0);
  loading = signal(true);

  displayedColumns: string[] = ['date', 'description', 'category', 'amount', 'status'];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAccounts().subscribe(a => this.accounts.set(a));
    this.dataService.getTotalBalance().subscribe(b => this.totalBalance.set(b));
    this.dataService.getTransactions().subscribe(t => {
      this.transactions.set(t);
      this.loading.set(false);
    });
  }

  getAccountIcon(type: string): string {
    switch (type) {
      case 'checking': return 'account_balance_wallet';
      case 'savings': return 'savings';
      case 'investment': return 'trending_up';
      default: return 'account_balance';
    }
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'food': return 'restaurant';
      case 'transport': return 'directions_car';
      case 'utilities': return 'bolt';
      case 'entertainment': return 'movie';
      case 'income': return 'attach_money';
      case 'transfer': return 'swap_horiz';
      case 'healthcare': return 'local_hospital';
      default: return 'receipt';
    }
  }
}
