import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-help-submit-request',
  templateUrl: './help-submit-request.component.html',
  styleUrls: ['./help-submit-request.component.scss']
})

export class HelpSubmitRequestComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  contactForm!: UntypedFormGroup;
  submitted = false;
  request_submit = false;

  constructor(private formBuilder: UntypedFormBuilder,
    private restservice: HttpService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home', link: '/' },
      { label: 'Help center', link: '/pages/submit-request' },
      { label: 'Submit request', active: true, link: '/pages/submit-request' }
    ];
    this.contactForm = this.formBuilder.group({
      topic: ['', [Validators.required]],
      subject: [''],
      message: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      attachment_url: [''],
      file_id: [''],
    });
  }

  canDisable(): boolean {
    if (this.contactForm.value._id) return false;
    return this.contactForm.status !== 'VALID';
  }

  async uploadImage(e: any, form: any, key: string): Promise<void> {
    try {
      this.request_submit = true;
      const file = e.target.files[0];
      if (!file) { return; }
      const formData = new FormData();
      formData.append('file', file);
      const response = await this.restservice.uploadRequestAttachmentFile(formData);
      if (response.success && response.data && response.data.url) {
        const val = form.get(key);
        if (val) {
          val.setValue(response.data.url);
          form.get("file_id").setValue(response.data.fileId);
          form.get("attachment_url").setValue(response.data.url);
        }
      }
      this.request_submit = false;
    } catch (error) {

    } finally {

    }
  }

  get form() { return this.contactForm.controls; }
  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }

    let obj = {
      topic: this.contactForm.get('topic')?.value,
      subject: this.contactForm.get('subject')?.value,
      message: this.contactForm.get('message')?.value,
      name: this.contactForm.get('name')?.value,
      email: this.contactForm.get('email')?.value,
      mobile: this.contactForm.get('mobile')?.value,
      attachment_url: this.contactForm.get('attachment_url')?.value,
      file_id: this.contactForm.get('file_id')?.value,
      status: 'Open'
    }
    let response = await this.restservice.saveGuestRequest(obj);
    if (response) {
      Swal.fire({ text: "Thank you for Your Message. Our executive will contact you shortly.", timer: 1500 });
      this.contactForm.reset();
      this.submitted = false;
    }
  }

}
export interface IRequest {
  _id: string;
  id: string;

  topic: string;
  subject: string;
  message: string;
  name: string;
  email: string;
  mobile: string;
  attachment_url: string;
  file_id: string;
  status: string;

  migration_flag: string;
  createdAt: Date;
  updatedAt: Date;
  __ref: string;
}