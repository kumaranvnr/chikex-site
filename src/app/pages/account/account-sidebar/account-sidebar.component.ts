import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { cartdata } from '../../cart/data';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrls: ['./account-sidebar.component.scss']
})
export class AccountSidebarComponent {
  name: string = '';
  email: string = '';
  picture: string = '';
  public isCollapsed = true;
  constructor(private router: Router,
    private restService: HttpService) {
  }
  ngOnInit(): void {
    let user_data = CookieStore.getUserInfo();
    this.name = user_data.name;
    this.picture = user_data.picture;
    this.email = user_data.email;
  }

  SignOut() {
    console.log('SignOut');
    this.restService.UserSignOut()
  }
}
