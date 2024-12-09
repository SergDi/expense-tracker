import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'transactions',
        loadComponent: () => import('../app/accounting/features/transactions/transactions.component').then(m => m.TransactionsComponent),
    },
    {
        path: 'categories',
        loadComponent: () => import('../app/accounting/features/categories/categories.component').then(m => m.CategoriesComponent),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'transactions',
    }
];
