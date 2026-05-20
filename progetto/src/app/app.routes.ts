import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'dettaglio',
    loadComponent: () => import('./src/app/dettaglio/dettaglio.page').then( m => m.DettaglioPage)
  },
  {
    path: 'profilo',
    loadComponent: () => import('./src/app/profilo/profilo.page').then( m => m.ProfiloPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./src/app/login/login.page').then( m => m.LoginPage)
  },
];
