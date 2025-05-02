import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbPaginationModule,NgbTooltipModule,NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';

// Component
import { SharedModule } from "../../shared/shared.module";
import { AccountRoutingModule } from "./account-routing.module";
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountAddressComponent } from './account-address/account-address.component';
import { AccountPaymentComponent } from './account-payment/account-payment.component';
import { AccountWishlistComponent } from './account-wishlist/account-wishlist.component';
import { AccountTicketsComponent } from './account-tickets/account-tickets.component';
import { AccountSingleTicketComponent } from './account-single-ticket/account-single-ticket.component';
import { AccountSigninComponent } from './account-signin/account-signin.component';
import { AccountPasswordRecoveryComponent } from './account-password-recovery/account-password-recovery.component';
import { AccountSidebarComponent } from './account-sidebar/account-sidebar.component';

@NgModule({
  declarations: [
    AccountOrdersComponent,
    AccountProfileComponent,
    AccountAddressComponent,
    AccountPaymentComponent,
    AccountWishlistComponent,
    AccountTicketsComponent,
    AccountSingleTicketComponent,
    AccountSigninComponent,
    AccountPasswordRecoveryComponent,
    AccountSidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SharedModule,
    AccountRoutingModule
  ],
  providers:[
    DatePipe
  ]
})
export class AccountModule { }
