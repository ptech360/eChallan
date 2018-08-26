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
  
  object:any;
  public currentViolents;
  public charge;
  public violenter;
  public date = new Date()
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController
  ) {
    this.object = this.navParams.get('data')  
    this.currentViolents = this.navParams.get('currentViolents')  
    this.charge = this.navParams.get('charge')  
    this.violenter = this.navParams.get('violenter') 
    console.log(this.currentViolents, this.charge,this.violenter)
  }

  ionViewDidLoad() {

    
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
