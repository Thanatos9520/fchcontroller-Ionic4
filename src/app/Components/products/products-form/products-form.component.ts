import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products';

import { ActivatedRoute, Router } from "@angular/router";

import { AlertController, ToastController, LoadingController } from '@ionic/angular';

import { Photo } from "../../../models/photo";
import { PhotoService } from '../../../services/photo.service';

import { CategoryService } from "../../../services/category.service";
import { ApiService } from "../../../services/api.service";
import { WarehouseService } from "../../../services/warehouse.service";

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {

  public photos: Photo[] = [];

  categoryList: any = [];
  warehouseList: any = [];

  products: Products = {
    idarticulo: 0,
    idcategoria: 0,
    codigo: '',
    nombrecategoria: '',
    nombre: '',
    stock: 1,
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
    private apiServices: ApiService,
    private categoryServices: CategoryService,
    private warehouseServices: WarehouseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public photoService: PhotoService
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });
    await loading.present();
    this.getCategory();
    this.getWarehouse();
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    
    if (params.idarticulo){
      this.apiServices.getItem(params.idarticulo)
        .subscribe(
          res => {
            console.log(res[0])
            this.products = res[0];
            this.edit = true;
            loading.dismiss();
          },
          err => console.error(err)
        )
    }
    loading.dismiss();
  }

  async saveProduct(){
    delete this.products.created_at;
    delete this.products.idarticulo;
    delete this.products.nombrecategoria;
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });
    await loading.present();
    this.apiServices.createItem(this.products)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/products'])
          loading.dismiss();
          
        },
        err => console.error(err)
      ) 
  }

   getCategory(){
    this.categoryServices.getList().subscribe(
      res => {
        console.log(res);
        this.categoryList = res;
      }, 
      err => console.log(err)
    );
  }

  async getWarehouse(){ 
    this.warehouseServices.getList().subscribe(
      res => {
        console.log(res);
        this.warehouseList = res;
      }, 
      err => console.log(err)
    );
  }

  updateProduct(){
    delete this.products.created_at;
    delete this.products.nombrecategoria;
    this.apiServices.updateItem(this.products.idarticulo, this.products)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/products'])
          
        },
        err => console.error(err)
      )
  } 

}
