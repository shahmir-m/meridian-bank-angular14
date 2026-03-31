import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountsComponent } from './accounts.component';
import { Account } from '../shared/data.service';

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccountsComponent,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading as true', () => {
    expect(component.loading()).toBeTrue();
  });

  it('should initialize with empty accounts signal', () => {
    expect(component.accounts()).toEqual([]);
  });

  it('should initialize with no selected account', () => {
    expect(component.selectedAccount()).toBeNull();
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

    it('should populate accounts signal with 3 accounts', () => {
      expect(component.accounts().length).toBe(3);
    });

    it('should render account list cards', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const cards = compiled.querySelectorAll('.account-list-card');
      expect(cards.length).toBe(3);
    });

    it('should show no-selection card when no account is selected', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const noSelection = compiled.querySelector('.no-selection-card');
      expect(noSelection).toBeTruthy();
    });
  });

  describe('selectAccount', () => {
    const mockAccount: Account = {
      id: 'acct-001',
      name: 'Primary Checking',
      type: 'checking',
      balance: 12450.32,
      accountNumber: '****4821',
      routingNumber: '026009593'
    };

    it('should set the selected account signal', () => {
      component.selectAccount(mockAccount);
      expect(component.selectedAccount()).toEqual(mockAccount);
    });

    it('should update selected account when a different account is selected', () => {
      const otherAccount: Account = {
        id: 'acct-002',
        name: 'High-Yield Savings',
        type: 'savings',
        balance: 48200.00,
        accountNumber: '****7734',
        routingNumber: '026009593'
      };

      component.selectAccount(mockAccount);
      expect(component.selectedAccount()!.id).toBe('acct-001');

      component.selectAccount(otherAccount);
      expect(component.selectedAccount()!.id).toBe('acct-002');
    });

    it('should show detail card when account is selected', fakeAsync(() => {
      fixture.detectChanges();
      tick(500);

      component.selectAccount(component.accounts()[0]);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const detailCard = compiled.querySelector('.detail-card');
      expect(detailCard).toBeTruthy();
    }));
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

  describe('getAccountColor', () => {
    it('should return blue for checking', () => {
      expect(component.getAccountColor('checking')).toBe('#1976d2');
    });

    it('should return green for savings', () => {
      expect(component.getAccountColor('savings')).toBe('#388e3c');
    });

    it('should return orange for investment', () => {
      expect(component.getAccountColor('investment')).toBe('#f57c00');
    });

    it('should return default color for unknown type', () => {
      expect(component.getAccountColor('unknown')).toBe('#1a237e');
    });
  });
});
