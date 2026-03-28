import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { appInfo } from 'src/environments/environment.prod';
import { GoogleAuthService, GoogleUser } from 'src/app/services/google-auth.service';

@Component({
  selector: 'app-signmodal',
  templateUrl: './signmodal.component.html',
  styleUrls: ['./signmodal.component.scss']
})
export class SignmodalComponent implements OnInit {

  public isCollapsed = true;
  signinformData!: UntypedFormGroup;
  signupformData!: UntypedFormGroup;
  mobileOtpFormData!: UntypedFormGroup;
  signupPassfield!: boolean;
  signupConfirmPassfield!: boolean;
  fieldTextType: any;
  submitted = false;
  signupsubmit = false;

  isGoogleSigningIn = false;

  // Mobile OTP flow properties
  mobileOtpStep: 'mobile' | 'otp' = 'mobile';
  mobileSubmitted = false;
  otpSubmitted = false;
  otpSent = false;
  resendTimer = 0;
  resendInterval: any;
  enteredMobileNumber = '';

  // Loading states
  isSubmittingMobile = false;
  isVerifyingOtp = false;
  isResendingOtp = false;

  constructor(public formBuilder: UntypedFormBuilder, private modalService: NgbModal,
    private ngxService: NgxUiLoaderService, private googleAuthService: GoogleAuthService,
    private restService: HttpService, private router: Router) { }

