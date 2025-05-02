import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { cart_details, cartdata } from '../cart/data';
import { HttpService } from 'src/app/services/http.service';
import { CookieStore } from 'src/app/services/helpers/CookieStore';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  formData!: UntypedFormGroup;
  submitted = false;
  total_price: any = 0;
  cartproduct: any;
  valid_coupon: any;
  discount: any;
  finalprice: any;
  checkoutInfo: any;
  constructor(public formBuilder: UntypedFormBuilder,
    private resetService: HttpService,
    private cd: ChangeDetectorRef,) {

    this.getCartRequest();
    this.cartproduct = cartdata;
  }

  async getCartRequest(): Promise<any> {
    if (cart_details._id == '') {
      let cart_reponse = await this.resetService.getCartIdRequest();
      if (cart_reponse.data) {
        this.checkoutInfo = cart_reponse.data;
        cart_details._id = cart_reponse.data._id;
        cart_details.sub = cart_reponse.data.sub;
        cart_details.total_price = cart_reponse.data.total_price;
        cartdata.splice(0);
        cart_reponse.data.cart_items.forEach((element: any) => {
          cartdata.push(element);
        });
        this.formData.controls['comments'].setValue(cart_reponse.data.comments);
      }
    }
    else {
      console.log(cart_details._id);
    }
  }

  ngAfterViewInit(): void {
    this.total_price = cart_details.total_price;
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    // Validation
    this.formData = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      delivery_time: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      comments: ['', [Validators.required]],
      need_change_from: ['', [Validators.required]]
    });

    this.cartproduct = cartdata;
    this.cartproduct.forEach((element: any) => {
      this.total_price += element.total_price
    });
  }

  /**
* Returns form
*/
  get form() {
    return this.formData.controls;
  }


  async completeorder(): Promise<void> {
    this.submitted = true;
    let checkoutData = this.formData.value;
    let obj = {
      _id: cart_details._id,
      sub: cart_details.sub,
      useraddress: [{
        sub: cart_details.sub,
        given_name: checkoutData.name,
        street1: checkoutData.address,
        city: checkoutData.city,
        mobile: checkoutData.phone
      }],
      delivery_time: checkoutData.delivery_time,
      need_change_from: checkoutData.need_change_from,
      comments: checkoutData.comments,
      status: 'order'
    }
    await this.resetService.saveCheckoutData(obj);
    let cart_obj = { cart_id: cart_details._id };
    let order_response = await this.resetService.convertCartToOrder(cart_obj);
    CookieStore.saveDataAsync("order_info", order_response.data);

    window.location.href = '/order-confirmation';
  }


  setprice(price: any) {
    return price;
  }

}
