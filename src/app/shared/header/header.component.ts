import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { SignmodalComponent } from '../signmodal/signmodal.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { cart_details, cartdata } from 'src/app/pages/cart/data';
import { SharedService } from 'src/app/services/shared.service';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  formData!: UntypedFormGroup;
  signupformData!: UntypedFormGroup;
  signupPassfield!: boolean;
  fieldTextType: any;
  submitted = false;
  signupsubmit = false;
  selectedLocation: any;
  carts: any = [] = [];
  total: any = 0;
  term: any;
  location_List: any;
  loginstatus: boolean = false;

  constructor(public formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    public translate: TranslateService,
    public router: Router,
    private restService: HttpService,
    private sharedService: SharedService) {
    translate.setDefaultLang('en');
    this.getLocationList();
    this.getCartDetails();
  }

  async getCartDetails(): Promise<any> {

    var sub = CookieStore.getUserInfo()?.sub;
    let cart_reponse = await this.restService.getCartDetails(sub);
    if (cart_reponse.data) {
      cart_details._id = cart_reponse.data._id;
      cart_details.sub = cart_reponse.data.sub;
      cart_details.total_price = cart_reponse.data.total_price;
      cartdata.splice(0);
      cart_reponse.data.cart_items.forEach((element: any) => {
        cartdata.push(element);
      });
    }
    this.carts = cartdata;

  }

  ngOnInit(): void {
    this.selectedLocation = 'UAE',

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

  openMapModal() {
    // this.modalService.open(AddressModalComponentComponent, { size: 'xl', centered: true });
  }


  async getLocationList(): Promise<any> {
    let response = await this.restService.getLocationList();
    if (response.data) {
      this.location_List = response.data.location_list;
    } else {
      console.log(response?.error);
    }
  }

  // calculate cart total
  calculatetotal(total: any) {
    this.total = 0
    this.carts.forEach((element: any) => {
      this.total += parseFloat(element.total_price)
    });
    return this.total.toFixed(2)
  }



  // set location
  ChangeLocation(location: any) {
    this.selectedLocation = location.loc_name;
  }

  checkSignInStatus() {
    this.openModal();
  }
  /**
  * Open modal
  */
  openModal() {
    // this.submitted = false;
    this.modalService.open(SignmodalComponent, { size: 'md', centered: true });
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

  // remove from cart
  async removecart(product: any) {
    this.carts.splice(product, 1);
    const index = this.carts.findIndex((cart: any) => cart.product_id == product.product_id);
    if (index !== -1) {
      this.carts.splice(index, 1);
    }
    let remove_obj: any = {
      sub: product.sub,
      product_id: product.product_id
    };
    await this.restService.removeCartItems(remove_obj);
  }
}
