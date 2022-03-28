import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CategorySidebarComponent } from './components/category-sidebar/category-sidebar.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ItemsByCategoryComponent } from './components/items-by-category/items-by-category.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { RegisterComponentComponent } from './components/register-component/register-component.component';
import { AuthGuard } from './services/auth.guard';
import { LoginGuardGuard } from './services/login-guard.guard';
import { ProductCategoryService } from './services/product-category-service/product-category.service';

const routes: Routes = [
  {
    path:'',
    component: ItemsByCategoryComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'items',
    component: ItemDetailsComponent
  },
  {
    path: 'login',
    component: LoginComponentComponent,
    canActivate: [LoginGuardGuard]
  },
  {
    path: 'register',
    component: RegisterComponentComponent
  },
  {
    path: 'dashboard',
    component: CustomerDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productCategories',
    component: CategorySidebarComponent
  },
  {
    path: 'productDetails/:id',
    component: ItemDetailsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
