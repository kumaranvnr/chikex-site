import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent {

  breadCrumbItems!: Array<{}>;
  aboutForm!: UntypedFormGroup;
  submitted = false;
  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home', link: '/' },
      { label: 'Careers', active: true, link: '/pages/careers' }
    ];


    this.aboutForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      message: ['', [Validators.required]],
      file: ['', [Validators.required]],
    });


  }

  // convenience getter for easy access to form fields
  get form() { return this.aboutForm.controls; }


  /**
  * Form submit
  */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.aboutForm.invalid) {
      return;
    }
  }
}