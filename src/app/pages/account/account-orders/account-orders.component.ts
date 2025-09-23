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
  location_List: any;

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
    this.getLocationList();
    this.ngxService.stop();
  }

  async getLocationList(): Promise<any> {
    let response = await this.restService.getLocationList();
    if (response.data) {
      this.location_List = response.data.location_list;
    } else {
      console.log(response?.error);
    }
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

  async repeatOrder(order: any): Promise<void> {
    this.ngxService.start();
    const order_info: any = {};
    order_info.sub = order.sub;
    order_info.order_no = order.order_no;
    await this.restService.repeatOrder(order_info);
    this.ngxService.stop();
    this.router.navigate(['/cart']);
  }

  getStatusColor(status: string): string {
    const statusColors: { [key: string]: string } = {
      'delivered': 'success',
      'in_progress': 'primary',
      'pending': 'warning',
      'delayed': 'warning',
      'canceled': 'danger',
      'cancelled': 'danger'
    };
    return statusColors[status.toLowerCase()] || 'secondary';
  }

  canCancelOrder(status: string): boolean {
    const cancellableStatuses = ['pending', 'confirmed', 'in_progress'];
    return cancellableStatuses.includes(status.toLowerCase());
  }

  printOrder(order: any): void {
    const printContent = this.generatePrintContent(order);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  }

  generatePrintContent(order: any): string {
    return `
    <html>
      <head>
        <title>Order #${order.order_no}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .order-info { margin-bottom: 20px; }
          .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .items-table th { background-color: #f2f2f2; }
          .total-section { text-align: right; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>Order Receipt</h2>
          <p>Order #${order.order_no}</p>
        </div>
        <div class="order-info">
          <p><strong>Date:</strong> ${this.datePipe.transform(order.createdAt || order.updatedAt, 'dd MMM yyyy, hh:mm aa')}</p>
          <p><strong>Status:</strong> ${order.status.split("_").join(" ")}</p>
        </div>
        <table class="items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.cart_items.map((item: any) => `
              <tr>
                <td>${item.title}</td>
                <td>${item.qty}</td>
                <td>AED ${item.price}</td>
                <td>AED ${item.total_price}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="total-section">
          <p>Subtotal: AED ${order.sub_total}</p>
          <p>Delivery: AED ${order.delivery_charges}</p>
          <p>Discount: AED ${order.discount}</p>
          <p><strong>Total: AED ${order.total_price}</strong></p>
        </div>
      </body>
    </html>
  `;
  }

  contactSupport(order: any): void {
    if (order && this.location_List.length > 0) {
      let location = this.location_List.find((data: any) => data.code == order.outlet_code);
      if (location) {
        window.open(`tel:${location.loc_contact_number}`, '_self');
      }
    }
  }

  contactUs(order: any): void {
    if (order && this.location_List.length > 0) {
      let location = this.location_List.find((data: any) => data.code == order.outlet_code);
      if (location) {
        window.open(`https://wa.me/${location.loc_whatsapp}`, '_blank');
      }
    }
  }

  cancelOrder(order: any): void {
    // Implement order cancellation
    if (confirm(`Are you sure you want to cancel order #${order.order_no}?`)) {
      // Call your API to cancel the order
      console.log('Cancelling order:', order.order_no);
      // this.orderService.cancelOrder(order.id).subscribe(...);
    }
  }

}
