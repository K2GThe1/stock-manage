import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestApiService } from 'src/services/rest-api.service';
import { LocalStorageService } from 'src/services/localStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string;

  public loginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private restApiService: RestApiService,
    private session: LocalStorageService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': '',
      'password': ''
    });
  }

  onSubmit() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    /*this.auth.login(this.loginForm.value, error => {
      this.error = error;
    });
    this.restApiService.login(this.loginForm.value, error => {
      this.error = error;
    });*/

    this.restApiService.login(this.loginForm.value).subscribe(
      (result) => {
        console.log('result:', result);
        let link = 'login';

        if (result['returnCode'] === 'successful login') {
          this.session.newUserSession('accessToken', 'Kjkh2GTheknkjbkjbkjbkjbk');
          this.session.setData('user', result['user']);
          link = 'products';
          this.router.navigateByUrl(returnUrl);
        }
        // this.router.navigate([link]);
      }, (error) => {
        console.log(error.message);
        this.error = error.message;
    });

  }

  fechar() {
    this.error = '';
  }
}
