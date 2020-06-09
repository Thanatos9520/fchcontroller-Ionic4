import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { ProductsListComponent } from "../app/Components/products/products-list/products-list.component";
import { ProductsFormComponent } from "../app/Components/products/products-form/products-form.component";

import { CategoryListComponent } from "../app/Components/category/category-list/category-list.component";
import { CategoryFormComponent } from "../app/Components/category/category-form/category-form.component";

import { WarehouseListComponent } from "../app/Components/warehouse/warehouse-list/warehouse-list.component";
import { WarehouseFormComponent } from "../app/Components/warehouse/warehouse-form/warehouse-form.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
   { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },  
   { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
   { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
   { path: 'Home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
   //{ path: 'Home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
   { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListPageModule) },
   { path: 'create', loadChildren: () => import('./create/create/create.module').then( m => m.CreatePageModule)},
   { path: 'update/:idarticulo', loadChildren: () => import('./update/update/update.module').then( m => m.UpdatePageModule)},
   { path: 'products', component: ProductsListComponent },
   { path: 'products/add', component: ProductsFormComponent },
   { path: 'products/edit/:idarticulo', component: ProductsFormComponent },
   { path: 'category', component: CategoryListComponent },
   { path: 'category/add', component: CategoryFormComponent },
   { path: 'category/edit/:idcategoria', component: CategoryFormComponent },
   { path: 'warehouse', component: WarehouseListComponent },
   { path: 'warehouse/add', component: WarehouseFormComponent },
   { path: 'warehouse/edit/:idwarehouse', component: WarehouseFormComponent },
   { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)},
   { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)},
   { path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
