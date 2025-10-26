import { Routes } from '@angular/router';


import { LayoutPageComponent } from '../pages/layout-page/layout-page.component';
import { ProductosListComponent } from './pages/producto-list-page/productos.component';


export const PRODUCTOS_ROUTES: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', redirectTo: 'listar', pathMatch: 'full' },
      { path: 'listar', component: ProductosListComponent },
    ],
  }
];