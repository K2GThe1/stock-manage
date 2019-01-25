import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  resource: any;
  page: any;

  constructor(private service: UsersService) {
    this.resource = {};
    this.page = 1;
    this.resource = service.getAll()
      .subscribe((data: any) => {
        this.resource = data;
        this.page = data.current_page;
      }, error => {

      });
   }

  ngOnInit() {
    
  }

  onDelete(user) {
    if (confirm(`Dejesa excluir o usuÃ¡rio: ${user.name}?`)) {
      
      this.service.delete(user)
        .subscribe(response => {
          const index = this.resource.data.indexOf(user);
          this.resource.data.splice(index, 1);
        });
      
    }
  }

  onPageChange() {
    this.resource = this.service.getAll(2)
      .subscribe((data: any) => {
        this.resource = data;
        console.log(data)
      }, error => {});
  }
}
