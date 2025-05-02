import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

// Scroll To
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

// Ng2 Search
import { Ng2SearchPipeModule } from 'ng2-search-filter';


// Component

import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HelpSingleTopicComponent } from './help/help-single-topic/help-single-topic.component';
import { HelpSubmitRequestComponent } from './help/help-submit-request/help-submit-request.component';
import { SimpleComponent } from './not-found/simple/simple.component';
import { IllustrationComponent } from './not-found/illustration/illustration.component';
import { StickyFooterComponent } from './sticky-footer/sticky-footer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExtraPagesRoutingModule } from './extra-pages-routing.module';
import { SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';
import { PrivacyComponent } from './privacy/privacy.component';
import { CookiepolicyComponent } from './cookiepolicy/cookiepolicy.component';
import { CareersComponent } from './careers/careers.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { CustomerReviewComponent } from './customer-review/customer-review.component';
import { RefundComponent } from './refund/refund.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AboutComponent,
    ContactsComponent,
    HelpSingleTopicComponent,
    HelpSubmitRequestComponent,
    SimpleComponent,
    IllustrationComponent,
    StickyFooterComponent,
    PrivacyComponent,
    CookiepolicyComponent,
    CareersComponent,
    TermsandconditionsComponent,
    CustomerReviewComponent,
    RefundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    ScrollToModule.forRoot(),
    SharedModule,
    SwiperModule,
    ExtraPagesRoutingModule
  ]
})
export class ExtraPagesModule { }
