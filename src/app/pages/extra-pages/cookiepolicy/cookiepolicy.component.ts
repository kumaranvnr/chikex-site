import { Component } from '@angular/core';

@Component({
  selector: 'app-cookiepolicy',
  templateUrl: './cookiepolicy.component.html',
  styleUrls: ['./cookiepolicy.component.scss']
})
export class CookiepolicyComponent {
  breadCrumbItems!: Array<{}>;
  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home', link: '/' },
      { label: 'Cookie Policy', active: true, link: '/pages/cookieploicy' }
    ];
  }
}
