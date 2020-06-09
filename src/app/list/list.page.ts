import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../services/api.service';

import { Products } from "../models/products";

import { AlertController, ToastController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class ListPage implements OnInit {
pageActual: number = 1;
productsData: any;
filterPost= '';


//public columns: any;

//product: Products[] = [];

   constructor(
     public apiService : ApiService,
     private toastCtrl: ToastController,
     private loadingCtrl: LoadingController 
   ) {
    this.productsData = [];
    /* this.columns = [
      { name: 'imagen' },
      { name: 'Codigo' },
      { name: 'nombre' },
      { name: 'Categoria' },
      { name: 'Stock' },
      { name: 'Actions' },
    ]; */
    
  }
  async ngOnInit() {
    this.getAllProducts();
   
  }

  async getAllProducts(){
    //get saved list of products
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });
    await loading.present();
     this.apiService.getList().subscribe(response => {
      console.log(response);
      this.productsData = response;
       loading.dismiss();
    });   
  }

  delete(item) {
    //Delete item in Products data
    this.apiService.deleteItem(item.idarticulo).subscribe(Response => {
      //update list after delete id successfull
      this.getAllProducts();
    });
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
      duration: 2000
    });
    await loading.present();
    return loading;
  }

}
