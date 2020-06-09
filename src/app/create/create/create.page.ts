import { Component, OnInit } from '@angular/core';
import { Products } from '../../models/products';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  data: Products;

  constructor(
    public apiService: ApiService,
    public router: Router
  ) {
    //this.data = new Products();
   }

  ngOnInit() {
  }

  submitForm(){
    this.apiService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['list']);
    });
  }

}
