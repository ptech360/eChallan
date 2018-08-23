import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AddViolationComponent } from '../../components/add-violation/add-violation';

/**
 * Generated class for the PaymentGatewayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-gateway',
  templateUrl: 'payment-gateway.html',
})
export class PaymentGatewayPage {

  public currenViolations;
  public charge;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl:AlertController
  ) {
    this.currenViolations = this.navParams.get('data')
    this.charge = this.navParams.get('charge')
    console.log(this.currenViolations)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentGatewayPage');
  }

  confirm(){
    let alert = this.alertCtrl.create({
      title: 'Payment Gateway',
      subTitle: 'App will be redirected to a gateway, Click Success for successfull trnansaction page or Error for unsuccessfull transaction',
      buttons: [
        {
          text: 'Error',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Success',
          handler: () => {
            this.navCtrl.popTo(AddViolationComponent)
          }
        }
      ]
    });
    alert.present();
  }
}
