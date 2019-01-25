import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as localForage from 'localforage';
/**
 * Generated class for the UnuploadedChallanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unuploaded-challan',
  templateUrl: 'unuploaded-challan.html',
})
export class UnuploadedChallanPage {
  challans: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnuploadedChallanPage');
    localForage.getItem('VehicleChallan').then((challans: any[]) => {
      if(challans){
        this.challans = challans;
      }
    })
  }

}
