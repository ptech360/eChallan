import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, Navbar } from 'ionic-angular';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { PaymentGatewayPage } from '../payment-gateway/payment-gateway';
declare let require;
var parseString = require('xml2js').parseString;
/**
 * Generated class for the PrintReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare let IdPayPrint;
declare let $;

@IonicPage()
@Component({
  selector: 'page-print-receipt',
  templateUrl: 'print-receipt.html',
})
export class PrintReceiptPage implements OnInit{
  @ViewChild(Navbar) navBar: Navbar; // for overriding backbtn's default functionality
  @ViewChild('printContent') printContent;
  printScriptObject: any = {};
  printData: any = [];
  options: PrintOptions = {
    name: 'MyDocument',
    printerId: 'printer007',
    duplex: true,
    landscape: true,
    grayscale: true
  };
  currentViolations: any;

  constructor(public navCtrl: NavController, 
              public viewCtrl: ViewController, 
              public navParams: NavParams,
              public modalCtrl:ModalController, 
              private printer: Printer) {
  }

  ngOnInit(){

  }

  ionViewDidLoad() {
    this.overrideBackBtnFunctionality();
    this.printScriptObject = this.navParams.get('data');
    this.currentViolations = this.navParams.get('currentViolents');
    Object.keys(this.printScriptObject).forEach(key => {
      this.printData.push(key);
    });
    console.log('ionViewDidLoad PrintReceiptPage', this.printScriptObject);
  }

  private print(){
    // console.log($(this.printContent.nativeElement)[0].innerText);
    const response = IdPayPrint('',$(this.printContent.nativeElement)[0].innerText);
    let that = this;
    parseString(response, function(err, result){
      if(result && result.Response.ResponseCode[0]==='1000'){
        // that.dismiss();
        that.navCtrl.popToRoot();
      }else if(err){
        alert(err.Error.ErrorMessage[0]);
        that.navCtrl.popToRoot();
      }
    });

    
    // this.printer.print(this.printContent.nativeElement, this.options).then((onSuccess)=>{
    //   this.dismiss();
    //   this.navCtrl.popToRoot();
    // }, (onError) =>{
      // alert(onError);
      // this.navCtrl.popToRoot();
    // });
  }

  pay() {
    const violenterModal =  this.modalCtrl.create(PaymentGatewayPage, {data: this.printScriptObject, currentViolations: this.currentViolations});
      violenterModal.present();
      violenterModal.onDidDismiss(()=>{
        console.log(this.printScriptObject);
      });
  }

  done() {
    this.navCtrl.popToRoot();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  overrideBackBtnFunctionality() {

    /**overides the defult behaviour of navbar back btn
     * Show an alert stating: 'any filled data in form will be lost on going back'
     */
    this.navBar.backButtonClick = (ev: any) => {
      ev.preventDefault();
      ev.stopPropagation();
      this.navCtrl.popToRoot();
    }
  }
  

}
