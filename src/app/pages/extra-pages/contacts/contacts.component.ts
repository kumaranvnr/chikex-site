import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { HttpService } from 'src/app/services/http.service';
import { FromDataResolver } from 'src/app/services/helpers/FormDataResolver';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {
  fromDataResolver = FromDataResolver;
  breadCrumbItems!: Array<{}>;
  contactForm!: UntypedFormGroup;
  submitted = false;
  location_list: any = {};
  emirates_list: any = {};
  constructor(private formBuilder: UntypedFormBuilder,
    private ngxservice: NgxUiLoaderService,
    private httpService: HttpService) {

    this.getLocationList()
  }

  ngOnInit(): void {

    this.breadCrumbItems = [
      { label: 'Home', link: '/' },
      { label: 'Contacts', active: true, link: '/pages/contatcs' }
    ];

    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }
  async getLocationList(): Promise<any> {
    this.ngxservice.start();
    let response = await this.httpService.getLocationList();
    if (response.data) {
      this.location_list = response.data.location_list;
      this.emirates_list = response.data.emirates_list;
    } else {
      console.log(response?.error);
    }
    this.ngxservice.stop();
  }

  getEmirateName(emirate: string) {
    return this.emirates_list.find((c: { code: string; }) => c.code == emirate).name;
  }

  get form() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
  }

}
