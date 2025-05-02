import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieStore } from './helpers/CookieStore';
import { cart_details, cartdata } from '../pages/cart/data';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { appInfo } from 'src/environments/environment.prod';
var md5 = require('md5');

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  get base_url(): string {
    if (location.href.includes("localhost")) {
      return "http://localhost:5002";
    } else {
      return "https://orders-api.chikex.me";
    }
  }

  constructor(public httpClient: HttpClient,
    private router: Router) {
  }

  getKey(path: string) {
    const md = new md5();
    return md.appendStr(path).end().toString();
  }

  prepareHeader() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  prepareAuthHeader() {
    let headers = this.prepareHeader();
    const token = CookieStore.getBearerToken();
    if (token) {
      headers = headers.append('Authorization', token);
    }
    return headers;
  }
  prepareAPIHeader() {
    let headers = this.prepareHeader();
    const token = CookieStore.getBasicToken();
    if (token) {
      headers = headers.append('Authorization', token);
    }
    return headers;
  }

  getLoginUrl(): string {
    return `/account/signin`;
  }

  UserSignOut() {
    CookieStore.clearBearerToken();
    CookieStore.clearAllStorage();
    cartdata.splice(0);
    cart_details._id = '';
    this.router.navigate(['/account/signin']);
  }





  async userRegister(data: any): Promise<any> {
    const reponse = this.httpClient.post(this.base_url + "/users-srv/register/user", data, {
      headers: this.prepareHeader()
    }).toPromise();
    return reponse;
  }

  async userLogin(data: any): Promise<any> {
    data.main_role = 'user';
    const reponse = this.httpClient.post(this.base_url + "/users-srv/login", data, {
      headers: this.prepareHeader()
    }).toPromise();
    return reponse;
  }

  async getUserInfo(): Promise<any> {
    return await this.httpClient.get(this.base_url + "/users-srv/userinfo", {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }

  async UserProfileUpdate(data: any): Promise<any> {
    const reponse = await this.httpClient.post(this.base_url + "/users-srv/profile/update", data, {
      headers: this.prepareAuthHeader()
    }).toPromise();
    return reponse;
  }

  async saveUserAddress(data: any): Promise<any> {
    const reponse = await this.httpClient.post(this.base_url + "/users-srv/users/useraddress", data, {
      headers: this.prepareAuthHeader()
    }).toPromise();
    return reponse;
  }

  async removeUserAddress(address_id: any): Promise<any> {
    let response = await this.httpClient.delete(this.base_url + "/users-srv/users/useraddress/" + address_id, {
      headers: this.prepareAuthHeader()
    }).toPromise();
    return response;
  }

  async getAllUserAddress(): Promise<any> {
    return await this.httpClient.get(this.base_url + "/users-srv/users/useraddress/list", {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }

  async getCartItems(): Promise<any> {
    return await this.httpClient.get(this.base_url + "/checkout-srv", {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }

  async applyCouponCode(data: any): Promise<any> {
    return await this.httpClient.post(this.base_url + "/checkout-srv", data, {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }

  async saveCheckoutData(data: any): Promise<any> {
    return await this.httpClient.post(this.base_url + "/checkout-srv", data, {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }

  async addtoCartItems(data: any): Promise<any> {
    return await this.httpClient.post(this.base_url + "/checkout-srv/cart", data, {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }



  async checkCouponData(coupon: string): Promise<any> {
    return await this.httpClient.get(this.base_url + "/coupons-srv/search/" + coupon, {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }


  async getCartIdRequest(): Promise<any> {
    return await this.httpClient.get(this.base_url + "/checkout-srv/cart/request", {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }

  async getCheckOutById(cart_id: string): Promise<any> {
    return await this.httpClient.get(this.base_url + "/checkout-srv/" + cart_id, {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }

  async convertCartToOrder(data: any): Promise<any> {
    return await this.httpClient.post(this.base_url + "/orders-srv/order", data, {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }

  async getCheckOutIdRequest(cart_id: string): Promise<any> {
    return await this.httpClient.get(this.base_url + "/orders-srv/" + cart_id, {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }

  async getOrderDetailsById(): Promise<any> {
    const saved_items = await CookieStore.getDataAsync("order_info");
    if (saved_items) {
      return Promise.resolve(saved_items);
    }
    const cart_id = this.getCartId();
    const new_items = await this.httpClient.get(this.base_url + "/orders-srv/" + cart_id, {
      headers: this.prepareAuthHeader()
    }).toPromise();
    await CookieStore.saveDataAsync("order_info", new_items)
    return Promise.resolve(new_items);
  }

  async getCartId(): Promise<any> {
    return await CookieStore.getDataAsync("cart_id");
  }

  async getAllOrders(account_id: string): Promise<any> {
    return await this.httpClient.get(this.base_url + "/orders-srv/account/" + account_id, {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }

  async saveUserTicket(ticket_info: any): Promise<any> {
    return await this.httpClient.post(this.base_url + "/tickets-srv", ticket_info, {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }

  async getUserSubmittedTickets(account_id: string): Promise<any> {
    return await this.httpClient.get(this.base_url + "/tickets-srv/byuser/" + account_id, {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }

  async saveGuestRequest(request_info: any): Promise<any> {
    return await this.httpClient.post(this.base_url + "/request-srv", request_info, {
      headers: this.prepareAPIHeader()
    }).toPromise();
  }

  uploadRequestAttachmentFile(formData: any): Promise<any> {

    const token = CookieStore.getBasicToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', token);
      return this.httpClient
        .post(
          `${this.base_url}/request-srv/upload`,
          formData,
          { headers }
        )
        .toPromise();
    } else {
      return Promise.resolve({ success: false });
    }
  }

  async getLocationsForReview(): Promise<any> {
    return await this.httpClient.get(this.base_url + "/locations-srv/review", {
      headers: this.prepareHeader()
    }).toPromise();
  }

  async getEmirates(): Promise<any> {
    return await this.httpClient.get(this.base_url + "/emirates-srv/list", {
      headers: this.prepareHeader()
    }).toPromise();
  }

  async getLocationList(): Promise<any> {
    const query: any = {};
    query.country_id = appInfo.countryId;
    query.brand_id = appInfo.brandId;
    return await this.httpClient.post(this.base_url + "/locations-srv/web", query, {
      headers: this.prepareHeader()
    }).toPromise();
  }

  async getCategoryList(): Promise<any> {
    const query: any = {};
    query.country_id = appInfo.countryId;
    query.brand_id = appInfo.brandId;
    return await this.httpClient.post(this.base_url + "/category-srv/web/list", query, {
      headers: this.prepareAPIHeader()
    }).toPromise();

  }

  async getProductList(): Promise<any> {
    const query: any = {};
    query.country_id = appInfo.countryId;
    query.brand_id = appInfo.brandId;
    return await this.httpClient.post(this.base_url + "/products-srv/list", query, {
      headers: this.prepareAPIHeader()
    }).toPromise();
  }

  async addCartItems(data: any): Promise<any> {
    return await this.httpClient.post(this.base_url + "/carts-srv", data, {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }

  async getCartDetails(sub: string): Promise<any> {
    return await this.httpClient.get(this.base_url + "/carts-srv/web/list/" + sub, {
      headers: this.prepareAuthHeader()
    }).toPromise();
  }

  async removeCartItems(remove_obj: any): Promise<any> {
    this.httpClient.delete(this.base_url + "/carts-srv/" + remove_obj.sub + "/" + remove_obj.product_id,
      {
        headers: this.prepareAuthHeader()
      }).toPromise();
  }

}