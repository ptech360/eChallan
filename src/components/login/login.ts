import { Component, OnInit } from '@angular/core';
import { Loading, LoadingController, NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { NoRecordsComponent } from '../no-records/no-records';
import { User } from '../../providers/user/user';
import * as localForage from "localforage";
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
export class LoginComponent implements OnInit{
  loading: Loading;
  text: string;
  loginCredentials = {Username:'sa', Password:'Demo@Pass', IMEI:'863907040011407'};
  appInfo: any = {};
  currentYear = new Date().getFullYear();

  constructor(public loginCtrl:LoadingController, 
              private user: User,
              public nav: NavController,
              public alertCtrl: AlertController) {              
  }

  ngOnInit(){
    this.user.getAppInfo().subscribe(response => {
      this.appInfo = response;
      localForage.setItem('ProjectLogo', response).then(function () {
        return localForage.getItem('ProjectLogo');
      }).then(function (value) {
        console.log(value);
        // we got our value
      }).catch(function (err) {
        console.log(err);
        // we got an error
      });
    }, error => {
      console.log("P")
      // if(error.status == 0){
      //   localForage.getItem('ProjectLogo').then(function (value) {
      //     console.log(value);
      //     // we got our value
      //   }).catch(function (err) {
      //     console.log(err);
      //     // we got an error
      //   });
      // }
    });
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
}
