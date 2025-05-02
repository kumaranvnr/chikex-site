import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { cart_details } from '../cart/data';
import { CookieStore } from 'src/app/services/helpers/CookieStore';

@Component({
  selector: 'app-checkout-complete',
  templateUrl: './checkout-complete.component.html',
  styleUrls: ['./checkout-complete.component.scss']
})

/**
 * Checkout Complete Component
 */
export class CheckoutCompleteComponent implements OnInit {

  constructor(public formBuilder: UntypedFormBuilder,
    private resetService: HttpService) {
    this.getOrderRequest();
  }

  ngOnInit(): void {
  }

  order_no: string = '';
  async getOrderRequest(): Promise<void> {
    let order_data = await this.resetService.getOrderDetailsById();
    if (order_data) {
      this.order_no = order_data.order_no;
    }
  }
}
