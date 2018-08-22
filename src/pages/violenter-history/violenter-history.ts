import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViolenterHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-violenter-history',
  templateUrl: 'violenter-history.html',
})
export class ViolenterHistoryPage {

  public violenter;
  
  constructor(public viewCtrl: ViewController, public navParams:NavParams) {
  }

  ionViewDidLoad() {
      this.violenter = this.navParams.get('data')
      
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
