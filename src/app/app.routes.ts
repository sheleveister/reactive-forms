import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCreateEditComponent } from './products/product-create-edit/product-create-edit.component';
import { ProductDeleteComponent } from './products/product-delete/product-delete.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/edit/:id', component: ProductCreateEditComponent },
  { path: 'products/create', component: ProductCreateEditComponent },
  { path: 'products/delete/:id', component: ProductDeleteComponent },
];
