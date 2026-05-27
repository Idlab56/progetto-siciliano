import { Routes } from '@angular/router';

// Definisce le rotte principali dell'applicazione.
// Usa componenti lazy-loaded per caricare le pagine solo quando necessario.
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'dettaglio/:id',
    loadComponent: () => import('./dettaglio/dettaglio.page').then((m) => m.DettaglioPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'profilo',
    loadComponent: () => import('./profilo/profilo.page').then((m) => m.ProfiloPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
