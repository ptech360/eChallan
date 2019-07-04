import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ViewController
} from "ionic-angular";
import { SeizeModal } from "./seize-modal/seize-modal";

/**
 * Generated class for the SeizePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-seize",
  templateUrl: "seize.html"
})
export class SeizePage {
  public currentViolents;
  public charge;
  public violenter;
  challanObject: any;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) { }

  ionViewDidLoad() {
    this.challanObject = this.navParams.get("data");
  }

  seize(object) {
    const modal = this.modalCtrl.create(SeizeModal, {
      data: object,
      challanObject: this.challanObject
    });
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
