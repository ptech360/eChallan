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
    public documentName;
    public documentID;
    public vehicleName;
    public vehicleColor;
    public  vehicleNumber

    constructor(public navParams:NavParams,
                public viewCtrl:ViewController,
                public navCtrl:NavController
    ){}

    ionViewDidLoad() {
        this.object = this.navParams.get('data')  
        this.currentViolents = this.navParams.get('currentViolents')  
        this.charge = this.navParams.get('charge')  
        this.violenter = this.navParams.get('violenter') 
        
    }

    dismiss() {
        this.viewCtrl.dismiss();
      }
      
      print(){
          var seizeData;
          if(this.object == 'document'){
              seizeData = {
                  documentName : this.documentName,
                  documentID : this.documentID
              }
          }
          else if(this.object == 'vehicle'){
              seizeData = {
                  vehicleName : this.vehicleName,
                  vehicleColor: this.vehicleColor,
                  vehicleNumber: this.vehicleNumber,
                  vehicleType: this.vehicleType

              }
          }
          this.navCtrl.push(ReceiptPage,{ data : this.object ,currentViolents: this.currentViolents, charge:this.charge, violenter: this.violenter, seizeData: seizeData} )
      }

  }