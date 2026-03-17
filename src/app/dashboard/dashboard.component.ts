import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService, Account, Transaction } from '../shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  accounts$: Observable<Account[]> | null = null;
  transactions$: Observable<Transaction[]> | null = null;
  totalBalance$: Observable<number> | null = null;
  loading = true;

  displayedColumns: string[] = ['date', 'description', 'category', 'amount', 'status'];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.accounts$ = this.dataService.getAccounts();
    this.totalBalance$ = this.dataService.getTotalBalance();
    this.transactions$ = this.dataService.getTransactions();
    setTimeout(() => this.loading = false, 400);
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
