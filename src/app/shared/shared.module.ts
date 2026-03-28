import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbNavModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// scroll package
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

// component
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignmodalComponent } from './modals/signmodal/signmodal.component';
import { LanguageService } from '../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AddressmodalComponent } from './modals/addressmodal/addressmodal.component';
import { AddresslistmodalComponent } from './modals/addresslistmodal/addresslistmodal.component';
import { NewaddressmodalComponent } from './modals/newaddressmodal/newaddressmodal.component';

import { SplashScreenPopupComponent } from './splash-screen-popup/splash-screen-popup.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SignmodalComponent,
    BreadcrumbsComponent,
    AddressmodalComponent,
    AddresslistmodalComponent,
    NewaddressmodalComponent,
    SplashScreenPopupComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    NgbNavModule,
    NgbDropdownModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot()
  ],
  providers: [LanguageService],
  exports: [
    HeaderComponent,
    SplashScreenPopupComponent,
    FooterComponent,
    BreadcrumbsComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
