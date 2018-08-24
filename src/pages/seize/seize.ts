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

  constructor(public navCtrl: NavController, public navParams: NavParams,
          public modalCtrl:ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeizePage');
  }

  seize(object){
    const modal = this.modalCtrl.create(SeizeModal,{ data : object });
    modal.present()
  }

}

