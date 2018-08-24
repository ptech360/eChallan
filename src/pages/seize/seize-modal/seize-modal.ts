import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";

@Component({
    selector: 'page-seize',
    templateUrl: 'seize-modal.html',
  })
  export class SeizeModal {

    object:any;
    vehicleType:any;

    constructor(public navParams:NavParams,
                public viewCtrl:ViewController
    ){}

    ionViewDidLoad() {
        this.object = this.navParams.get('data')  
    }

    dismiss() {
        this.viewCtrl.dismiss();
      }
  
  }