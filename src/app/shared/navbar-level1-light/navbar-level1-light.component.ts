import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar-level1-light',
  templateUrl: './navbar-level1-light.component.html',
  styleUrls: ['./navbar-level1-light.component.scss']
})
export class NavbarLevel1LightComponent implements OnInit {

  loginPassfield!: boolean;
  
  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  
  //  Signup form
  signupPassfield!: boolean;
  signupCPassfield!: boolean;
  SignupForm!: UntypedFormGroup;
  submit = false;
  public isCollapsed = true;

  constructor(private modalService: NgbModal, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
     this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    /**
     * Form Validatyion
     */
     this.SignupForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', Validators.required],
    });
    
  }

  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.querySelector('.navbar-sticky');
    if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
      navbar?.classList.add('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.add('show');
    }
    else {
      navbar?.classList.remove('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.remove('show');
    }
  }

  /**
   * Open scroll modal
   * @param toggleDataModal scroll modal data
   */
   toggleModal(staticDataModal: any) {
    this.modalService.open(staticDataModal, { size: 'md', centered: true });
  }

  //------------------ Sign In Form ---------------------//
   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

   /**
    * Form submit
    */
    onSubmit() {
     this.submitted = true;
 
     // stop here if form is invalid
     if (this.loginForm.invalid) {
       return;
     }
   }

  /**
   * Password Hide/Show
   */
   toggleLoginPassField() {
    this.loginPassfield = !this.loginPassfield;
  }

  //------------------ Sign Up Form ---------------------//

   // convenience getter for easy access to form fields
   get fa() { return this.SignupForm.controls; }

   /**
    * Form submit
    */
    SignupSubmit() {
     this.submit = true;
 
     // stop here if form is invalid
     if (this.SignupForm.invalid) {
       return;
     }
   }

    /**
   * Password Hide/Show
   */
     togglesignupPassfield() {
      this.signupPassfield = !this.signupPassfield;
    }

    /**
    * Password Hide/Show
    */
    togglesignupCPassfield() {
      this.signupCPassfield = !this.signupCPassfield;
    }

  // Sidebar Toggle
  sidebar(){
    document.getElementById('shop-sidebar')?.classList.add('show');
  }


}
