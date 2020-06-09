import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FormsModule } from "@angular/forms";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule} from '@angular/common/http';
//import { FilterPipe } from './pipes/filter.pipe';

import { ApiService } from "../app/services/api.service";

import { NativeStorage } from '@ionic-native/native-storage/ngx';

//Views
import { ProductsListComponent } from "../app/Components/products/products-list/products-list.component";
import { ProductsFormComponent } from "../app/Components/products/products-form/products-form.component";

import { CategoryListComponent } from "../app/Components/category/category-list/category-list.component";
import { CategoryFormComponent } from "../app/Components/category/category-form/category-form.component";

import { WarehouseListComponent } from "../app/Components/warehouse/warehouse-list/warehouse-list.component";
import { WarehouseFormComponent } from "../app/Components/warehouse/warehouse-form/warehouse-form.component";

//Pagination
import {NgxPaginationModule} from 'ngx-pagination';

//Filters
import { FilterPipe } from '../app/pipes/filter.pipe';
import { FilterCategoryPipe } from '../app/pipes/category/filter.pipe';
import { FilterWarehousePipe } from "./pipes/warehouse/filter.pipe";

//import { ImagePicker } from '@ionic-native/image-picker';


@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent, 
    ProductsFormComponent,
    CategoryListComponent,
    CategoryFormComponent,
    WarehouseListComponent,
    WarehouseFormComponent,
    FilterPipe,
    FilterCategoryPipe,
    FilterWarehousePipe
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [
   // ImagePicker,
    StatusBar,
    SplashScreen,
    ApiService,
    NativeStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
