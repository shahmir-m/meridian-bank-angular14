import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading signal as true', () => {
    expect(component.loading()).toBeTrue();
  });

  it('should initialize with empty accounts signal', () => {
    expect(component.accounts()).toEqual([]);
  });

  it('should initialize with empty transactions signal', () => {
    expect(component.transactions()).toEqual([]);
  });

  it('should initialize with zero total balance', () => {
    expect(component.totalBalance()).toBe(0);
  });

  describe('after data loads', () => {
    beforeEach(fakeAsync(() => {
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
    }));

    it('should set loading to false', () => {
      expect(component.loading()).toBeFalse();
    });

    it('should populate accounts signal', () => {
      expect(component.accounts().length).toBe(3);
    });

    it('should populate transactions signal', () => {
      expect(component.transactions().length).toBe(20);
    });

    it('should calculate total balance', () => {
      expect(component.totalBalance()).toBeGreaterThan(0);
    });

    it('should render account cards', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const cards = compiled.querySelectorAll('.account-card');
      expect(cards.length).toBe(3);
    });

    it('should render the total balance', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const balanceEl = compiled.querySelector('.balance-amount');
      expect(balanceEl?.textContent).toBeTruthy();
    });

    it('should render the recent transactions table', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('.transactions-table');
      expect(table).toBeTruthy();
    });
  });

  describe('getAccountIcon', () => {
    it('should return correct icon for checking', () => {
      expect(component.getAccountIcon('checking')).toBe('account_balance_wallet');
    });

    it('should return correct icon for savings', () => {
      expect(component.getAccountIcon('savings')).toBe('savings');
    });

    it('should return correct icon for investment', () => {
      expect(component.getAccountIcon('investment')).toBe('trending_up');
    });

    it('should return default icon for unknown type', () => {
      expect(component.getAccountIcon('unknown')).toBe('account_balance');
    });
  });

  describe('getCategoryIcon', () => {
    it('should return correct icon for food', () => {
      expect(component.getCategoryIcon('food')).toBe('restaurant');
    });

    it('should return correct icon for transport', () => {
      expect(component.getCategoryIcon('transport')).toBe('directions_car');
    });

    it('should return default icon for unknown category', () => {
      expect(component.getCategoryIcon('unknown')).toBe('receipt');
    });
  });
});
