import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { cart_details, cartdata } from './data';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { CookieStore } from 'src/app/services/helpers/CookieStore';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {

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
    private router: Router,
    private restService: HttpService) {
    this.getCartDetails();

  }

  ngOnInit(): void {
    // Validation
    this.formData = this.formBuilder.group({
      comments: [''],
      promocode: ['', [Validators.required]],
    });

  }


  ngAfterViewInit() {
    this.total_price = cart_details.total_price;
    this.cd.detectChanges();
  }

  async getCartDetails(): Promise<any> {
    if (cart_details._id == '') {
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
        this.formData.controls['promocode'].setValue(cart_reponse.data.coupon[0].code);
        this.applycode();
      }
    }
  }

  /**
* Returns form
*/
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

  calculatetotal(i: any, ev: any) {
    this.qty = ev.target.value;
    this.cartItems[i].total_price = this.cartItems[i].price * this.qty;

    if (this.cartItems[i].qty > this.qty) {
      this.total_price -= this.cartItems[i].total_price;
    } else {
      this.total_price += this.cartItems[i].total_price;
    }
    this.cartItems[i].qty = this.qty;

    let cart = {} as ICartItems;
    cart._id = cart_details._id;
    cart.sub = cart_details.sub;
    cart.product_id = this.cartItems[i].product_id;
    cart.title = this.cartItems[i].title;
    cart.description = this.cartItems[i].description;
    cart.price = this.cartItems[i].price;
    cart.img_url = this.cartItems[i].img_link;

    cart.qty = this.qty;
    cart.price = this.cartItems[i].price;
    cart.discount = 0;
    cart.total_price = (cart.qty * cart.price) - cart.discount;

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

  async updateCartItems(product: any): Promise<void> {
    let cart_data = cartdata.find(data => data.product_code == product.product_code);
    if (cart_data) {
      cart_data.qty = product.qty;
      cart_data.price = product.price;
      cart_data.discount = product.discount;
      cart_data.total_price = product.total_price;
    }
    await this.resetService.addtoCartItems(product);
  }

  async removecart(product: any) {
    this.cartItems.splice(product, 1);
    const index = this.cartItems.findIndex((cart: any) => cart.product_id == product.product_id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
    let remove_obj: any = {
      sub: product.sub,
      product_id: product.product_id
    };
    await this.restService.removeCartItems(remove_obj);
  }

  setprice(price: any) {
    return price;
  }
  coupon_response: any;
  async applycode(): Promise<void> {
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
          let formdata = this.formData.value;
          let obj = {
            _id: cart_details._id,
            sub: cart_details.sub,
            coupon_applied: true,
            coupon: this.coupon_response.data,
            comments: formdata.comments,
            price: price,
            discount: this.discountprice,
            total_price: this.finalprice
          }
          await this.restService.applyCouponCode(obj);
        } else {
          this.invalid_coupon = true; this.valid_coupon = false;
        }
      }
      else {
        this.invalid_coupon = true; this.valid_coupon = false;
      }
    }


  }

  async removecode(): Promise<void> {
    this.valid_coupon = false;
    this.coupon_response = null;
    let price = this.calculatePrice();
    let formdata = this.formData.value;
    let obj = {
      _id: cart_details._id,
      sub: cart_details.sub,
      coupon_applied: false,
      coupon: [],
      price: price,
      comments: formdata.comments,
      discount: 0,
      total_price: price
    }
    await this.restService.applyCouponCode(obj);
  }

  async checkoutClick(): Promise<void> {
    let price = this.calculatePrice();
    let formdata = this.formData.value;
    let obj;
    if (this.valid_coupon) {
      this.discountprice = ((price * parseFloat(this.coupon_response.data.percentage)) / 100);
      this.finalprice = price - ((price * parseFloat(this.coupon_response.data.percentage)) / 100);
      obj = {
        _id: cart_details._id,
        sub: cart_details.sub,
        coupon_applied: true,
        coupon: this.coupon_response.data,
        price: price,
        comments: formdata.comments,
        discount: this.discountprice,
        total_price: this.finalprice
      }
    } else {
      obj = {
        _id: cart_details._id,
        sub: cart_details.sub,
        coupon_applied: false,
        coupon: [],
        price: price,
        comments: formdata.comments,
        discount: 0,
        total_price: price
      }
    }
    await this.restService.applyCouponCode(obj);
    window.location.href = "/checkout";
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