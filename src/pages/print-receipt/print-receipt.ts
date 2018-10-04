import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Printer, PrintOptions } from '@ionic-native/printer';
/**
 * Generated class for the PrintReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-print-receipt',
  templateUrl: 'print-receipt.html',
})
export class PrintReceiptPage implements OnInit{
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

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private printer: Printer) {
  }

  ngOnInit(){

  }

  ionViewDidLoad() {
    this.printScriptObject = this.navParams.get('data');
    Object.keys(this.printScriptObject).forEach(key => {
      this.printData.push(key);
    });
    console.log('ionViewDidLoad PrintReceiptPage', this.printScriptObject);
  }

  private print(){
    this.printer.print(this.printContent.nativeElement, this.options).then((onSuccess)=>{
      this.dismiss();
      this.navCtrl.popToRoot();
    }, (onError) =>{
      alert(onError);
      this.navCtrl.popToRoot();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  

}
