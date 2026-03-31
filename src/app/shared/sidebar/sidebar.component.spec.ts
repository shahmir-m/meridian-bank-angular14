import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 navigation items', () => {
    expect(component.navItems.length).toBe(3);
  });

  it('should include Dashboard nav item', () => {
    const dashboard = component.navItems.find(n => n.label === 'Dashboard');
    expect(dashboard).toBeTruthy();
    expect(dashboard!.icon).toBe('dashboard');
    expect(dashboard!.route).toBe('/dashboard');
  });

  it('should include Accounts nav item', () => {
    const accounts = component.navItems.find(n => n.label === 'Accounts');
    expect(accounts).toBeTruthy();
    expect(accounts!.icon).toBe('account_balance');
    expect(accounts!.route).toBe('/accounts');
  });

  it('should include Transactions nav item', () => {
    const transactions = component.navItems.find(n => n.label === 'Transactions');
    expect(transactions).toBeTruthy();
    expect(transactions!.icon).toBe('receipt_long');
    expect(transactions!.route).toBe('/transactions');
  });

  it('should render nav links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a[mat-list-item]');
    expect(links.length).toBe(5); // 3 nav items + 2 footer items (Settings, Support)
  });

  it('should render the bank name in sidebar header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const bankName = compiled.querySelector('.bank-name');
    expect(bankName?.textContent).toContain('Meridian Bank');
  });

  it('should render Settings and Support in footer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('.sidebar-footer');
    expect(footer?.textContent).toContain('Settings');
    expect(footer?.textContent).toContain('Support');
  });
});