  ngOnInit(): void {

    // Validation
    this.signinformData = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.signupformData = this.formBuilder.group({
      user_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.mobileOtpFormData = this.formBuilder.group({
      mobile: ['', [
        Validators.required,
        Validators.pattern(/^[5][0-9]{8}$/), // UAE mobile numbers start with 5 and are 9 digits total
        Validators.minLength(9),
        Validators.maxLength(9)
      ]],
      otp: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/), // Exactly 6 numeric digits
        Validators.minLength(6),
        Validators.maxLength(6)
      ]]
    });
    this.initializeGoogleSignIn();
  }
  formatMobileNumber(mobile: string): string {
    if (!mobile || mobile.length !== 9) return mobile;
    return `${mobile.substring(0, 2)} ${mobile.substring(2, 5)} ${mobile.substring(5)}`;
  }


  ngOnDestroy(): void {
    // Cleanup is handled by the service
  }


  private async initializeGoogleSignIn(): Promise<void> {
    try {
      await this.googleAuthService.initializeGoogleAuth();
    } catch (error) {
      console.error('Failed to initialize Google Sign-In:', error);
    }
  }

  async signInWithGoogle(): Promise<void> {
    if (this.isGoogleSigningIn) return;
    this.isGoogleSigningIn = true;
    try {
      const googleUser: any = await this.googleAuthService.signInWithGoogle();

      if (googleUser) {
        // const authResponse = await this.googleAuthService.authenticateWithBackend({
        //   provider: 'google',
        //   providerId: googleUser.id,
        //   email: googleUser.email,
        //   name: googleUser.name,
        //   picture: googleUser.picture,
        //   firstName: googleUser.given_name,
        //   lastName: googleUser.family_name
        // });

        this.ngxService.start();
        let login_data: any = {};

        login_data.main_role = 'user';
        login_data.user_name = googleUser.name;
        login_data.email = googleUser.email;
        login_data.name = googleUser.name;
        login_data.family_name = googleUser.family_name;
        login_data.given_name = googleUser.given_name;
        login_data.picture = googleUser.picture;
        login_data.source = 'Site';

        let save_respose = await this.restService.userRegisterSocial(login_data);
        if (save_respose.success) {
          this.closemodal();
          this.signupformData.reset();
          this.modalService.dismissAll();
          this.signupsubmit = true;

          const login_datails: any = {};
          login_datails.email = login_data.email;
          let login_response = await this.restService.userLogin(login_datails);

          if (login_response.success) {

            this.router.navigate(['/portal/handle/token'], {
              queryParams:
              {
                access_token: login_response.data[0].session[0].access_token
              }
            });
          } else {
            this.handleGoogleSignInError(login_response.error || 'Authentication failed');
          }
        }
      } else {
        this.handleGoogleSignInError('Google Sign-In failed');
      }
    } catch (error: any) {
      this.ngxService.stop();
      console.error('Google Sign-In error:', error);
      this.handleGoogleSignInError(error.message || 'Google Sign-In failed');
    } finally {
      this.ngxService.stop();
      this.isGoogleSigningIn = false;
    }
  }

  private handleGoogleSignInError(errorMessage: string): void {
    this.isGoogleSigningIn = false;
    console.error('Google Sign-In error:', errorMessage);
    this.showErrorMessage(errorMessage);
  }

  private showSuccessMessage(message: string): void {
    console.log('Success:', message);
  }

  private showErrorMessage(message: string): void {
    console.error('Error:', message);
  }

  closemodal() {
    // this.submitted = false;
    this.resetMobileOtpFlow();
    this.modalService.dismissAll();
  }

  resetMobileOtpFlow() {
    this.mobileOtpStep = 'mobile';
    this.mobileSubmitted = false;
    this.otpSubmitted = false;
    this.otpSent = false;
    this.enteredMobileNumber = '';
    this.isSubmittingMobile = false;
    this.isVerifyingOtp = false;
    this.isResendingOtp = false;
    this.clearResendTimer();
    this.mobileOtpFormData.reset();
  }

  clearResendTimer() {
    if (this.resendInterval) {
      clearInterval(this.resendInterval);
      this.resendInterval = null;
    }
    this.resendTimer = 0;
  }
  startResendTimer() {
    this.resendTimer = 30;
    this.resendInterval = setInterval(() => {
      this.resendTimer--;
      if (this.resendTimer <= 0) {
        this.clearResendTimer();
      }
    }, 1000);
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType
  }

  togglesignupPassfield() {
    this.signupPassfield = !this.signupPassfield;
  }
  togglesignupConfirmPassfield() {
    this.signupConfirmPassfield = !this.signupConfirmPassfield;
  }

  get form() {
    return this.signinformData.controls;
  }

  get signupform() {
    return this.signupformData.controls;
  }

  get mobileOtpForm() {
    return this.mobileOtpFormData.controls;
  }

  async submitMobileNumber() {
    this.mobileSubmitted = true;

    if (this.mobileOtpFormData.get('mobile')?.invalid) {
      return;
    }

    try {
      this.ngxService.start();
      const mobileNumber = this.mobileOtpFormData.get('mobile')?.value;
      this.enteredMobileNumber = mobileNumber;

      // Call API to send OTP
      const response = await this.restService.sendOtp({
        mobile: '971' + mobileNumber,
        country_id: appInfo.countryId
      });

      if (response.success) {
        this.mobileOtpStep = 'otp';
        this.otpSent = true;
        this.startResendTimer();
        Swal.fire({
          text: `OTP sent to ${mobileNumber}`,
          timer: 2000,
          icon: 'success'
        });
      } else {
        Swal.fire({
          text: response.message || 'Failed to send OTP. Please try again.',
          timer: 2000,
          icon: 'error'
        });
      }
    } catch (error) {
      Swal.fire({
        text: 'Failed to send OTP. Please try again.',
        timer: 2000,
        icon: 'error'
      });
    } finally {
      this.ngxService.stop();
    }
  }

  async verifyOtp() {
    this.otpSubmitted = true;

    if (this.mobileOtpFormData.get('otp')?.invalid) {
      return;
    }

    try {
      this.ngxService.start();
      const otpData = {
        mobile: '971' + this.enteredMobileNumber,
        otp: this.mobileOtpFormData.get('otp')?.value
      };

      // Call API to verify OTP
      const response = await this.restService.verifyOtp(otpData);

      if (response.success) {
        this.modalService.dismissAll();
        this.resetMobileOtpFlow();

        // Navigate to token handler with access token
        this.router.navigate(['/portal/handle/token'], {
          queryParams: {
            access_token: response.data[0].session[0].access_token
          }
        });
      } else {
        Swal.fire({
          text: response.message || 'Invalid OTP. Please try again.',
          timer: 2000,
          icon: 'error'
        });
      }
    } catch (error) {
      Swal.fire({
        text: 'Invalid OTP. Please try again.',
        timer: 2000,
        icon: 'error'
      });
    } finally {
      this.ngxService.stop();
    }
  }

  async resendOtp() {
    if (this.resendTimer > 0) {
      return;
    }

    try {
      this.ngxService.start();
      const response = await this.restService.sendOtp({
        mobile: '971' + this.enteredMobileNumber,
        country_id: appInfo.countryId
      });

      if (response.success) {
        this.startResendTimer();
        Swal.fire({
          text: 'OTP resent successfully',
          timer: 2000,
          icon: 'success'
        });
      } else {
        Swal.fire({
          text: 'Failed to resend OTP. Please try again.',
          timer: 2000,
          icon: 'error'
        });
      }
    } catch (error) {
      Swal.fire({
        text: 'Failed to resend OTP. Please try again.',
        timer: 2000,
        icon: 'error'
      });
    } finally {
      this.ngxService.stop();
    }
  }

  goBackToMobile() {
    this.mobileOtpStep = 'mobile';
    this.otpSubmitted = false;
    this.otpSent = false;
    this.clearResendTimer();
    this.mobileOtpFormData.get('otp')?.reset();
  }

  /**
 * submit signin form
 */
  async signin() {

    try {
      if (this.signinformData.valid) {

        const login_data = this.signinformData.value;
        if (!login_data.email) {
          Swal.fire({ text: 'Please enter user name', timer: 1500 }); return;
        }
        if (!login_data.password) {
          Swal.fire({ text: 'Please enter password', timer: 1500 }); return;
        }
        this.ngxService.start();
        let save_respose = await this.restService.userLogin(login_data);

        if (save_respose.success) {
          this.signupformData.reset();
          this.modalService.dismissAll();
          this.submitted = true;
          this.router.navigate(['/portal/handle/token'], {
            queryParams:
            {
              access_token: save_respose.data[0].session[0].access_token
            }
          });
        }
        else {
          Swal.fire({ text: 'Invalid user name or password', timer: 1500 });
        }
      }
    } catch (error) {
      Swal.fire({ text: 'Invalid user name or password', timer: 1500 });
      this.ngxService.stop();
    } finally {
      this.ngxService.stop();
    }

  }


  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * signup user
   *
   * checks if signup form is valid, then makes a POST request to /api/v1/users/register
   * with the form data. If the request is successful, it resets the signup form, dismisses
   * all modals, and navigates to /portal/handle/token with the access token as a query parameter
   * 
   * @returns {Promise<void>}
   */
  /*******  52d65556-abbd-4bb3-b5b8-950cfd8285cd  *******/
  async signup() {
    try {
      if (this.signupformData.valid) {

        const login_data = this.signupformData.value;
        if (!login_data.email) {
          Swal.fire({ text: 'Please enter user name', timer: 1500 }); return;
        }
        if (!login_data.password) {
          Swal.fire({ text: 'Please enter password', timer: 1500 }); return;
        }
        if (!login_data.user_name) {
          Swal.fire({ text: 'Please enter name', timer: 1500 }); return;
        }
        this.ngxService.start();
        login_data.main_role = 'user';
        login_data.source = 'Site';
        let save_respose = await this.restService.userRegister(login_data);

        if (save_respose.success) {
          this.signupformData.reset();
          this.modalService.dismissAll();
          this.signupsubmit = true;

          const login_datails: any = {};
          login_datails.email = login_data.email;
          login_datails.password = login_data.password;
          let login_response = await this.restService.userLogin(login_datails);

          if (login_response.success) {
            this.router.navigate(['/portal/handle/token'], {
              queryParams:
              {
                access_token: login_response.data[0].session[0].access_token
              }
            });
          }
        }
      }
    } catch (error) {
      alert('Error while read data' + error);
      this.ngxService.stop();
    } finally {
      this.ngxService.stop();
    }
  }

}
