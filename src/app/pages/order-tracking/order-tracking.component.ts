import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Data Get
import { CartData, orderStatus } from './data';
import { HttpService } from 'src/app/services/http.service';
import { FromDataResolver } from 'src/app/services/helpers/FormDataResolver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieStore } from 'src/app/services/helpers/CookieStore';

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
  order_no: string = '';

  searchOrderNumber: string = '';
  searchStatus: {
    type: 'searching' | 'success' | 'error' | 'warning';
    message: string;
  } | null = null;

  constructor(private modalService: NgbModal, private ngxService: NgxUiLoaderService, private route: ActivatedRoute,
    private restService: HttpService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.order_no = params['order_no'];
    });
    this.getLocationList();
    this.getOrderDetails();

  }

  searchOrder(): void {
    if (!this.searchOrderNumber || this.searchOrderNumber.trim().length === 0) {
      this.searchStatus = {
        type: 'warning',
        message: 'Please enter an order number to search.'
      };
      return;
    }

    // Clean the order number (remove # if present)
    const cleanOrderNumber = this.searchOrderNumber.replace('#', '').trim();

    // Set searching status
    this.searchStatus = {
      type: 'searching',
      message: 'Searching for order...'
    };

    this.order_no = cleanOrderNumber;
    // Simulate API call or implement actual search logic
    this.performOrderSearch(cleanOrderNumber);
  }

  private performOrderSearch(orderNumber: string): void {
    this.getOrderDetails();

    setTimeout(() => {
      if (this.orderDatas && this.orderDatas.order_no === orderNumber) {
        this.searchStatus = {
          type: 'success',
          message: `Order #${orderNumber} is already displayed below.`
        };
      } else {

        this.searchStatus = {
          type: 'error',
          message: `Order #${orderNumber} not found. Please check the order number and try again.`
        };
      }
      // Clear status after 5 seconds
      setTimeout(() => {
        this.searchStatus = null;
      }, 5000);
    }, 1000);
  }

  clearSearchStatus(): void {
    this.searchStatus = null;
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
    try {
      this.ngxService.start();
      if (this.order_no == '') {
        const order_data = await CookieStore.getDataAsync("order_info");
        this.order_no = order_data.order_no;
      }
      let orderDetails = await this.restService.getOrderTrackingByOrderNo(this.order_no);
      if (orderDetails) {
        this.orderDatas = orderDetails.data;
        this.order_status = orderStatus;
        for (let i: number = 0; i < orderStatus?.length; i++) {
          const order_timing = this.orderDatas?.orderStatus.find((data: any) => data?.status == orderStatus?.[i].id.toUpperCase());
          if (order_timing) {
            orderStatus[i].time = new Date(order_timing?.createdAt).toLocaleString();
            orderStatus[i].flag = "completed";
          }
          else {
            orderStatus[i].flag = "active";
          }
        }
      }
      this.ngxService.stop();
    }
    catch (error) {
      console.log(error);
      this.ngxService.stop();
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

  getCurrentStepNumber(): number {
    if (!this.order_status) return 0;

    const activeIndex = this.order_status.findIndex((step: { flag: string; }) => step.flag === 'active');
    const completedSteps = this.order_status.filter((step: { flag: string; }) => step.flag === 'completed').length;

    return activeIndex !== -1 ? activeIndex + 1 : completedSteps;
  }

  // Calculate progress percentage for desktop timeline
  getProgressPercentage(): number {
    if (!orderStatus || orderStatus.length === 0) return 0;

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
      const mobile = location.loc_whatsapp.replace(/\+/g, '').replace(/\s/g, '');
      if (location) {
        window.open(`tel:${mobile}`, '_self');

      }
    }
  }

  msgSupport(): void {
    if (this.orderDatas && this.location_List.length > 0) {
      let location = this.location_List.find((data: any) => data.code == this.orderDatas.outlet_code);
      const mobile = location.loc_whatsapp.replace(/\+/g, '').replace(/\s/g, '');
      if (location) {
        window.open(`https://wa.me/${mobile}`, '_blank');
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
