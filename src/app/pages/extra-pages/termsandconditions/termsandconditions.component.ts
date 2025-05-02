import { Component } from '@angular/core';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.scss']
})
export class TermsandconditionsComponent {

  breadCrumbItems!: Array<{}>;
  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home', link: '/' },
      { label: 'Terms and Conditions', active: true, link: '/pages/terms' }
    ];
  }
}