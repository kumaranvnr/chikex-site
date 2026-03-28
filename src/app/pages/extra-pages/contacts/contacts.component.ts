import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

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

  contactForm!: FormGroup;
  contactus!: IContactUs;
  request_submit = false;
  isSubmitting: boolean = false;
  submitted = false;
  location_list: any = {};
  emirates_list: any = {};


  attachments: string[] = [];
  files: File[] = [];
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

    this.buildContactUsForm();
  }

  buildContactUsForm() {
    if (!this.contactus) {
      this.contactus = ({} as IContactUs);
      this.contactus._id = '';
      this.contactus.name = '';
      this.contactus.phone = '';
      this.contactus.email = '';
      this.contactus.title = '';
      this.contactus.subject = '';
      this.contactus.message = '';
      this.contactus.attachments = [];
    }

    this.contactForm = this.formBuilder.group({
      _id: [this.contactus._id],
      name: [this.contactus.name, [Validators.required]],
      email: [this.contactus.email, [Validators.required]],
      phone: [this.contactus.phone, [Validators.required]],
      title: [this.contactus.title],
      subject: [this.contactus.subject],
      message: [this.contactus.message, [Validators.required]],
      attachments: [this.contactus.attachments],
    });
  }

  removeAttachment(index: number) {
    this.attachments.splice(index, 1);
    this.contactus.attachments = this.attachments;
    this.contactForm.get("attachments")?.setValue(this.attachments);
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

  async onSubmit() {
    this.submitted = true;
    this.isSubmitting = true;
    this.contactForm.get("title")?.setValue('enquiry from uae');
    if (this.contactForm.invalid) {
      return;
    }
    let save_respose;
    const master_data = this.contactForm.value;
    if (!master_data.name) {
      alert("Please enter the name"); return;
    }
    if (!master_data.email) {
      alert("Please enter the email"); return;
    }
    if (!master_data.phone) {
      alert("Please enter the phone"); return;
    }
    if (!master_data.message) {
      alert("Please enter the message content"); return;
    }

    master_data.message = '<div>mail from ' + master_data.name +
      '</div><br>email : ' + master_data.email +
      '</div><br>phone number : ' + master_data.phone +
      '</div><div><br></div><div> enquiry about <br>' + master_data.message;
    master_data.text = 'enquiry';
    save_respose = await this.httpService.sendEmail(master_data);

    if (save_respose.success) {
      alert('Saved Successfully');
    }
    this.contactForm.reset();
    this.attachments = [];
    this.submitted = false;
    this.isSubmitting = false;
  }

  async uploadAttachementImage(e: any): Promise<void> {
    try {
      this.request_submit = true;
      for (const file of e.target.files) {
        if (!file) { return; }
        const formData = new FormData();
        formData.append('file', file);
        const response = await this.httpService.uploadMailAttachment(formData);
        if (response.success && response.data && response.data.url) {
          if (response.data.url) {
            if (this.attachments.length == 0) { this.attachments = []; }
            this.attachments.push(response.data.url);
          }
        }
      }
    } catch (error) {
      alert('Error while uploading image');
    } finally {
      this.request_submit = false;
      if (this.contactus.attachments.length == 0) { this.contactus.attachments = []; }
      this.contactus.attachments = this.attachments;
      this.contactForm.get("attachments")?.setValue(this.attachments);
    }
  }
}

export interface IContactUs {
  _id: string;
  name: string;
  email: string;
  phone: string;

  title: string;
  subject: string;
  message: string;
  attachments: string[];
}