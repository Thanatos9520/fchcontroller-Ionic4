import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ActivatedRoute, Router } from "@angular/router";

import { CategoryService } from "../../../services/category.service";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {

  category: Category = {
    idcategoria: 0,
    nombrecategoria: '',
    descripcion: '',
    condicion: 1 
  };

  edit: boolean = false;
  constructor(
    private categoryServices: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params.idcategoria){
      this.categoryServices.getItem(params.idcategoria)
        .subscribe(
          res => {
            console.log(res[0])
            this.category = res[0];
            this.edit = true;
          },
          err => console.error(err)
        )
    }
  }

  saveCategory(){
    delete this.category.idcategoria;
    this.categoryServices.createItem(this.category)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/category'])
        },
        err => console.error(err)
      )
  }

  updateCategory(){
    this.categoryServices.updateItem(this.category.idcategoria, this.category)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/category'])
        },
        err => console.error(err)
      )
  }

}
