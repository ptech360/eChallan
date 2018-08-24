import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
  }

  response(){
    const alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Challan submitted successfully, Printing...',
      buttons: ['OK']
    });
    alert.present();
  }

}
