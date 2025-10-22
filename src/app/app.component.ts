import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chikex | Fried Chicken and Restaurant LLC, UAE';
  whatsappConfig = {
    phoneNumber: '971507230280',
    message: 'Hello! I would like to know more about Chikex menu and place an order.',
    position: 'bottom-right' as 'bottom-right' | 'bottom-left'
  };
  constructor() {

  }

  ngOnInit() {

  }

  onActivate(event: any) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, 0);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 1);
  }
}
