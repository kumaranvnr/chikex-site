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
import { SignmodalComponent } from './signmodal/signmodal.component';
import { LanguageService } from '../services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarLevel1LightComponent } from './navbar-level1-light/navbar-level1-light.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SignmodalComponent,
    NavbarLevel1LightComponent,
    BreadcrumbsComponent,

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
    FooterComponent,
    NavbarLevel1LightComponent,
    BreadcrumbsComponent
  ],

})
export class SharedModule { }
