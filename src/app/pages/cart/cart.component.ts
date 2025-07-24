
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { cart_details, cartdata } from './data';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddresslistmodalComponent } from 'src/app/shared/modals/addresslistmodal/addresslistmodal.component';
import { FromDataResolver } from 'src/app/services/helpers/FormDataResolver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
//import * as google from 'google.maps';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {
  fromDataResolver = FromDataResolver;
  formData!: UntypedFormGroup;
  qty: any = 1;
  cartItems: any[] = [];
  cart_details: any;
  total_price: any;
  submitted = false;
  invalid_coupon = false; valid_coupon = false; finalprice: any; discountprice: any; discount_percentage: any;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private resetService: HttpService,
    private cd: ChangeDetectorRef,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private modalService: NgbModal,
    private restService: HttpService) {

  }

  ngOnInit(): void {
    this.ngxService.start();

    this.formData = this.formBuilder.group({
      comments: [''],
      promocode: ['', [Validators.required]],
    });
    this.getCartDetails();
    this.ngxService.stop();
  }

  ngAfterViewInit() {
    this.total_price = cart_details.total_price;

    this.cd.detectChanges();
  }

  async getCartDetails(): Promise<any> {

    var sub = CookieStore.getUserInfo()?.sub;
    let cart_reponse = await this.restService.getCartDetails(sub);
    if (cart_reponse.data) {
      cart_details._id = cart_reponse.data._id;
      cart_details.sub = cart_reponse.data.sub;
      cart_details.total_price = cart_reponse.data.total_price;
      cartdata.splice(0);
      cart_reponse.data.cart_items.forEach((element: any) => {
        cartdata.push(element);
      });
    }
    this.cartItems = cartdata;
    this.formData.controls['comments'].setValue(cart_reponse.data.comments);
    if (cart_reponse.data.coupon_applied) {
      this.formData.controls['promocode'].setValue(cart_reponse.data.coupon_code);
      this.applycode();
    }

  }

  get form() {
    return this.formData.controls;
  }

  async getCartItms(): Promise<void> {
    let response = await this.restService.getCartItems();
  }

  calculatePrice() {
    let total_price: number = 0;
    cartdata.forEach((element: any) => {
      total_price += parseFloat(element.total_price);
    });
    return total_price;
  }

  calculateAddontotal(product: any) {
    var addons_total_price = 0;
    if (product.group_modifiers_list.length != 0) {
      product.group_modifiers_list.forEach((group_modifier: any) => {
        group_modifier.modifiers_list.forEach((modifier: any) => {
          if (modifier.selected) {
            addons_total_price = addons_total_price + modifier.price;
          }
        });
      });
    }
    product.addon_total = addons_total_price;
    product.total_price = product.qty * (addons_total_price + product.price);
  }

  async decreaseQuantity(product: any): Promise<void> {
    if (product.qty == 1) {
      this.removecart(product);
      return;
    }
    product.qty--;
    this.calculateAddontotal(product);
  }

  async onQuantityChange(product: any): Promise<void> {

    if (product.qty <= 0) {
      product.qty = 1;
    }
    this.calculateAddontotal(product);
  }

  async increaseQuantity(product: any): Promise<void> {
    product.qty++;
    this.calculateAddontotal(product);
  }

  async removecart(product: any) {
    // this.cartItems.splice(product, 1);
    this.ngxService.start();
    const index = this.cartItems.findIndex((cart: any) => cart.product_id == product.product_id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
    if (product.sub == undefined) {
      product.sub = CookieStore.getUserInfo()?.sub
    }
    let remove_obj: any = {
      sub: product.sub,
      product_id: product.product_id
    };
    await this.restService.removeCartItems(remove_obj);
    this.ngxService.stop();
  }

  setprice(price: any) {
    return price;
  }
  coupon_response: any;
  async applycode(): Promise<void> {
    this.ngxService.start();
    this.submitted = true;
    let data = this.formData.value;
    if (data.promocode) {
      this.coupon_response = await this.resetService.checkCouponData(data.promocode);
      if (this.coupon_response.data != null) {
        if ((new Date(this.coupon_response?.data?.expiry_date)) >= new Date()) {
          let price = this.calculatePrice();
          this.invalid_coupon = false;
          this.valid_coupon = true;
          this.discountprice = ((price * parseFloat(this.coupon_response.data.percentage)) / 100);
          this.finalprice = price - ((price * parseFloat(this.coupon_response.data.percentage)) / 100);

        } else {
          this.invalid_coupon = true; this.valid_coupon = false;
        }
      }
      else {
        this.invalid_coupon = true; this.valid_coupon = false;
      }
    }
    this.ngxService.stop();
  }

  async removecode(): Promise<void> {
    this.valid_coupon = false;
    this.coupon_response = null;
    this.calculatePrice();

  }

  async checkoutClick(): Promise<void> {
    this.ngxService.start();
    this.cartItems = cartdata;
    if (this.cartItems.length == 0) {
      this.ngxService.stop(); this.submitted = false;
      Swal.fire({ title: 'Message', text: `Cart is empty!.`, confirmButtonColor: '#364574' });
      return;
    }
    let formdata = this.formData.value;
    let obj: any = {};
    obj.sub = CookieStore.getUserInfo()?.sub;
    obj.comments = formdata.comments;
    obj.coupon_applied = false;
    if (this.valid_coupon) {
      obj.coupon_applied = true;
      obj.coupon_code = formdata.promocode;
    }
    await this.restService.applyCouponCode(obj);
    this.ngxService.stop();
    this.router.navigate(["/checkout"]);
  }
}


export interface ICartItems {
  _id: string;
  id: string;
  sub: string;
  product_id: string;
  product_code: string;
  title: string;
  description: string;
  img_url: string;
  qty: number;
  price: number;
  addon_total: number;
  discount: number;
  total_price: number;
  currency: string;
  currency_locale: string;
  group_modifiers_list: any;
}