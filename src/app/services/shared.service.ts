import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  brandData: string | any;
  categoryData: string | any;
  productData: string | any;
  private login = new BehaviorSubject(false);
  loginStatus = this.login.asObservable();

  private cartUpdate = new BehaviorSubject(false);
  cart = this.cartUpdate.asObservable();

  private cartQuantity = new Subject<any>();
  private default_whatsapp_number = new Subject<any>();

  constructor() { }

  nextMessage(flag: boolean) {
    this.login.next(flag);
  }

  updateCart(flag: boolean) {
    this.cartUpdate.next(flag);
  }

  public getValue(): Observable<any> {
    return this.cartQuantity;
  }

  public setValue(value: any): void {
    this.cartQuantity.next(value);
  }

  public get_DefaultWhatsappValue(): Observable<any> {
    return this.default_whatsapp_number;
  }

  public set_DefaultWhatsappValue(value: any): void {
    this.default_whatsapp_number.next(value);
  }

}
