import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private login = new BehaviorSubject(false);
  loginStatus = this.login.asObservable();

  private cartUpdate = new BehaviorSubject(false);
  cart = this.cartUpdate.asObservable();

  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  nextMessage(flag: boolean) {
    this.login.next(flag);
  }

  changeMessage(address: any) {
    this.messageSource.next(address)
  }


}
