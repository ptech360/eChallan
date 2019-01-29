import { Component} from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { FeaturesProvider } from '../../providers/features/features';
import { StorageService } from '../../providers/localstorage/storage';
import { ToastService } from '../../providers/toast/toast.service';
declare let IdPayPrint: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  pages: any;

  constructor(public navCtrl: NavController,
              public features:FeaturesProvider, 
              public storage: StorageService,
              public alertCtrl: AlertController
  ) {
    this.pages = this.features.appFeatures;

  }

  open(feature:any){
      this.navCtrl.push(feature.component);
  }

  logout(){
    let alert = this.alertCtrl.create({
      title: 'Logout',
      subTitle: 'Are you sure you want to log out from the application ?',
      buttons: [
      {
        text: 'No',
        role: 'cancel'
      },
      {
        text: 'Yes',
        handler: () => {
          this.storage.clearData();
          this.storage.isToken.next(false);
          this.navCtrl.push('LoginComponent');
        }
      }]
    });
    alert.present();
  }

}