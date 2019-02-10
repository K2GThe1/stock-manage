
/**
 * liens utils
 * https://davidpine.net/blog/angular-http-gotchas/
 * https://www.academind.com/learn/javascript/rxjs-6-what-changed/
 * https://stackoverflow.com/questions/51905697/rsjx-map-operator-is-not-working-in-angular-6
 * https://stackoverflow.com/questions/50837367/angular-6-where-getting-error-module-rxjs-add-operator-map-and-another-error
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, last} from 'rxjs/operators';
import { Product, User } from 'src/app/model.class';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


/*

    "withCredentials" : "true",
    "Access-Control-Allow-Credentials": "true"
*/
export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept': 'application/json',
  })
};

const apiUrl = 'http://localhost:8081/';

// const apiUrl = 'http://localhost:3000/';
// const apiUrl="http://edjangui.com:3000";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private httpClient: HttpClient,
    private route: ActivatedRoute) {

   }

   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        'Backend returned code ' + error.status +
        ' body was: ' + error.error);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  /**
   * @param loginRequestData :any
   */
   public login(loginRequestData: { email: string, password: string} ): Observable<any> {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    return this.httpClient.post(apiUrl + 'sign-in/', loginRequestData, httpOptions);
   }

   /**
    *
   public login(user: { email: string, password: string}, onError) {

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // localStorage.setItem('token', 'Gael K');
    // this.router.navigateByUrl(returnUrl);

    this.httpClient.post(environment.apiUrl + 'sign-in/', user, httpOptions)
      .subscribe(response => {
        localStorage.setItem('token', response['token']);
        this.router.navigateByUrl(returnUrl);
      }, error => {
        console.log(' error:', error);
        if (error.status === 401) {
          onError('user not found');
        }
      });
   }*/

   /**
   * @param loginRequestData :any
   */
  public login_(loginRequestData) {

    this.httpClient.post(apiUrl + 'login/', loginRequestData, httpOptions)
           .subscribe(data => {
              console.log(data);
           }, (error) => {
              console.log(error);
           });
  }

  public addProduct(product: Product, onError): Promise<Product> {
    return this.httpClient.post(apiUrl + 'addProduct', product, httpOptions)
    .pipe( map( response => {
        const result = new Product(response);
        return result;
    }),
      catchError(this.handleError)
    ).toPromise();
  }

  public getProducts(): Promise<Product[]> {

    return this.httpClient
            .get(apiUrl + 'products/', httpOptions)
            .pipe(map (response => {
              const array = response as any[];
              const products = array.map(data => new Product(data));
              console.log('products: ', products);
              return products;
            }),
            catchError(this.handleError)
          ).toPromise();
  }

  getFiles(): Promise<String[]> {
    console.log(' getAllFiles: ');
    return this.httpClient
          .post(apiUrl + 'getAllFiles/', httpOptions)
          .pipe( map(response => {
              const array = response as string[];
              return array;
          }),
          catchError(this.handleError)
      ).toPromise();
  }

  pushFileToStorage(file: File): Observable<HttpEvent<any>> {
    const formdata: FormData = new FormData();
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    });
    formdata.append('file', file);

    const req = new HttpRequest('POST',
                    environment.apiUrl + 'newDocument/',
                    formdata, { 'headers': headers});

    /*
      HttpRequest(
        method: "POST" | "PUT" | "PATCH",
        url: string,
        body: FormData,
        init?: {
            headers?: HttpHeaders;
            reportProgress?: boolean;
            params?: HttpParams;
            responseType?: "arraybuffer" | "blob" | "json" | "text";
            withCredentials?: boolean;
        }): HttpRequest<FormData>
    */
    return this.httpClient.request(req).pipe(
      // map(event => this.getEventMessage(event, file)),
      // tap(message => this.showProgress(message)),
      last(), // return last (completed) message to caller
      catchError(this.handleError)
    );
  }

  /*getFiles(): Observable<any> {
    console.log(' getAllFiles: ');
    return this.http.get(environment.apiUrl + 'getAllFiles/', httpOptions).pipe(
      catchError(this.handleError)
    );
  }*/

  /** Return distinct message for sent, upload progress, & response events */
    private getEventMessage(event: HttpEvent<any>, file: File) {
      switch (event.type) {
        case HttpEventType.Sent:
          return 'Uploading file "${file.name}" of size ${file.size}.';

          case HttpEventType.UploadProgress:
          // Compute and show the % done:
          const percentDone = Math.round(100 * event.loaded / event.total);
          return `File "${file.name}" is ${percentDone}% uploaded.`;

        case HttpEventType.Response:
          return `File "${file.name}" was completely uploaded!`;

        default:
          return `File "${file.name}" surprising upload event: ${event.type}.`;
      }
  }

  public getUsers(): Promise<User[]> {

    return this.httpClient
            .get(apiUrl + 'users/', httpOptions)
            .pipe(map (response => {
              const array = response['content'] as any[];
              const products = array.map(data => new User(data));
              console.log('users: ', products);
              return products;
            }),
            catchError(this.handleError)
          ).toPromise();
  }

}
