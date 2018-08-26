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
    public currentViolents;
    public charge;
    public violenter;

    constructor(public navParams:NavParams,
                public viewCtrl:ViewController,
                public navCtrl:NavController
    ){}

    ionViewDidLoad() {
        this.object = this.navParams.get('data')  
        this.currentViolents = this.navParams.get('currentViolents')  
        this.charge = this.navParams.get('charge')  
        this.violenter = this.navParams.get('violenter') 
        console.log(this.currentViolents, this.charge,this.violenter)
    }

    dismiss() {
        this.viewCtrl.dismiss();
      }
      
      print(){
          this.navCtrl.push(ReceiptPage,{ data : this.object ,currentViolents: this.currentViolents, charge:this.charge, violenter: this.violenter} )
      }

  }