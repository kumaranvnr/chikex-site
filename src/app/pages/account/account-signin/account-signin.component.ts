import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { HttpService } from 'src/app/services/http.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-account-signin',
  templateUrl: './account-signin.component.html',
  styleUrls: ['./account-signin.component.scss']
})

/**
 * Account Signin Component
 */
export class AccountSigninComponent implements OnInit {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;

  // Signup form
  SignupForm!: UntypedFormGroup;
  submit = false;
  loginstatus: boolean = false;
  constructor(private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private restService: HttpService, private router: Router,
    private sharedService: SharedService) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    this.SignupForm = this.formBuilder.group({
      user_name: [''],
      email: ['', [Validators.required]],
      given_name: ['', [Validators.required]],
      family_name: ['', [Validators.required]],
      mobile: ['', Validators.required],
      password: ['', [Validators.required]],
      cpassword: ['', Validators.required],
    });
    this.sharedService.loginStatus.subscribe(flag => {
      const user = CookieStore.getUserInfo();
      if (user) {
        this.loginstatus = true;
        //this.user = user.userName;
      } else {
        this.loginstatus = false;
      }
    });
  }

  get f() { return this.loginForm.controls; }

  get fa() { return this.SignupForm.controls; }

  async onSubmit() {

    try {
      if (this.loginForm.valid) {
        const login_data = this.loginForm.value;
        if (!login_data.email) {
          alert('Please enter email address'); return;
        }
        if (!login_data.password) {
          alert('Please enter password'); return;
        }
        let save_respose = await this.restService.userLogin(login_data);
        if (save_respose.success) {
          this.loginForm.reset();
          this.submitted = true;
          this.router.navigate(['/portal/handle/token'], {
            queryParams:
            {
              access_token: save_respose.data[0].session[0].access_token
            }
          });
        }
      }
    } catch (error) {
      alert('Error while read data' + error);
    } finally {
    }

  }


  async SignupSubmit() {
    try {
      if (this.SignupForm.valid) {
        const login_data = this.SignupForm.value;
        login_data.user_name = login_data.given_name + " " + login_data.family_name;

        if (!login_data.email) {
          alert('Please enter email address'); return;
        }
        if (!login_data.password) {
          alert('Please enter password'); return;
        }
        if (!login_data.mobile) {
          alert('Please enter mobile'); return;
        }
        console.log(login_data);
        let save_respose = await this.restService.userRegister(login_data);
        if (save_respose.success) {
          this.SignupForm.reset();
          this.loginForm.controls['email'].setValue(login_data.email);
          this.loginForm.controls['password'].setValue(login_data.password);
          this.onSubmit()
        }

      }
    } catch (error) {
      alert('Error while read data' + error);
    } finally {
    }
  }

}
