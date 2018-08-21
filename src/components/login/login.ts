import { Component } from '@angular/core';
import { Loading, LoadingController, NavController, AlertController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { TabsPage } from '../../pages/tabs/tabs';

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
  loginCredentials = {phone:'9876543210', password:'Abc@123'}

  constructor(public loginCtrl:LoadingController, 
              private auth: LoginProvider,
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
    this.auth.login(this.loginCredentials).subscribe(allowed=>{
      if(allowed)
        this.nav.setRoot(TabsPage)
      else
        this.showError('Access Denied')
    })
  }

  showError(err){
    this.loading.dismiss()
    let alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: err,
      buttons: ['OK']
    })
    alert.present();
  }
}
