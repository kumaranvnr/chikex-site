import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signmodal',
  templateUrl: './signmodal.component.html',
  styleUrls: ['./signmodal.component.scss']
})
export class SignmodalComponent implements OnInit {

  public isCollapsed = true;
  signinformData!: UntypedFormGroup;
  signupformData!: UntypedFormGroup;
  signupPassfield!: boolean;
  signupConfirmPassfield!: boolean;
  fieldTextType: any;
  submitted = false;
  signupsubmit = false;

  constructor(public formBuilder: UntypedFormBuilder, private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
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

  }

  /**
  * Close modal
  */
  closemodal() {
    // this.submitted = false;
    this.modalService.dismissAll();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType
  }


  /**
 * Password Hide/Show
 */
  togglesignupPassfield() {
    this.signupPassfield = !this.signupPassfield;
  }
  togglesignupConfirmPassfield() {
    this.signupConfirmPassfield = !this.signupConfirmPassfield;
  }


  /**
 * Returns form
 */
  get form() {
    return this.signinformData.controls;
  }

  /**
 * Returns signup form
 */
  get signupform() {
    return this.signupformData.controls;
  }

  /**
 * submit signin form
 */
  async signin() {

    try {
      const login_data = this.signinformData.value;
      if (!login_data.email) {
        Swal.fire({ text: 'Please enter user name', timer: 1500 }); return;
      }
      if (!login_data.password) {
        Swal.fire({ text: 'Please enter password', timer: 1500 }); return;
      }
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
