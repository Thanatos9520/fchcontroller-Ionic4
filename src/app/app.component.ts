import { Component} from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
//import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/Home',
      icon: 'home'
    },
    {
      title: 'Products',
      url: '/products',
      icon: 'list'
    },
    {
      title: 'Category',
      url: '/category',
      icon: 'cube'
    },
    {
      title: 'Warehouse',
      url: '/warehouse',
      icon: 'home'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

    // When Logout Button is pressed 
    logout() {
      this.authService.logout().subscribe(
        data => {
          this.alertService.presentToast(data['message']);        
        },
        error => {
          console.log(error);
        },
        () => {
          this.navCtrl.navigateRoot('/landing');
        }
      );
    }

}
