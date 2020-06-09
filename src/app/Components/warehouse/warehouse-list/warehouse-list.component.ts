import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

import { WarehouseService } from "../../../services/warehouse.service";

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss'],
})
export class WarehouseListComponent implements OnInit {

  warehouse: any = [];
  pageActual: number = 1;
  filterPost= '';

  constructor(
    private categoryServices: WarehouseService,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController 
  ) { }

  ngOnInit() {
    this.getWarehouse();
  }

  async getWarehouse(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });
    await loading.present();
    this.categoryServices.getList().subscribe(
      res => {
        console.log(res);
        this.warehouse = res;
        loading.dismiss();
      }, 
      err => console.log(err)
    );
  }

  async deleteWarehouse(idwarehouse: number){

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
            this.categoryServices.deleteItem(idwarehouse).subscribe(
              res => {
                console.log(res);
                this.getWarehouse();
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
