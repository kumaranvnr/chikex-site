import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { HttpService } from 'src/app/services/http.service';
import { cartdata } from '../../cart/data';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})

/**
 * Account Profile Component
 */
export class AccountProfileComponent implements OnInit {

  NPasswordType!: boolean;
  CPasswordType!: boolean;
  public isCollapsed = true;

  AccountProfile!: UntypedFormGroup;
  notify: boolean = false;
  picture: string = '';
  name: string = '';
  email: string = '';

  constructor(private router: Router,
    private formBuilder: UntypedFormBuilder,
    private restService: HttpService) {
    this.AccountProfile = this.formBuilder.group({
      given_name: ['', [Validators.required]],
      family_name: ['', Validators.required],
      email: ['', [Validators.required]],
      mobile: ['', Validators.required],
      password: ['', [Validators.required]],
      cpassword: ['', Validators.required],
      picture: [''],
      notify_me: [this.notify, Validators.required],
    });

    let user_info = CookieStore.getUserInfo();
    this.picture = user_info.picture;
    this.name = user_info.name;
    this.email = user_info.email;
    this.loadAccountProfile();
  }

  ngOnInit(): void {

  }
  async loadAccountProfile(): Promise<void> {
    let save_respose = await this.restService.getUserInfo();
    if (save_respose.success) {
      this.AccountProfile.controls['given_name'].setValue(save_respose.data.given_name);
      this.AccountProfile.controls['family_name'].setValue(save_respose.data.family_name);
      this.AccountProfile.controls['email'].setValue(save_respose.data.email);
      this.AccountProfile.controls['mobile'].setValue(save_respose.data.mobile);
      this.AccountProfile.controls['password'].setValue(save_respose.data.password);
      this.AccountProfile.controls['cpassword'].setValue(save_respose.data.password);
      this.AccountProfile.controls['picture'].setValue(save_respose.data.picture);
      this.AccountProfile.controls['notify_me'].setValue(save_respose.data.notify_me);
      this.notify = save_respose.data.notify_me;
    }
  }

  toggleNewPassword() {
    this.NPasswordType = !this.NPasswordType;
  }


  toggleConfirmPassword() {
    this.CPasswordType = !this.CPasswordType;
  }


  async SignOut(): Promise<void> {
    console.log('SignOut');
    this.restService.UserSignOut()
  }

  async updateProfile() {
    try {
      const login_data = this.AccountProfile.value;
      if (!login_data.email) {
        alert('Please enter email'); return;
      }
      if (!login_data.password) {
        alert('Please enter password'); return;
      }
      if (!login_data.mobile) {
        alert('Please enter mobile'); return;
      }
      if (this.AccountProfile.valid) {
        login_data.sub = CookieStore.getUserInfo()?.sub;
        let save_respose = await this.restService.UserProfileUpdate(login_data);
        if (save_respose.success) {
          alert('successfully updated')
        }
      }
    } catch (error) {
      alert('Error while read data' + error);
    } finally {

    }
  }

  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      document.querySelectorAll('#user_profile').forEach((element: any) => {
        element.src = this.imageURL;
      });
    }
    reader.readAsDataURL(file)
  }

}
