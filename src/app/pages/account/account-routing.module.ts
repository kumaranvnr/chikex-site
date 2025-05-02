import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { AccountOrdersComponent } from "./account-orders/account-orders.component";
import { AccountProfileComponent } from "./account-profile/account-profile.component";
import { AccountAddressComponent } from "./account-address/account-address.component";
import { AccountPaymentComponent } from "./account-payment/account-payment.component";
import { AccountWishlistComponent } from "./account-wishlist/account-wishlist.component";
import { AccountTicketsComponent } from "./account-tickets/account-tickets.component";
import { AccountSingleTicketComponent } from "./account-single-ticket/account-single-ticket.component";
import { AccountSigninComponent } from "./account-signin/account-signin.component";
import { AccountPasswordRecoveryComponent } from "./account-password-recovery/account-password-recovery.component";
import { AuthguardGuard } from 'src/app/guards/authguard.guard';

const routes: Routes = [
  {
    path: 'profile',
    component: AccountProfileComponent,
    canActivate: [AuthguardGuard],
    data: { allowed_roles: ['user'] },
  },
  {
    path: 'address',
    component: AccountAddressComponent,
    canActivate: [AuthguardGuard],
    data: { allowed_roles: ['user'] },
  },
  {
    path: 'orders',
    component: AccountOrdersComponent,
    canActivate: [AuthguardGuard],
    data: { allowed_roles: ['user'] },
  },
  {
    path: 'wishlist',
    component: AccountWishlistComponent,
    canActivate: [AuthguardGuard],
    data: { allowed_roles: ['user'] },
  },
  {
    path: 'tickets',
    component: AccountTicketsComponent,
    canActivate: [AuthguardGuard],
    data: { allowed_roles: ['user'] },
  },
  {
    path: 'single-ticket',
    component: AccountSingleTicketComponent,
    canActivate: [AuthguardGuard],
    data: { allowed_roles: ['user'] },
  },
  { path: 'signin', component: AccountSigninComponent, },
  {
    path: 'password-recovery',
    component: AccountPasswordRecoveryComponent,
    canActivate: [AuthguardGuard],
    data: { allowed_roles: ['user'] },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }
