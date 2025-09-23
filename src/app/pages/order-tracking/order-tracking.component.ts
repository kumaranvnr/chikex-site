import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Data Get
import { CartData, orderStatus } from './data';
import { HttpService } from 'src/app/services/http.service';
import { FromDataResolver } from 'src/app/services/helpers/FormDataResolver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

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
  location_List: any;

  constructor(private modalService: NgbModal, private ngxService: NgxUiLoaderService,
    private restService: HttpService, private router: Router) {
    this.getOrderDetails();
    this.getLocationList();
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

  getCurrentStepNumber(): number {
    if (!this.order_status) return 0;

    const activeIndex = this.order_status.findIndex((step: { flag: string; }) => step.flag === 'active');
    const completedSteps = this.order_status.filter((step: { flag: string; }) => step.flag === 'completed').length;

    return activeIndex !== -1 ? activeIndex + 1 : completedSteps;
  }

  // Calculate progress percentage for desktop timeline
  getProgressPercentage(): number {
    if (!this.order_status || this.order_status.length === 0) return 0;

    const completedSteps = this.order_status.filter((step: { flag: string; }) => step.flag === 'completed').length;
    const activeStepIndex = this.order_status.findIndex((step: { flag: string; }) => step.flag === 'active');

    let progress = (completedSteps / this.order_status.length) * 100;

    // Add partial progress for active step
    if (activeStepIndex !== -1) {
      progress += (0.5 / this.order_status.length) * 100;
    }

    return Math.min(progress, 100);
  }

  // Handle step click for desktop timeline
  onStepClick(step: any, index: number): void {
    if (step.flag === 'completed') {
      // Show step details or navigate to specific step info
      console.log('Step clicked:', step);
    }
  }

  // Action methods
  callSupport(): void {
    if (this.orderDatas && this.location_List.length > 0) {
      let location = this.location_List.find((data: any) => data.code == this.orderDatas.outlet_code);
      if (location) {
        window.open(`tel:${location.loc_contact_number}`, '_self');

      }
    }
  }

  msgSupport(): void {
    if (this.orderDatas && this.location_List.length > 0) {
      let location = this.location_List.find((data: any) => data.code == this.orderDatas.outlet_code);
      if (location) {
        window.open(`https://wa.me/${location.loc_whatsapp}`, '_blank');
      }
    }
  }

  trackOnMap(): void {
    // Implement map tracking functionality
    console.log('Opening map tracking...');
    // You could open a modal with map or navigate to map page
  }

  shareTracking(): void {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: `Order #${this.orderDatas?.order_no} Tracking`,
        text: `Track my order status`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
      console.log('Tracking link copied to clipboard');
    }
  }

  refreshTracking(): void {
    // Implement refresh tracking functionality
    console.log('Refreshing tracking data...');
    // Reload order data or make API call
  }

  downloadReceipt(): void {
    // Implement download receipt functionality
    console.log('Downloading receipt...');
    // Generate and download PDF receipt
  }

  async reorderItems(): Promise<void> {
    this.ngxService.start();
    const order_info: any = {};
    order_info.sub = this.orderDatas.sub;
    order_info.order_no = this.orderDatas.order_no;
    await this.restService.repeatOrder(order_info);
    this.ngxService.stop();
    this.router.navigate(['/cart']);
  }
}
