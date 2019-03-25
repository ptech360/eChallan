import { Component, OnInit } from '@angular/core';
import { Platform, Events, AlertController, App, Alert } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as localForage from 'localforage';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginComponent } from '../components/login/login';
import { User } from '../providers/user/user';
import { Activity } from './app.activity';
import { NetworkProvider } from '../providers/network/network';
import { ToastService } from '../providers/toast/toast.service';
import { ViolentsProvider } from '../providers/violents/violents';
import { Api } from '../providers/api/api';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { StorageService } from '../providers/providers';
declare const KMswipe: any;

declare let jQuery: any;
declare let window: any;
// declare let IdPayPrint: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp extends Activity {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public appCtrl: App,
    public networkProvider: NetworkProvider,
    public toastProvider: ToastService,
    public events: Events,
    public user: User,
    public alertCtrl: AlertController,
    public violent: ViolentsProvider,
    public api: Api,
    public uid: Uid,
    public androidPermissions: AndroidPermissions,
    public localStorage: StorageService
  ) {
    super(platform,events, appCtrl, alertCtrl, user, networkProvider, toastProvider, violent, api, uid, androidPermissions, localStorage);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need
      // localForage.clear();
      debugger
      this.getImei().then((response)=>{
        if(response != undefined){
          this.localStorage.storeData('IMEI', response);
          user.getAppInfo().subscribe(
            (response: any) => {
              statusBar.styleDefault();
              splashScreen.hide();
              this.intializeApp();
            },
            (error: any) => {
              splashScreen.hide();
              if (error.status == 401) {
                platform.exitApp();
              } else if (error.status == 0) {
                localForage.getItem('ProjectLogo').then((value) => {
                  this.intializeApp();
                }).catch((err) => {
                  // platform.exitApp();
                });
              }
          });
        }
        
      })

      // this.intializeApp();

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

  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );

    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );

      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }

      const alert: Alert = this.alertCtrl.create({
        title: 'Yehh you have Permission to use this app.',
        message: 'You can access this app after restarting.',
        buttons: [{
          text: 'OK',
          handler: () => {
            // this.platform.exitApp();
            this.splashScreen.show();
            window.location.reload();
          }
        }]
  
      });
      alert.present();

      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }
    this.localStorage.storeData('IMEI', this.uid.IMEI);
    return this.uid.IMEI
  }

  intializeApp() {
    if (this.user.isLoggedIn()) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = LoginComponent;
    }
  }
}
