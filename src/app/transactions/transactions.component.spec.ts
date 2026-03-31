import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionsComponent } from './transactions.component';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransactionsComponent,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading as true', () => {
    expect(component.loading()).toBeTrue();
  });

  it('should initialize with empty search term signal', () => {
    expect(component.searchTerm()).toBe('');
  });

  it('should initialize with "all" filter signal', () => {
    expect(component.selectedFilter()).toBe('all');
  });

  it('should initialize with empty transactions signal', () => {
    expect(component.allTransactions()).toEqual([]);
  });

  describe('after data loads', () => {
    beforeEach(waitForAsync(() => {
      fixture.detectChanges();
      // Wait for the DataService delay(300) to complete
      setTimeout(() => {
        fixture.detectChanges();
      }, 500);
    }));

    it('should set loading to false', () => {
      expect(component.loading()).toBeFalse();
    });

    it('should populate all transactions', () => {
      expect(component.allTransactions().length).toBe(20);
    });

    it('should show all transactions in filtered results by default', () => {
      expect(component.filteredTransactions().length).toBe(20);
    });

    it('should render the transactions table', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('.transactions-table');
      expect(table).toBeTruthy();
    });

    it('should show transaction count', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const countEl = compiled.querySelector('.txn-count');
      expect(countEl?.textContent).toContain('20');
    });
  });

  describe('search filtering (computed signal)', () => {
    beforeEach(waitForAsync(() => {
      fixture.detectChanges();
      setTimeout(() => {
        fixture.detectChanges();
      }, 500);
    }));

    it('should filter transactions by description', () => {
      component.onSearch('Starbucks');
      expect(component.filteredTransactions().length).toBe(1);
      expect(component.filteredTransactions()[0].description).toContain('Starbucks');
    });

    it('should filter transactions by category', () => {
      component.onSearch('food');
      const results = component.filteredTransactions();
      expect(results.length).toBeGreaterThan(0);
      results.forEach(txn => {
        expect(txn.category).toBe('food');
      });
    });

    it('should be case-insensitive', () => {
      component.onSearch('starbucks');
      expect(component.filteredTransactions().length).toBe(1);
    });

    it('should return all transactions when search is cleared', () => {
      component.onSearch('Starbucks');
      expect(component.filteredTransactions().length).toBe(1);

      component.onSearch('');
      expect(component.filteredTransactions().length).toBe(20);
    });

    it('should return empty when no match found', () => {
      component.onSearch('zzzzzzz-no-match');
      expect(component.filteredTransactions().length).toBe(0);
    });
  });

  describe('filter by type (computed signal)', () => {
    beforeEach(waitForAsync(() => {
      fixture.detectChanges();
      setTimeout(() => {
        fixture.detectChanges();
      }, 500);
    }));

    it('should filter debit transactions', () => {
      component.onFilterChange('debit');
      const results = component.filteredTransactions();
      expect(results.length).toBeGreaterThan(0);
      results.forEach(txn => {
        expect(txn.type).toBe('debit');
      });
    });

    it('should filter credit transactions', () => {
      component.onFilterChange('credit');
      const results = component.filteredTransactions();
      expect(results.length).toBeGreaterThan(0);
      results.forEach(txn => {
        expect(txn.type).toBe('credit');
      });
    });

    it('should filter pending transactions', () => {
      component.onFilterChange('pending');
      const results = component.filteredTransactions();
      expect(results.length).toBeGreaterThan(0);
      results.forEach(txn => {
        expect(txn.status).toBe('pending');
      });
    });

    it('should show all when filter is "all"', () => {
      component.onFilterChange('debit');
      expect(component.filteredTransactions().length).toBeLessThan(20);

      component.onFilterChange('all');
      expect(component.filteredTransactions().length).toBe(20);
    });
  });

  describe('combined search + filter (computed signal)', () => {
    beforeEach(waitForAsync(() => {
      fixture.detectChanges();
      setTimeout(() => {
        fixture.detectChanges();
      }, 500);
    }));

    it('should apply both search and filter together', () => {
      component.onSearch('food');
      component.onFilterChange('debit');
      const results = component.filteredTransactions();
      expect(results.length).toBeGreaterThan(0);
      results.forEach(txn => {
        expect(txn.category).toBe('food');
        expect(txn.type).toBe('debit');
      });
    });
  });

  describe('getCategoryIcon', () => {
    it('should return correct icon for food', () => {
      expect(component.getCategoryIcon('food')).toBe('restaurant');
    });

    it('should return correct icon for transport', () => {
      expect(component.getCategoryIcon('transport')).toBe('directions_car');
    });

    it('should return correct icon for utilities', () => {
      expect(component.getCategoryIcon('utilities')).toBe('bolt');
    });

    it('should return correct icon for entertainment', () => {
      expect(component.getCategoryIcon('entertainment')).toBe('movie');
    });

    it('should return correct icon for income', () => {
      expect(component.getCategoryIcon('income')).toBe('attach_money');
    });

    it('should return correct icon for transfer', () => {
      expect(component.getCategoryIcon('transfer')).toBe('swap_horiz');
    });

    it('should return correct icon for healthcare', () => {
      expect(component.getCategoryIcon('healthcare')).toBe('local_hospital');
    });

    it('should return default icon for unknown category', () => {
      expect(component.getCategoryIcon('unknown')).toBe('receipt');
    });
  });
});
