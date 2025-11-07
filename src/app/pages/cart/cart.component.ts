
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
  sub_total: number = 0;
  delivery_charges: number = 3;
  discount: number = 0;
  total_price: number = 0;
  submitted = false;
  loading: boolean = false;
  copy_code: string = '';
  error: string | null = null;
  coupons: any = {};
  invalid_coupon = false; valid_coupon = false; finalprice: any; discountprice: any; discount_percentage: any;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private resetService: HttpService,
    private cd: ChangeDetectorRef,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private modalService: NgbModal,
    private restService: HttpService) {
    this.getCartDetails();

  }

  ngOnInit(): void {
    this.ngxService.start();

    this.formData = this.formBuilder.group({
      comments: [''],
      promocode: ['', [Validators.required]],
    });

    this.fetchCoupons();

    this.ngxService.stop();

    // setTimeout(() => {
    //   this.adjustImageSize();
    // }, 100);

  }

  adjustImageSize() {
    const images = document.querySelectorAll('.text-accent img');
    images.forEach((img: Element) => {
      if (img instanceof HTMLImageElement) {
        const fontSize = window.getComputedStyle(img.parentElement!).fontSize; // Get the font size of the parent
        const sizeInPixels = parseFloat(fontSize) * 1.5; // Calculate the desired size (1.5 times the font size)
        img.style.width = `${sizeInPixels}px`; // Set the width
        img.style.height = 'auto'; // Maintain aspect ratio
      }
    });
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
      this.total_price = cart_reponse.data.total_price;
      cartdata.splice(0);
      cart_reponse.data.cart_items.forEach((element: any) => {
        cartdata.push(element);
      });
    }
    this.cartItems = cartdata;
    this.formData.controls['comments'].setValue(cart_reponse.data.comments);
    if (cart_reponse.data.coupon_applied) {
      this.formData.controls['promocode'].setValue(cart_reponse.data.coupon_code);

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
    this.total_price = total_price;
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
    this.updateTempCart(product);
  }

  async onQuantityChange(product: any): Promise<void> {

    if (product.qty <= 0) {
      product.qty = 1;
    }
    this.calculateAddontotal(product);
    this.updateTempCart(product);
  }

  async increaseQuantity(product: any): Promise<void> {
    product.qty++;
    this.calculateAddontotal(product);
    this.updateTempCart(product);
  }

  async updateTempCart(product: any) {
    this.ngxService.start();
    var sub = CookieStore.getUserInfo()?.sub;

    product.sub = sub;
    let cart_data = cartdata.find(data => data.product_id == product.product_id);
    if (cart_data) {
      cart_data.price = product.price;
      cart_data.qty = product.qty;
      cart_data.addon_total = product.addon_total;
      cart_data.total_price = product.total_price;
      cart_data.group_modifiers_list = product.group_modifiers_list;
    } else {
      cartdata.push(product);
    }

    const cart_info: any = {};
    cart_info.sub = sub;
    cart_info.cart_items = [];
    cart_info.cart_items.push(product);

    await this.restService.addCartItems(cart_info);
    this.ngxService.stop();
  }

  async removecart(product: any) {

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
    if (this.cartItems.length == 0) {
      this.router.navigate(["/menu"]);
    }
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

        this.invalid_coupon = false;
        this.valid_coupon = true;
        this.sub_total = 0; this.discount = 0; this.total_price = 0;
        let total_amount: number = 0;

        for (const items of this.cartItems) {
          if (this.coupon_response?.data?.product_ids.includes(items.product_id)) {
            total_amount = total_amount + items.total_price;
          }
          this.sub_total = this.sub_total + items.total_price;
        }
        if (total_amount == 0) { this.discount = 0; }
        if (total_amount < this.coupon_response?.data?.min_order_value) { this.discount = 0; this.invalid_coupon = true; this.valid_coupon = false; }

        if (this.coupon_response?.data?.discount_type == "Flat") {
          this.discount = this.coupon_response?.data?.percentage;
        }

        if (this.coupon_response?.data?.discount_type == "Percentage") {
          this.discount = (total_amount * this.coupon_response?.data?.percentage) / 100;
          if (this.coupon_response?.data?.max_cap && this.discount >= this.coupon_response?.data?.max_cap) {
            this.discount = this.coupon_response?.data?.max_cap;
          }
        }

        this.total_price = (this.sub_total + this.delivery_charges) - this.discount;

      }
      else {
        this.invalid_coupon = true; this.valid_coupon = false;
      }
    }
    this.ngxService.stop();
  }

  async fetchCoupons(): Promise<void> {
    this.ngxService.start();
    try {
      this.loading = true;
      const query: any = {};
      query.sub = CookieStore.getUserInfo()?.sub;

      const coupon_response = await this.resetService.getCoupons(query);
      if (coupon_response) {
        this.coupons = coupon_response.data;
        this.coupons.forEach((coupon: any) => {
          coupon.copied = false;
        });
        if (this.coupons.length > 0) {
          const coupon = this.coupons.find((c: any) => c.is_default == true);
          this.formData.controls['promocode'].setValue(coupon.code);
          this.applycode();
        }
      }

      this.loading = false;
    } catch (error) {
      this.error = 'Failed to load coupons. Please try again later.';
      console.error('Error fetching coupons:', error);
    } finally {
      this.ngxService.stop();
    }
  }

  async removecode(): Promise<void> {
    this.valid_coupon = false;
    this.coupon_response = null;
    this.sub_total = 0; this.discount = 0; this.total_price = 0;
    this.calculatePrice();
    this.formData.controls['promocode'].setValue('');
  }

  async viewCoupons(content: any): Promise<void> {
    // this.fetchCoupons();
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  copyToClipboard(coupon: any): void {
    this.coupons.forEach((coupon: any) => {
      coupon.copied = false;
    });
    coupon.copied = true;

    this.formData.controls['promocode'].setValue(coupon.code);
    this.modalService.dismissAll();

    this.applycode();

    // navigator.clipboard.writeText(coupon.code).then(() => {
    //   this.coupons.forEach((coupon: any) => {
    //     coupon.copied = false;
    //   });
    //   coupon.copied = true;
    // }).catch(err => {
    //   console.error('Failed to copy: ', err);
    // });
  }

  shareCoupon(couponCode: string): void {
    // Implement share functionality (e.g., using a sharing library or API)
    alert(`Share this coupon code: ${couponCode}`);
  }

  async checkoutClick(): Promise<void> {

    this.cartItems = cartdata;
    if (this.cartItems.length == 0) {
      this.ngxService.stop(); this.submitted = false;
      Swal.fire({ title: 'Message', text: `Cart is empty!.`, confirmButtonColor: '#364574', timer: 1500 });
      return;
    }
    this.ngxService.start();
    let formdata = this.formData.value;
    let obj: any = {};
    obj.user_sub = CookieStore.getUserInfo()?.sub;
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