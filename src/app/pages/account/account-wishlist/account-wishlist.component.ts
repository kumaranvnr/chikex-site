import { Component, OnInit } from '@angular/core';

// Sweet Alert
import Swal from 'sweetalert2';

// Data Get
import { wishlistData } from './data';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { Router } from '@angular/router';
import { cartdata } from '../../cart/data';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-account-wishlist',
  templateUrl: './account-wishlist.component.html',
  styleUrls: ['./account-wishlist.component.scss']
})

/**
 * Account Wishlist Component
 */
export class AccountWishlistComponent implements OnInit {

  wishlistDatas: any;
  public isCollapsed = true;
  picture: string = '';
  name: string = '';
  email: string = '';
  constructor(private router: Router,
    private restService: HttpService) {
    this.wishlistDatas = wishlistData;
    let user_info = CookieStore.getUserInfo();
    this.picture = user_info.picture;
    this.name = user_info.name;
    this.email = user_info.email;
  }

  ngOnInit(): void {
  }
  SignOut() {
    this.restService.UserSignOut()
  }
  // Remove Data
  removeData(e: any) {
    Swal.fire({
      title: 'Are you Sure ?',
      text: 'Are you Sure You want to Remove this Product ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', confirmButtonColor: '#364574', icon: 'success', });
        e.target.closest('.border-bottom').remove();
      }
    });
  }

}
