import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HelpSingleTopicComponent } from './help/help-single-topic/help-single-topic.component';
import { HelpSubmitRequestComponent } from './help/help-submit-request/help-submit-request.component';
import { SimpleComponent } from './not-found/simple/simple.component';
import { IllustrationComponent } from './not-found/illustration/illustration.component';
import { StickyFooterComponent } from './sticky-footer/sticky-footer.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CookiepolicyComponent } from './cookiepolicy/cookiepolicy.component';
import { CareersComponent } from './careers/careers.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { CustomerReviewComponent } from './customer-review/customer-review.component';
import { RefundComponent } from './refund/refund.component';

const routes: Routes = [
  { path: "about", component: AboutComponent },
  { path: "contacts", component: ContactsComponent },
  /* { path: "single-topic", component: HelpSingleTopicComponent }, */
  { path: "submit-request", component: HelpSubmitRequestComponent },
  { path: "review", component: CustomerReviewComponent },
  { path: "404-simple", component: SimpleComponent },
  { path: "404-illustration", component: IllustrationComponent },
  { path: "sticky-footer", component: StickyFooterComponent },
  { path: "privacypolicy", component: PrivacyComponent },
  { path: "cookiepolicy", component: CookiepolicyComponent },
  { path: "refund", component: RefundComponent },
  { path: "careers", component: CareersComponent },
  { path: "terms", component: TermsandconditionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ExtraPagesRoutingModule { }
