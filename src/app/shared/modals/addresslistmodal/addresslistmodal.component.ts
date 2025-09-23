import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';
import { AddressmodalComponent } from '../addressmodal/addressmodal.component';
import Swal from 'sweetalert2';
import { NewaddressmodalComponent } from '../newaddressmodal/newaddressmodal.component';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-addresslistmodal',
  templateUrl: './addresslistmodal.component.html',
  styleUrls: ['./addresslistmodal.component.scss']
})
export class AddresslistmodalComponent implements OnInit, OnDestroy {

  selectedAddress: any;
  address_list: any;

  message: string | any;
  subscription: Subscription | any;

  constructor(private modalService: NgbModal, private sharedService: SharedService, private ngxService: NgxUiLoaderService,
    private restService: HttpService, private route: ActivatedRoute) {
    this.ngxService.start();
    this.getUserAddressList();
    this.ngxService.stop();
  }

  closemodal() {
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  async getUserAddressList(): Promise<any> {
    let user_address_response = await this.restService.getUserAddressList();
    if (user_address_response?.data) {
      this.address_list = user_address_response?.data;
    }
    if (this.address_list?.length != 0) {
      const defaultAddress = this.address_list.find((address: any) => address.primary == true);
      if (defaultAddress) {
        this.selectedAddress = defaultAddress;
      } else {
        this.selectedAddress = this.address_list[0];
      }
    }
    if (this.selectedAddress) {
      this.selectAddress(this.selectedAddress);
    }
    if (user_address_response?.data.length == 0) {
      CookieStore.saveDataAsync('current_address', {});
      this.sharedService.changeMessage({});
      this.closemodal();
      this.addNewAddress();
    }
  }

  ngOnInit(): void {
    this.subscription = this.sharedService.currentMessage.subscribe(message => this.message = message)
  }

  selectAddress(address: any) {
    this.selectedAddress = address;
    CookieStore.saveDataAsync('current_address', address);
    this.sharedService.changeMessage(address);
  }

  editAddress(address: any) {
    CookieStore.clearDataAsync('address');
    CookieStore.clearDataAsync('location_data');
    CookieStore.saveDataAsync('edit_address', address);
    this.closemodal();
    this.modalService.open(NewaddressmodalComponent, { size: 'lg', centered: true });
  }

  async deleteAddress(address: any) {
    this.ngxService.start();
    const delete_address_response = await this.restService.deleteUserAddress(address._id);
    if (delete_address_response?.success) {
      this.getUserAddressList();
    }
    this.ngxService.stop();
  }

  addNewAddress() {
    this.modalService.open(AddressmodalComponent, { size: 'lg', centered: true });
  }

  confirmSelection() {
    if (this.selectedAddress) {
      CookieStore.saveDataAsync('selected_address', this.selectedAddress);
    }
  }

  opennewaddressmodal() {
    CookieStore.clearDataAsync('edit_address');
    CookieStore.clearDataAsync('selected_address');
    CookieStore.clearDataAsync('location_data');

    this.modalService.open(AddressmodalComponent, { size: 'lg', centered: true });
  }

  async address_confirmed() {

    if (this.selectedAddress) {
      CookieStore.saveDataAsync('selected_address', this.selectedAddress);
      const obj: any = {};
      obj.sub = CookieStore.getUserInfo()?.sub;
      obj.address_id = this.selectedAddress?._id;
      this.ngxService.start();
      await this.restService.updateCartUserAddress(obj);
      this.ngxService.stop();
      this.closemodal();
    }

  }

}
