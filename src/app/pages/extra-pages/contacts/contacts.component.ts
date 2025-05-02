import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { location_list } from '../../index/data';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  contactForm!: UntypedFormGroup;
  submitted = false;
  location_list: any = {};
  emirates_list: any = {};
  constructor(private formBuilder: UntypedFormBuilder, private httpService: HttpService) {
    this.getLocationList()
  }

  ngOnInit(): void {

    this.breadCrumbItems = [
      { label: 'Home', link: '/fashion-store-v1' },
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
    let response = await this.httpService.getLocationList();
    if (response.data) {
      this.location_list = response.data.location_list;
      this.emirates_list = response.data.emirates_list;
    } else {
      console.log(response?.error);
    }
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
