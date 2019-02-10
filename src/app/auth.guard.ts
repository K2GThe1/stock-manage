import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalStorageService } from 'src/services/localStorage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: LocalStorageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const accessToken = this.auth.getData('accessToken');


    if (accessToken) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }


}
