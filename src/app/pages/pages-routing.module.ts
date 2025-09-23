import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MenuComponent } from './menu/menu.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { TokenComponent } from './token/token.component';
import { CheckoutCompleteComponent } from './checkout-complete/checkout-complete.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { AuthguardGuard } from '../guards/authguard.guard';
import { UnderMaintenanceComponent } from './under-maintenance/under-maintenance.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [

  {
    path: 'portal/handle/token',
    component: TokenComponent,
  },
  {
    path: 'portal/access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: 'category', component: CategoryComponent
  },
  {
    path: 'menu/:category', component: MenuComponent
  },
  {
    path: 'products', component: ProductDetailsComponent
  },
  {
    path: 'menu', component: MenuComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'order-confirmation',
    component: CheckoutCompleteComponent,
    canActivate: [AuthguardGuard],
    data: { allowed_roles: ['user'] },
  },
  {
    path: 'order-tracking',
    component: OrderTrackingComponent,
    canActivate: [AuthguardGuard],
    data: { allowed_roles: ['user'] },
  },

  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./extra-pages/extra-pages.module').then(m => m.ExtraPagesModule)
  },

  {
    path: '', component: IndexComponent
  },
  {
    path: '**', component: IndexComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
