import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'gif/:id',
    loadComponent: () => import('./features/gif-details/gif-details.component').then(m => m.GifDetailsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
