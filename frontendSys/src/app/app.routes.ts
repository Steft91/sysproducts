import { Routes } from '@angular/router';
import { ProductListComponent } from './components/products/product-list/product-list';
import { ProductFormComponent } from './components/products/product-form/product-form';
import { CategoryListComponent } from './components/categories/category-list/category-list';
import { CategoryFormComponent } from './components/categories/category-form/category-form';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/new', component: CategoryFormComponent },
  { path: 'categories/edit/:id', component: CategoryFormComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];
