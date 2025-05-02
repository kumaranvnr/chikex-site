import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Sweet Alert
import Swal from 'sweetalert2';

import { Table } from './account-payment.model ';
import { tableData } from './data';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { Router } from '@angular/router';
import { cartdata } from '../../cart/data';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-account-payment',
  templateUrl: './account-payment.component.html',
  styleUrls: ['./account-payment.component.scss']
})

/**
 * Account Payment Component
 */
export class AccountPaymentComponent implements OnInit {

  // Form Submit
  userForm!: UntypedFormGroup;
  submitted = false;
  tableData!: Table[];
  public isCollapsed = true;
  picture: string = '';
  name: string = '';
  email: string = '';
  constructor(private modalService: NgbModal,
    private router: Router,
    private restService: HttpService,
    private formBuilder: UntypedFormBuilder) {

    let user_info = CookieStore.getUserInfo();
    this.picture = user_info.picture;
    this.name = user_info.name;
    this.email = user_info.email;

  }

  ngOnInit(): void {
    this.tableData = tableData;
    /**
     * Form Validation
     */
    this.userForm = this.formBuilder.group({
      ids: [''],
      method: ['', [Validators.required]],
      title: ['', [Validators.required]],
      card_name: ['', [Validators.required]],
      expire_date: ['', [Validators.required]],
      card_no: ['', [Validators.required]],
    });
  }
  SignOut() {
    console.log('SignOut');
    this.restService.UserSignOut()
  }
  /**
   * Open Modal
   * @param sizeChartModal scroll modal data
   */
  OpenModal(sizeChartModal: any) {
    this.modalService.open(sizeChartModal, { size: 'lg', centered: true });
  }

  get form() {
    return this.userForm.controls;
  }

  /**
   * Save user
   */
  saveUser() {
    if (this.userForm.valid) {
      if (this.userForm.get('ids')?.value) {
        this.tableData = this.tableData.map((data: { id: any; }) => data.id === this.userForm.get('ids')?.value ? { ...data, ...this.userForm.value } : data)
      } else {
        const method = this.userForm.get('method')?.value;
        const image = (method == 'paypal' ? 'assets/img/card-paypal.png' : 'assets/img/card-master.png');
        const title = this.userForm.get('title')?.value;
        const card_no = this.userForm.get('card_no')?.value;
        const card_name = this.userForm.get('card_name')?.value;
        const expire_date = this.userForm.get('expire_date')?.value;

        this.tableData.push({
          id: this.tableData.length + 1,
          method,
          image,
          title,
          card_no,
          card_name,
          expire_date
        })
      }
      this.modalService.dismissAll();
      this.userForm.reset();
    }
    this.submitted = true;
  }

  /**
   * Open modal
   * @param content modal content
   */
  singleData: any;
  editModal(content: any, id: any) {
    this.singleData = this.tableData[id];
    this.submitted = false;
    this.modalService.open(content, { size: 'lg', centered: true });
    this.userForm.controls['method'].setValue(this.singleData.method);
    this.userForm.controls['title'].setValue(this.singleData.title);
    this.userForm.controls['card_no'].setValue(this.singleData.card_no);
    this.userForm.controls['card_name'].setValue(this.singleData.card_name);
    this.userForm.controls['expire_date'].setValue(this.singleData.expire_date);
    this.userForm.controls['ids'].setValue(this.singleData.id);
  }

  // Remove Data
  removeData(e: any) {
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
        Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', confirmButtonColor: '#364574', icon: 'success', });
        e.target.closest('tr').remove();
      }
    });
  }

}
