import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-password-recovery',
  templateUrl: './account-password-recovery.component.html',
  styleUrls: ['./account-password-recovery.component.scss']
})

/**
 * Account Password Recovery Component
 */
export class AccountPasswordRecoveryComponent implements OnInit {

   // Form Submit
   userForm!: UntypedFormGroup;
   submitted = false;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
     * Form Validation
     */
     this.userForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }

  get form() {
    return this.userForm.controls;
  }

  /**
   * Save user
   */
   saveUser() {
    if (this.userForm.valid) { }
    this.submitted = true;    
  }

}
