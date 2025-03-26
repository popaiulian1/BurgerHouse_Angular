import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)},
    {path: 'shop', loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent)},
    {path: 'about', loadComponent: () => import('./features/learn-more/learn-more.component').then(m => m.LearnMoreComponent)}
];