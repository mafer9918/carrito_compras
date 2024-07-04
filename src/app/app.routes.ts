import { Routes } from '@angular/router';
import { PrincipalPage } from './principal/principal.page';

export const routes: Routes = [
  {
    path: 'principal',
    loadComponent: () => import('./principal/principal.page').then( m => m.PrincipalPage),
  },
  {
    path: 'lista-productos',
    loadComponent: () => import('./lista-productos/lista-productos.page').then( m => m.ListaProductosPage)
  },
  {
    path: 'detalle-producto',
    loadComponent: () => import('./detalle-producto/detalle-producto.page').then( m => m.DetalleProductoPage)
  },
];
