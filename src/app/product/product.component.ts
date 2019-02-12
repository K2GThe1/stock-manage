import { Component, OnInit } from '@angular/core';
import { Product } from '../model.class';
import { RestApiService } from 'src/services/rest-api.service';

export let sizePerPage = 5;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[];
  page = 0;
  pageInfos = {
    totalPage: 0
  };

  nextPage = true;
  constructor(private restApi: RestApiService) {
    this.restApi.getProducts(this.page, sizePerPage, this.pageInfos).then( datas => {
      this.products = datas;
      if (this.page < this.pageInfos.totalPage - 1) {
        this.nextPage = true;
      } else {
        this.nextPage = false;
      }
    });

  }

  previous() {
    this.page = this.page - 1;
    if (this.page < this.pageInfos.totalPage - 1) {
      this.restApi.getProducts(this.page, sizePerPage, this.pageInfos).then(
      result => {
        this.products = result;
        if (this.page < this.pageInfos.totalPage - 1) {
          this.nextPage = true;
        } else {
          this.nextPage = false;
        }
      }
    ).finally();
    }
  }

  next() {

    if (this.nextPage) {
      this.page = this.page + 1;

      this.restApi.getProducts(this.page, sizePerPage, this.pageInfos).then(
        result => {
          this.products = result;
          if (this.page < this.pageInfos.totalPage - 1) {
            this.nextPage = true;
          } else {
            this.nextPage = false;
          }
        }
      ).finally( () => {

      });
    }
  }

  ngOnInit() {

  }

  onDelete(user) {
    if (confirm(`on delete: ${user.name}?`)) {

      /*this.service.delete(user)
        .subscribe(response => {
          const index = this.resource.data.indexOf(user);
          this.resource.data.splice(index, 1);
        }); */

    }
  }

  onPageChange() {
     /* this.resource = this.service.getAll(2)
      .subscribe((data: any) => {
        this.resource = data;
        console.log(data);
      }, error => {}); */
  }

}
