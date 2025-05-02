import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { AccountListService } from './account-address.service';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Sweet Alert
import Swal from 'sweetalert2';

import { Table } from './account-address.model';

import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { addressData } from './data';
import { cartdata } from '../../cart/data';

@Component({
  selector: 'app-account-address',
  templateUrl: './account-address.component.html',
  styleUrls: ['./account-address.component.scss'],
  providers: [AccountListService, DecimalPipe]
})

/**
 * Account Address Component
 */
export class AccountAddressComponent implements OnInit {

  tables$: Observable<Table[]>;
  total$: Observable<number>;
  public isCollapsed = true;
  address_id: boolean = false;
  // Form Submit
  userForm!: UntypedFormGroup;
  submitted = false;
  tableData!: Table[];

  picture: string = '';
  name: string = '';
  email: string = '';
  primary: boolean = true;

  constructor(private modalService: NgbModal,
    public service: AccountListService,
    private router: Router,
    private restService: HttpService,
    private formBuilder: UntypedFormBuilder) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;

    let user_info = CookieStore.getUserInfo();
    this.picture = user_info.picture;
    this.name = user_info.name;
    this.email = user_info.email;
    this.getAllUserAddress();
  }
  SignOut() {
    console.log('SignOut');
    this.restService.UserSignOut();
  }
  ngOnInit(): void {
    this.tableData = addressData;
    //this.tables$.subscribe(x => {
    //      this.tableData = Object.assign([], x);
    //});

    this.userForm = this.formBuilder.group({
      _id: [''],
      account_id: [''],
      given_name: ['', [Validators.required]],
      family_name: ['', [Validators.required]],
      street1: ['', [Validators.required]],
      street2: ['', [Validators.required]],
      city: [''],
      landmark: ['',],
      emirate: ['',],
      mobile: ['',],
      primary: [this.primary]
    });
  }

  /**
   * Open Modal
   * @param sizeChartModal scroll modal data
   */
  OpenModal(sizeChartModal: any) {
    this.userForm.reset();
    this.modalService.open(sizeChartModal, { size: 'lg', centered: true });
  }

  get form() {
    return this.userForm.controls;
  }

  /**
   * Save user
   */
  async saveUser() {
    if (this.userForm.valid) {
      let address_info = this.userForm.value;
      address_info.account_id = CookieStore.getUserInfo()?.sub;
      let save_respose = await this.restService.saveUserAddress(address_info);
      if (save_respose.success) {
        alert('successfully updated')
        this.getAllUserAddress();
      }
      this.modalService.dismissAll();
      this.userForm.reset();
    }
    this.submitted = true;
  }

  userAddressClose() {
    this.modalService.dismissAll();
    this.address_id = false;
  }

  async getAllUserAddress(): Promise<void> {
    addressData.splice(0);
    let response = await this.restService.getAllUserAddress();
    if (response) {
      response.data.forEach((element: any) => {
        addressData.push(element)
      });
    }
  }


  /**
   * Open modal
   * @param content modal content
   */
  singleData: any;

  editModal(content: any, index: any) {
    this.singleData = this.tableData[index];
    this.submitted = false;
    this.modalService.open(content, { size: 'lg', centered: true });
    this.userForm.controls['given_name'].setValue(this.singleData.given_name);
    this.userForm.controls['family_name'].setValue(this.singleData.family_name);
    this.userForm.controls['street1'].setValue(this.singleData.street1);
    this.userForm.controls['street2'].setValue(this.singleData.street2);
    this.userForm.controls['city'].setValue(this.singleData.city);
    this.userForm.controls['landmark'].setValue(this.singleData.landmark);
    this.userForm.controls['emirate'].setValue(this.singleData.emirate);
    this.userForm.controls['mobile'].setValue(this.singleData.mobile);
    this.userForm.controls['primary'].setValue(this.singleData.primary);
    this.userForm.controls['account_id'].setValue(this.singleData.account_id);
    this.userForm.controls['_id'].setValue(this.singleData._id);
    this.address_id = true;
  }

  // Remove Data
  removeData(e: any, address_id: string) {
    Swal.fire({
      title: 'Are you Sure ?',
      text: 'Are you Sure You want to Remove this Product ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        console.log(address_id);
        this.removeAddress(address_id).then(res => {
          addressData.splice(addressData.findIndex(x => x._id == address_id), 1)
          Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', confirmButtonColor: '#364574', icon: 'success', });
          e.target.closest('tr').remove();
        });
      }
    });
  }

  async removeAddress(address_id: string): Promise<any> {
    return await this.restService.removeUserAddress(address_id);
  }

}
