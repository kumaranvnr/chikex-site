import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieStore } from '../services/helpers/CookieStore';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    let is_valid_entry = true;
    if (!CookieStore.getBearerToken()) {
      is_valid_entry = false;
    }
    if (next.data && next.data['allowed_roles']) {
      const is_role_exists = CookieStore.isRoleExists(next.data['allowed_roles']);
      if (!is_role_exists) {
        is_valid_entry = false;
      }
    }

    if (is_valid_entry) {
      return true;
    } else {
      Swal.fire({
        title: 'Login',
        text: 'Please Login to view this page.<br> Thank you.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'rgb(243, 78, 78)',
        confirmButtonText: 'Login'
      }).then(result => {
        if (result.value) {

          this.router.navigate(['/account/signin']);
        }
      });
      return false;
    }
  }
}
