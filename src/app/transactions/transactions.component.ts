import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService, Transaction } from '../shared/data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  loading = true;
  searchTerm = '';
  selectedFilter = 'all';

  private searchSubject = new BehaviorSubject<string>('');
  private filterSubject = new BehaviorSubject<string>('all');

  filteredTransactions$: Observable<Transaction[]> | null = null;

  displayedColumns: string[] = ['date', 'description', 'category', 'type', 'amount', 'status'];

  filterOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'debit', label: 'Debits Only' },
    { value: 'credit', label: 'Credits Only' },
    { value: 'pending', label: 'Pending' },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const transactions$ = this.dataService.getTransactions();

    this.filteredTransactions$ = combineLatest([
      transactions$,
      this.searchSubject,
      this.filterSubject
    ]).pipe(
      map(([txns, search, filter]) => {
        let result = txns;
        if (search) {
          result = result.filter(t =>
            t.description.toLowerCase().includes(search.toLowerCase()) ||
            t.category.toLowerCase().includes(search.toLowerCase())
          );
        }
        if (filter !== 'all') {
          if (filter === 'debit' || filter === 'credit') {
            result = result.filter(t => t.type === filter);
          } else if (filter === 'pending') {
            result = result.filter(t => t.status === 'pending');
          }
        }
        return result;
      })
    );

    setTimeout(() => this.loading = false, 400);
  }

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onFilterChange(): void {
    this.filterSubject.next(this.selectedFilter);
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
