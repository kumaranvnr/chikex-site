import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

// page routing
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NgbRatingModule, NgbDropdownModule, NgbTooltipModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
// scroll package
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { IndexComponent } from './index/index.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MenuComponent } from './menu/menu.component';
import { TokenComponent } from './token/token.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { UnderMaintenanceComponent } from './under-maintenance/under-maintenance.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { CheckoutCompleteComponent } from './checkout-complete/checkout-complete.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    CategoryComponent,
    IndexComponent,
    CartComponent,
    CheckoutComponent,
    MenuComponent,
    TokenComponent,
    AccessDeniedComponent,
    UnderMaintenanceComponent,
    OrderTrackingComponent,
    CheckoutCompleteComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    SwiperModule,
    NgbNavModule,
    NgbRatingModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    ScrollToModule.forRoot()
  ],
  exports: [
    MenuComponent
  ]
})
export class PagesModule { }
