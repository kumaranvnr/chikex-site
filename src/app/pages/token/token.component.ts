import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieStore } from 'src/app/services/helpers/CookieStore';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  access_token: string = "";
  error: string = "";
  error_description: string = "";
  constructor(private router: Router, private route: ActivatedRoute, private restService: HttpService) {
    CookieStore.clearBearerToken();
    this.route.queryParams.subscribe(params => {
      this.access_token = params['access_token'];
      this.error = params['error'];
      this.error_description = params['error_description'];
    });
  }

  ngOnInit(): void {
    (async () => {
      if (this.access_token) {
        CookieStore.saveAccessToken(this.access_token)
        const userinfo_response = await this.restService.getUserInfo();
        if (userinfo_response.success) {
          CookieStore.saveUserInfo(userinfo_response.data);
          if (CookieStore.isRoleExists(["user"])) {
            this.router.navigate(["/"])
          }
        } else {
          const login_url = this.restService.getLoginUrl();
          location.href = login_url;
        }
      } else {
        const login_url = this.restService.getLoginUrl();
        location.href = login_url;
      }
    })()
  }

}
