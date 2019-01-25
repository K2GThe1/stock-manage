import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  get(id) {
    return this.http.get(environment.apiUrl + `/api/users/${id}`);
  }

  getAll(page = 1) {
    return this.http.get(environment.apiUrl + `/api/users?page=${page}`)
  }

  create(user: any) {
    return this.http.post(environment.apiUrl + '/api/users', user);
  }
  
  update(user: any, id) {
    return this.http.put(environment.apiUrl + `/api/users/${id}`, user);
  }

  delete(user: any) {
    return this.http.delete(environment.apiUrl + `/api/users/${user.id}`);
  }
}
