import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Data Get
import { CartData, orderStatus } from './data';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})

/**
 * Order Tracking Component
 */
export class OrderTrackingComponent implements OnInit {

  orderDatas: any;
  order_status: any;

  constructor(private modalService: NgbModal,
    private restService: HttpService) {
    this.getOrderDetails();
  }

  ngOnInit(): void {

  }

  async getOrderDetails(): Promise<any> {
    let orderDetails = await this.restService.getOrderDetailsById();
    if (orderDetails) {
      this.orderDatas = orderDetails;
      this.order_status = orderStatus;
      console.log(orderStatus);
      for (let i: number = 0; i < orderStatus.length; i++) {
        console.log(orderStatus[i].id + "-" + this.orderDatas.status);
        if (orderStatus[i].id == this.orderDatas.status) {
          orderStatus[i].flag = "active";
          return;
        } else {
          orderStatus[i].flag = "completed";
        }
      }
    }
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
