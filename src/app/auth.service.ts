import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
  private isLoggedIn = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {

    }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  /*login(user: { email: string, password: string}, onError) {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.http.post(environment.apiUrl + '/api/auth', user)
      .subscribe(response => {
        localStorage.setItem('token', response['token']);
        this.router.navigateByUrl(returnUrl);
      }, error => {
        if (error.status === 401) {
          onError('Usuário ou senha incorretos')
        }
      });

  }*/

  login(user: { email: string, password: string}, onError) {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    localStorage.setItem('token', 'Gael K');
    this.router.navigateByUrl(returnUrl);

    /*this.http.post(environment.apiUrl + '/api/auth', user)
      .subscribe(response => {
        localStorage.setItem('token', response['token']);
        this.router.navigateByUrl(returnUrl);
      }, error => {
        if (error.status === 401) {
          onError('user not found')
        }
      });*/

  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
