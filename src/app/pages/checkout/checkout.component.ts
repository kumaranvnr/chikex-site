import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { cart_details, cartdata } from '../cart/data';
import { HttpService } from 'src/app/services/http.service';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { AddresslistmodalComponent } from 'src/app/shared/modals/addresslistmodal/addresslistmodal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/services/shared.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {

  formData!: UntypedFormGroup;
  submitted = false;
  total_price: any = 0;
  cartproduct: any;
  valid_coupon: any;
  discount: any;
  finalprice: any;
  checkoutInfo: any;
  current_address: any;



  message: string | any;
  subscription: Subscription | any;

  constructor(public formBuilder: UntypedFormBuilder,
    private restService: HttpService,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private ngxService: NgxUiLoaderService,
    private cd: ChangeDetectorRef,) {

    this.getCartDetails();
    this.check_delivery_address();
    //   this.getCurrentLocation();

  }

  lat: any; long: any;
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.");
              break;
          }
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  check_delivery_address() {
    CookieStore.getDataAsync('current_address').then((data: any) => {
      if (!data) {
        this.openAddressModal();
      }
      else {
        this.setCurrentAddress(data);
      }
    });

  }

  setCurrentAddress(addressData: any) {
    this.current_address = addressData;
    // this.sharedService.updateAddress(addressData);
    this.sharedService.changeMessage(addressData);
    CookieStore.saveDataAsync('current_address', addressData);
  }
  openAddressModal() {
    this.modalService.open(AddresslistmodalComponent, { size: 'lg', centered: true });
  }

  async getCartDetails(): Promise<any> {
    this.ngxService.start();
    var sub = CookieStore.getUserInfo()?.sub;
    let cart_reponse = await this.restService.getCartDetails(sub);
    if (cart_reponse.data) {
      cart_details._id = cart_reponse.data._id;
      cart_details.sub = cart_reponse.data.sub;
      cart_details.total_price = cart_reponse.data.total_price;

      this.checkoutInfo = cart_reponse.data

      cartdata.splice(0);
      cart_reponse.data.cart_items.forEach((element: any) => {
        cartdata.push(element);
      });
    }
    this.cartproduct = cartdata;
    this.ngxService.stop();
  }

  ngAfterViewInit(): void {
    this.total_price = cart_details.total_price;
    // this.sharedService.address$.subscribe(address => {
    //   if (address) {
    //     this.current_address = address;
    //     CookieStore.saveDataAsync('current_address', address);
    //   }
    // });
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    // Validation
    this.formData = this.formBuilder.group({
      comments: [''],
      need_change_from: [''],
      payment_type: [''],
    });

    this.cartproduct = cartdata;
    this.cartproduct.forEach((element: any) => {
      this.total_price += element.total_price
    });
    this.subscription = this.sharedService.currentMessage.subscribe(address => this.current_address = address)
  }
  change_address() {
    this.openAddressModal();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get form() {
    return this.formData.controls;
  }

  async completeorder(): Promise<void> {

    this.submitted = true;
    this.cartproduct = cartdata;
    if (this.cartproduct.length == 0) {
      this.ngxService.stop(); this.submitted = false;
      Swal.fire({ title: 'Message', text: `Cart is empty!.`, confirmButtonColor: '#364574', timer: 1500 });
      return;
    }
    let checkoutData = this.formData.value;
    if (checkoutData.payment_type == null || checkoutData.payment_type == '' || checkoutData.payment_type == undefined) {
      this.ngxService.stop(); this.submitted = false;
      Swal.fire({ title: 'Message', text: `Choose the payment options`, confirmButtonColor: '#364574', timer: 1500 });
      return;
    }

    if (checkoutData.payment_type == 'Online') {
      this.ngxService.stop(); this.submitted = false;
      Swal.fire({ title: 'Message', text: `Technical issue with online payment.Please proceed with COD`, confirmButtonColor: '#364574', timer: 1500 });
      return;
    }

    this.ngxService.start();
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    let currentTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

    var sub = CookieStore.getUserInfo()?.sub;

    let obj = {
      _id: cart_details._id,
      sub: sub,
      table_time: currentTime,
      need_change_from: checkoutData.need_change_from,
      comments: checkoutData.comments,
      payment_type: checkoutData.payment_type,
      outlet_code: this.current_address.nearbyStore,
      table_type: 'Delivery',
      currency: 'AED',
      source: 'Site',
      lat: this.lat,
      long: this.long
    }

    await this.restService.updateCartRequirement(obj);

    let cart_obj = { cart_id: cart_details._id, sub: sub, useraddress: this.current_address };
    let order_response = await this.restService.convertCartToOrder(cart_obj);

    let order_obj = {
      sub: sub,
      order_no: order_response.data.orderNo,
      payment_type: checkoutData.payment_type
    };
    let payment_response = await this.restService.updatePaymentInfo(order_obj);

    CookieStore.saveDataAsync("order_info", order_response.data);
    this.ngxService.stop();
    window.location.href = '/order-confirmation';
  }

  setprice(price: any) {
    return price;
  }

}
