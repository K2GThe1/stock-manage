import { Injectable, Inject } from '@angular/core';
import {LOCAL_STORAGE, SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Product } from '../app/model.class';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

    constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) {}
    accessTokenState = false;

    infos = {
      'name': 'Gael K.',
      'email': 'gael.kamga@gmail.com',
      'phone': '56790123'
    };

    products: Product[] = [];

    public addComment(c) {
      c.date = new Date();
      this.products.push(c);
    }

    public addProduct(c) {
      c.date = new Date();
      this.products.push(c);
    }

    public getAllProducts() {
      return this.products;
    }

    public getInfos() {
      return this.infos;
    }

    public getData(key) {
      return this.storage.get(key);
    }

    public setData(key, value) {
      this.storage.set(key, value);
    }

    public newUserSession(accessTokenKey: string, accessToken: string) {
      this.setData(accessTokenKey, accessToken);
      this.accessTokenState = true;
    }

    public clearSession(accessTokenKey: string) {
      this.storage.remove(accessTokenKey);
      this.accessTokenState = false;
    }
}
