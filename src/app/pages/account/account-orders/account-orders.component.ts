import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { AccountListService } from './account-list.service';
import { DatePipe, DecimalPipe } from '@angular/common';

import { Table } from './account-list.model';
import { OrdersData } from './data';
import { Router } from '@angular/router';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { cartdata } from '../../cart/data';
import { HttpService } from 'src/app/services/http.service';
import { FromDataResolver } from 'src/app/services/helpers/FormDataResolver';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss'],
  providers: [AccountListService, DecimalPipe]
})

/**
 * Account Orders Component
 */
export class AccountOrdersComponent implements OnInit {
  fromDataResolver = FromDataResolver;
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  public isCollapsed = true;
  picture: string = '';
  name: string = '';
  email: string = '';

  order_list: any[] = [];
  complete_order_list: any[] = [];
  single_order: any;
  orders_status: string = '';
  constructor(public service: AccountListService,
    private modalService: NgbModal,
    private restService: HttpService,
    private ngxService: NgxUiLoaderService,
    public datePipe: DatePipe,
    private router: Router) {
    this.ngxService.start();
    this.tables$ = service.tables$;
    this.total$ = service.total$;

    let user_info = CookieStore.getUserInfo();
    this.picture = user_info.picture;
    this.name = user_info.name;
    this.email = user_info.email;


    this.getAllOrders();
    this.ngxService.stop();
  }

  ngOnInit(): void {
  }


  async getAllOrders(): Promise<void> {
    OrdersData.splice(0);
    let account_id = CookieStore.getUserInfo()?.sub;
    let response = await this.restService.getAllOrders(account_id);
    if (response) {
      this.order_list = response.data;
      this.complete_order_list = response.data;
    }
  }
  SignOut() {
    console.log('SignOut');
    this.restService.UserSignOut()
  }
  /**
   * Size Chart Modal
   * @param ordertDetailModal scroll modal data
   */
  orderModal(ordertDetailModal: any, order_info: any) {
    this.single_order = order_info;
    this.modalService.open(ordertDetailModal, { size: 'lg', centered: true });
  }

  orderFilter(event: any) {
    console.log(event.target.value);
    if (this.orders_status != '') {
      this.order_list = this.complete_order_list.filter((order: any) => {
        return order.status === this.orders_status;
      });
    }
    else {
      this.order_list = this.complete_order_list;
    }

  }
  // repeatOrder(order_info: any) {

  // }

}
