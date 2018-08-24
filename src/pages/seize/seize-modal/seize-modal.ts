import { Component } from "@angular/core";
import { NavParams, ViewController, NavController } from "ionic-angular";
import { ReceiptPage } from "../../receipt/receipt";

@Component({
    selector: 'page-seize',
    templateUrl: 'seize-modal.html',
  })
  export class SeizeModal {

    object:any;
    vehicleType:any;

    constructor(public navParams:NavParams,
                public viewCtrl:ViewController,
                public navCtrl:NavController
    ){}

    ionViewDidLoad() {
        this.object = this.navParams.get('data')  
    }

    dismiss() {
        this.viewCtrl.dismiss();
      }
      
      print(){
          this.navCtrl.push(ReceiptPage)
      }

  }