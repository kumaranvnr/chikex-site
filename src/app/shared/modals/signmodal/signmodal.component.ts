import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
      if (this.signinformData.valid) {
        this.ngxService.start();
        const login_data = this.signinformData.value;
        if (!login_data.email) {
          alert('Please enter user name'); return;
        }
        if (!login_data.password) {
          alert('Please enter password'); return;
        }
        let save_respose = await this.restService.userLogin(login_data);
        this.ngxService.stop();
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
      }
    } catch (error) {
      alert('Error while read data' + error);
    } finally {
    }

  }


  async signup() {
    try {
      if (this.signupformData.valid) {
        this.ngxService.start();
        const login_data = this.signupformData.value;
        if (!login_data.email) {
          alert('Please enter user name'); return;
        }
        if (!login_data.password) {
          alert('Please enter password'); return;
        }
        if (!login_data.user_name) {
          alert('Please enter name'); return;
        }
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
          this.ngxService.stop();
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
    } finally {
    }
  }
}
