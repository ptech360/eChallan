import { Component } from '@angular/core';
import { Loading, LoadingController, NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { NoRecordsComponent } from '../no-records/no-records';
import { User } from '../../providers/user/user';

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {
  loading: Loading;
  text: string;
  loginCredentials = {Username:'sa', Password:'Demo@Pass', IMEI:'863907040011407'};
  appInfo: any = {};

  constructor(public loginCtrl:LoadingController, 
              private user: User,
              public nav: NavController,
              public alertCtrl: AlertController
            ) {
              this.getAppInfo();
  }

  showLoading(){
    this.loading =  this.loginCtrl.create({
      content:'checking...',
      dismissOnPageChange:true
    })
    this.loading.present()
  }

  login(){
    this.showLoading()
    this.user.login(this.loginCredentials).subscribe(response=>{
      if(response)
        this.nav.setRoot(TabsPage);
    }, error => {
      this.loading.dismiss();
    });
  }

  forget(){
    this.nav.push(NoRecordsComponent)
  }

  getAppInfo(){
    this.user.getAppInfo().subscribe(response => {
      this.appInfo = response;
    })
  }
}
