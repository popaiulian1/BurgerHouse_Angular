import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)},
    {path: 'shop', loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent)},
    {path: 'about', loadComponent: () => import('./features/learn-more/learn-more.component').then(m => m.LearnMoreComponent)},
    {path: 'login', loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)},
    {path: 'signup', loadComponent: () => import('./features/signup/signup.component').then(m => m.SignupComponent)},
    {path: 'cart', loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent)},
    {path: '**', redirectTo: 'home'}
];