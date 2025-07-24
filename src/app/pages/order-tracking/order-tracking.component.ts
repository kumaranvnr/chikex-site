import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Data Get
import { CartData, orderStatus } from './data';
import { HttpService } from 'src/app/services/http.service';
import { FromDataResolver } from 'src/app/services/helpers/FormDataResolver';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})

/**
 * Order Tracking Component
 */
export class OrderTrackingComponent implements OnInit {
  fromDataResolver = FromDataResolver;
  orderDatas: any;
  order_status: any;

  constructor(private modalService: NgbModal, private ngxService: NgxUiLoaderService,
    private restService: HttpService) {
    this.getOrderDetails();
  }

  ngOnInit(): void {

  }

  async getOrderDetails(): Promise<any> {
    this.ngxService.start();
    let orderDetails = await this.restService.getOrderTrackingById();
    if (orderDetails) {
      this.orderDatas = orderDetails.data[0];
      this.order_status = orderStatus;
      for (let i: number = 0; i < orderStatus.length; i++) {
        const order_timing = this.orderDatas.orderStatus.find((data: any) => data.status == orderStatus[i].id.toUpperCase());
        if (order_timing) {
          orderStatus[i].time = order_timing.createdAt;
        }
        if (orderStatus[i].id.toUpperCase() == this.orderDatas.status) {
          orderStatus[i].flag = "completed";
        } else {
          orderStatus[i].flag = "active";
        }
      }
    }
    this.ngxService.stop();
  }
  /**
  * Open center modal and product data get
  * @param centerDataModal center modal data
  */
  product_img: any;
  singleData: any;
  centerModal(centerDataModal: any) {
    this.modalService.open(centerDataModal, { size: 'lg', centered: true });
  }
}
