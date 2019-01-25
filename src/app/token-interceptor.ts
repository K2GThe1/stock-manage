import {tap} from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent
 } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        if (token) {
            request = request.clone({
                setHeaders: {
                   Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request).pipe(tap (event => {}, error => {
            if (error instanceof HttpErrorResponse) {

                if (error.status === 401) {
                    const auth = this.injector.get(AuthService);
                    auth.logout();
                }
            }
        }));
    }

}
