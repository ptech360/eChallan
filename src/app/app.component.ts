import { Component, OnInit } from '@angular/core';
import { Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginComponent } from '../components/login/login';
import { User } from '../providers/user/user';
import * as KMSWIPE from 'cordova-plugin-k-mswipe';
declare const KMswipe: any;

declare let jQuery: any;
declare let window: any;
// declare let IdPayPrint: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public events: Events,
    public user: User,
    public alertCtrl: AlertController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need
      // user.getAppInfo().subscribe(
      //   (response: any) => {
      //     statusBar.styleDefault();
      //     splashScreen.hide();
      //     this.intializeApp();
      //   },
      //   (error: any) => {
      //     console.log(error);
      //     if (error.status == 401) {
      //       const alert = this.alertCtrl.create({
      //         title: 'Error',
      //         subTitle: error.error,
      //         buttons: ['OK']
      //       });

      //       alert.present();
      //       alert.onDidDismiss(() => {
      //         platform.exitApp();
      //       });
      //     }
      //   }
      // );

      this.intializeApp();

      // KMswipe.config({
      //     environment: KMSWIPE.GatewayEnvironment.LABS,
      //     network: KMSWIPE.NetworkSource.WIFI
      //   },
      //   success => {
      //     alert(JSON.stringify(success));
      //   },
      //   err => {
      //     alert(JSON.stringify(err));
      //   }
      // );
    });

    if (typeof jQuery == 'undefined' || !window.jQuery) {
      var scr = document.createElement('script');
      scr.src = 'https://mdm.digitsecure.com/plugin/Idpay/jquery.min.js';
      document.getElementsByTagName('head')[0].appendChild(scr);
    }
    var scr1 = document.createElement('script');
    scr1.src =
      'https://mdm.digitsecure.com/plugin/Idpay/IdPayInvokev1_0.js' +
      '?ts=' +
      new Date().getTime();
    document.getElementsByTagName('head')[0].appendChild(scr1);
    // scr.addEventListener('load', (event: any) => {
    //   scr1.addEventListener('load', (event: any) => {
    //     IdPayPrint('CA6HRAN6S8W1C5KZK7WRSO1I','6HY3YE1HEE7ZDM4J5GH2RCP2');
    //   });
    // });
  }

  intializeApp() {
    if (this.user.isLoggedIn()) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = LoginComponent;
    }
  }
}
