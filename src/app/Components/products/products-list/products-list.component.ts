import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

import { ApiService } from "../../../services/api.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {

  products: any = [];
  pageActual: number = 1;
  filterPost= '';

  constructor(
    private apiServices: ApiService,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController 
    ) { }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });
    await loading.present();
    this.apiServices.getList().subscribe(
      res => {
        console.log(res);
        this.products = res;
        loading.dismiss();
      }, 
      err => console.log(err)
    );
  }

  async deleteProduct(idArticulo: number){

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to <strong>delete this record?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.apiServices.deleteItem(idArticulo).subscribe(
              res => {
                console.log(res);
                this.getProducts();
              }, 
              err => console.log(err)
            );
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();

    



    }

}
