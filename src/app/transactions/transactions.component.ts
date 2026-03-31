import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { DataService, Transaction } from '../shared/data.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  loading = signal(true);
  searchTerm = signal('');
  selectedFilter = signal('all');

  allTransactions = signal<Transaction[]>([]);

  filteredTransactions = computed(() => {
    let result = this.allTransactions();
    const search = this.searchTerm();
    const filter = this.selectedFilter();

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
  });

  displayedColumns: string[] = ['date', 'description', 'category', 'type', 'amount', 'status'];

  filterOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'debit', label: 'Debits Only' },
    { value: 'credit', label: 'Credits Only' },
    { value: 'pending', label: 'Pending' },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getTransactions().subscribe(txns => {
      this.allTransactions.set(txns);
      this.loading.set(false);
    });
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  onFilterChange(value: string): void {
    this.selectedFilter.set(value);
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
