import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SeizeModal } from './seize-modal/seize-modal';

/**
 * Generated class for the SeizePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seize',
  templateUrl: 'seize.html',
})
export class SeizePage {

  public currentViolents;
  public charge;
  public violenter;

  constructor(public navCtrl: NavController, public navParams: NavParams,
          public modalCtrl:ModalController
  ) {

  }

  ionViewDidLoad() {   
    this.currentViolents = this.navParams.get('data')
  this.charge = this.navParams.get('charge')
  this.violenter = this.navParams.get('violenter')
  console.log(this.currentViolents,this.charge,this.violenter)
  }

  seize(object){
    const modal = this.modalCtrl.create(SeizeModal,{ data : object ,currentViolents: this.currentViolents, charge:this.charge, violenter: this.violenter});
    modal.present()
  }

}

