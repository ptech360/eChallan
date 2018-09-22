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

  constructor(public loginCtrl:LoadingController, 
              private user: User,
              public nav: NavController,
              public alertCtrl: AlertController
            ) {

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
    this.user.login(this.loginCredentials).subscribe(allowed=>{
      if(allowed)
        this.nav.setRoot(TabsPage)
      else
        this.showError('Access Denied');
    }, error => {
      this.showError('Something went wrong');
    })
  }

  showError(err){
    this.loading.dismiss()
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: err,
      buttons: ['OK']
    })
    alert.present();
  }

  forget(){
    this.nav.push(NoRecordsComponent)
  }
}
