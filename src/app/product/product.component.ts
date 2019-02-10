import { Component, OnInit } from '@angular/core';
import { Product } from '../model.class';
import { RestApiService } from 'src/services/rest-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[];
  constructor(private restApi: RestApiService) {
    this.restApi.getProducts().then( datas => {
      this.products = datas;
    });
  }

  ngOnInit() {
  }

}
