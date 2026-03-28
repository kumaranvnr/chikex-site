import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FromDataResolver } from 'src/app/services/helpers/FormDataResolver';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent {

  breadCrumbItems!: Array<{}>;

  careersForm!: FormGroup;
  careers!: ICareers;

  submitted = false;
  mail_data_loading: boolean = false;
  isSubmitting: boolean = false;
  request_submit = false;
  attachments: string[] = [];
  files: File[] = [];
  fromDataResolver = FromDataResolver;
  constructor(private formBuilder: UntypedFormBuilder, private restService: HttpService) {
  }

  ngOnInit(): void {
    this.buildCareerForm();

    this.breadCrumbItems = [
      { label: 'Home', link: '/' },
      { label: 'Careers', active: true, link: '/pages/careers' }
    ];
  }

  buildCareerForm() {
    if (!this.careers) {
      this.careers = ({} as ICareers);
      this.careers._id = '';
      this.careers.name = '';
      this.careers.email = '';
      this.careers.title = '';
      this.careers.subject = '';
      this.careers.message = '';
      this.careers.attachments = [];
    }

    this.careersForm = this.formBuilder.group({
      _id: [this.careers._id],
      name: [this.careers.name, [Validators.required]],
      email: [this.careers.email, [Validators.required]],
      title: [this.careers.title],
      subject: [this.careers.subject, [Validators.required]],
      message: [this.careers.message, [Validators.required]],
      attachments: [this.careers.attachments],
    });
  }

  removeAttachment(index: number) {
    this.attachments.splice(index, 1);
    this.careers.attachments = this.attachments;
    this.careersForm.get("attachments")?.setValue(this.attachments);
  }

  get form() { return this.careersForm.controls; }

  async onSubmit() {
    this.submitted = true;
    this.isSubmitting = true;
    this.careersForm.get("title")?.setValue('hiring request from uae');
    this.careersForm.get("subject")?.setValue('hiring request from uae');

    if (this.careersForm.invalid) {
      return;
    }
    try {
      let save_respose;
      const master_data = this.careersForm.value;

      if (!master_data.name) {
        alert("Please enter the name"); return;
      }
      if (!master_data.email) {
        alert("Please enter the email"); return;
      }
      if (!master_data.message) {
        alert("Please enter the message content"); return;
      }

      master_data.message = '<div>mail from ' + master_data.name + ' for hiring request</div><div><br></div><div>' + master_data.message + '</div><br>Contact details : ' + master_data.email;
      this.mail_data_loading = true;
      master_data.text = 'hiring request';
      save_respose = await this.restService.sendEmail(master_data);

      if (save_respose.success) {
        alert('Saved Successfully');
      }
      this.careersForm.reset();
      this.attachments = [];
    } catch (error) {
      console.log(error);
    }
    finally {
      this.mail_data_loading = false;
      this.isSubmitting = false;
      this.submitted = false;
    }

  }

  async uploadAttachementImage(e: any): Promise<void> {
    try {
      this.request_submit = true;
      for (const file of e.target.files) {
        if (!file) { return; }
        const formData = new FormData();
        formData.append('file', file);
        const response = await this.restService.uploadMailAttachment(formData);
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
      if (this.careers.attachments.length == 0) { this.careers.attachments = []; }
      this.careers.attachments = this.attachments;
      this.careersForm.get("attachments")?.setValue(this.attachments);
    }
  }
}

export interface ICareers {
  _id: string;
  name: string;
  email: string;

  title: string;
  subject: string;
  message: string;
  attachments: string[];
}