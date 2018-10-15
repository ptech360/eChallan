import { Component, OnInit} from '@angular/core';
import { Platform, Events, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginComponent } from '../components/login/login';
import { User } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp{
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events:Events, public user: User, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need
      user.getAppInfo().subscribe((response:any) => {
        statusBar.styleDefault();
        splashScreen.hide();
        this.intializeApp();
      },(error:any) => {
        console.log(error);        
        if(error.status == 401){
          const alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: error.error,
            buttons: ['OK']
          });

          alert.present();
          alert.onDidDismiss(()=>{
            platform.exitApp();
          });
        }
      })
    });
  }
  
  intializeApp(){
    if(this.user.isLoggedIn()){
      this.rootPage = TabsPage;
    }else {
      this.rootPage = LoginComponent;
    }
  }
}
