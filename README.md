# Meridian Bank — Angular 14 Demo App

A simulated banking dashboard built with Angular 14 and Angular Material. Used as a demo target for Devin's Angular 14 → 18 upgrade capability.

## Quick Start

```bash
npm install --legacy-peer-deps
ng serve
# Navigate to http://localhost:4200
```

## What's Inside

- **Dashboard** — total balance, account cards, recent transactions table
- **Accounts** — list of 3 accounts (checking, savings, investment) with detail view
- **Transactions** — full transaction history with search and filter

All data is hardcoded — no backend required.

## Deliberate Angular 14 Patterns (Migration Targets)

This app was intentionally built with legacy patterns so Devin can demonstrate a full modernization:

| Pattern | Files |
|---|---|
| `NgModule` everywhere | All `*.module.ts` files |
| `*ngIf` / `*ngFor` / `*ngSwitch` | All component templates |
| `RouterModule.forRoot()` / `forChild()` | Routing modules |
| RxJS `BehaviorSubject` / `Observable` | `data.service.ts`, `transactions.component.ts` |
| Webpack builder (not esbuild) | `angular.json` |
| Zone.js change detection | `polyfills.ts` |
| Legacy `@angular/material` MDC imports | All feature modules |

## Tech Stack

- Angular 14.x
- Angular Material 14.x
- RxJS 7.x
- TypeScript 4.7
- Webpack (default Angular 14 builder)
- Karma + Jasmine (tests)
