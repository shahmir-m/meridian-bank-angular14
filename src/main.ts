import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';

const routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' as const },
  {
    path: 'dashboard',
    loadComponent: () => import('./app/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'accounts',
    loadComponent: () => import('./app/accounts/accounts.component').then(m => m.AccountsComponent)
  },
  {
    path: 'transactions',
    loadComponent: () => import('./app/transactions/transactions.component').then(m => m.TransactionsComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
  ]
}).catch(err => console.error(err));
