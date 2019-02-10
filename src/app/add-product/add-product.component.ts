import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/services/rest-api.service';
import { Product } from '../model.class';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  error: string;
  addPdtForm: FormGroup;
  constructor(private restApi: RestApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.addPdtForm = this.fb.group({
      'name': '',
      'entryPrice': 0,
      'sellPrice': 0
    });
  }

  addProduct() {
    const product = new Product(this.addPdtForm);
    product.date = new Date();

    this.restApi.addProduct(product, onerror).then( response => {
      console.log('addproduct: ', response);
    });
  }

}
