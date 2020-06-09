import { Component, OnInit, HostBinding } from '@angular/core';
import { Products } from "src/app/models/products";

import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  @HostBinding('class') clases = 'row';


  products: Products = {
    idarticulo: 0,
    idcategoria: 0,
    codigo: '',
    nombrecategoria: '',
    nombre: '',
    stock: 0,
    descripcion: '', 
    imagen: '',
    condicion: '',
    precio_costo: 0,
    precio_venta: 0,
    profit: 0,
    others: 0,
    idwarehouse: 0,
    created_at: new Date()
  };

  edit: boolean = false;


  constructor(
    private apiService: ApiService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
    ) { }


  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.idarticulo) {
      this.apiService.getItem(params.idarticulo)
        .subscribe(
          res => {
            console.log(res);
            this.products = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  saveNewProducts() {
    delete this.products.created_at;
    delete this.products.idarticulo;
    this.apiService.createItem(this.products)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/list']);
        },
        err => console.error(err)
      )
  }

  updateProducts() {
    delete this.products.created_at;
    this.apiService.updateItem(this.products.idarticulo, this.products)
      .subscribe(
        res => { 
          console.log(res);
          this.router.navigate(['/list']);
        },
        err => console.error(err)
      )
  }

}
