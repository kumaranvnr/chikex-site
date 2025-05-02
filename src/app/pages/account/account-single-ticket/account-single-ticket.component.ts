import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { cartdata } from '../../cart/data';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-account-single-ticket',
  templateUrl: './account-single-ticket.component.html',
  styleUrls: ['./account-single-ticket.component.scss']
})

/**
 * Account Single Ticket Component
 */
export class AccountSingleTicketComponent implements OnInit {

  // Form Submit
  userForm!: UntypedFormGroup;
  submitted = false;
  public isCollapsed = true;
  picture: string = '';
  name: string = '';
  email: string = '';
  constructor(private formBuilder: UntypedFormBuilder,
    private restService: HttpService,
    private router: Router) {

    let user_info = CookieStore.getUserInfo();
    this.picture = user_info.picture;
    this.name = user_info.name;
    this.email = user_info.email;
  }

  ngOnInit(): void {
    /**
     * Form Validation
     */
    this.userForm = this.formBuilder.group({
      title: ['', [Validators.required]],
    });
  }

  get form() {
    return this.userForm.controls;
  }
  SignOut() {
    this.restService.UserSignOut()
  }
  /**
   * Save user
   */
  saveUser() {
    if (this.userForm.valid) { }
    this.submitted = true;
  }

}
