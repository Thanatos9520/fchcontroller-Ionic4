import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

import { CategoryService } from "../../../services/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {

  category: any = [];
  pageActual: number = 1;
  filterPost= '';

  constructor(
    private categoryServices: CategoryService,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getCategory();
  }

  async getCategory(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });
    await loading.present();
    this.categoryServices.getList().subscribe(
      res => {
        console.log(res);
        this.category = res;
        loading.dismiss();
      }, 
      err => console.log(err)
    );
  }

  async deleteCategory(idcategoria: number){

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
            this.categoryServices.deleteItem(idcategoria).subscribe(
              res => {
                console.log(res);
                this.getCategory();
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
