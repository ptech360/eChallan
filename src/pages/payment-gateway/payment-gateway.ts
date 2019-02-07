import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Loading, LoadingController, ViewController, Events, Alert } from 'ionic-angular';
import { AddViolationComponent } from '../../components/add-violation/add-violation';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ViolentsProvider } from '../../providers/violents/violents';
import { PrintReceiptPage } from '../print-receipt/print-receipt';
import * as localForage from 'localforage';
import { ToastService } from '../../providers/toast/toast.service';
import { SeizePage } from '../seize/seize';
import { NetworkProvider } from '../../providers/network/network';
declare const KMswipe: any;

declare let require;
var parseString = require('xml2js').parseString;

declare let IdProcessPay;
declare let $;
/**
 * Generated class for the PaymentGatewayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-gateway',
  templateUrl: 'payment-gateway.html',
})
export class PaymentGatewayPage implements OnInit {

  currenViolations;
  charge;
  paymentTypeName: any;
  generatedObject: any;
  online: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public violent: ViolentsProvider,
    public toastService: ToastService,
    public modalCtrl: ModalController,
    public events: Events,
    public network: NetworkProvider
  ) {
    
    this.currenViolations = this.navParams.get('currentViolations')
    this.generatedObject = this.navParams.get('data');
    this.charge = this.generatedObject.amount;
  }

  ngOnInit() {
    this.events.subscribe("online", () => {
      console.log("online")
      this.online = true;
    });
    this.events.subscribe("offline", () => {
      console.log("offline")
      this.online = false;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentGatewayPage');
    console.log('payment', this.navParams.get('data'));
    console.log('currentViolations', this.navParams.get('currentViolations'));
  }

  confirm() {
    var Amount = this.charge;
    var trackid = new Date().getTime();
    var merchantId = '800081';
    var sharedKey = '36PVB8S8CIC2KPXEIL4JBX7U';
    var sUrl = '';
    var email = 'kharetwal.pankaj111@gmail.com';
    var mobile = this.generatedObject.MobileNumber;
    var vehicleNo = this.generatedObject.VehicleNo;
    var ownerName = this.generatedObject.OwnerName;
    var challanId = this.generatedObject.ChallanId;
    var reqpaymentMode = 'None';
    var reqnoOfPayments = '1';
    var paymentData = Array(Amount + '|0.00|' + trackid + '|12|' + '|' + vehicleNo + '|' + '|' + ownerName + '|' + mobile);
    var nachData = challanId + '|Savings|Monthly|' + (new Date().getMonth() + 1) + '|' + this.generatedObject.ChallanDate;
    if(this.online){
      var payResp = IdProcessPay(merchantId, sharedKey, Amount, sUrl, email, mobile, reqpaymentMode, reqnoOfPayments, paymentData, nachData);
      parseString(payResp, (err: any, result: any) => {
        console.log(result);
        if (result.Response && result.Response.RespCode[0] === '1000') {
          const paymentObject = {
            'ChallanId': this.generatedObject.ChallanId,
            'PaymentId': result.Response.Payments[0].Payment1[0].TnxId[0],
            'PaymentTypeName': result.Response.Payments[0].Payment1[0].PaymentType[0],
            // 'PaymentDate': result.Response.Payments[0].Payment1[0].Date[0]
            'PaymentDate': this.generatedObject.ChallanDate
          };
          this.toastService.showLoader('Saving Payment info..');
          this.violent.challanPayment(paymentObject).subscribe(response => {
            this.toastService.hideLoader();
            this.toastService.showToast('Payment Done');
            this.generatedObject['PaymentId'] = paymentObject.PaymentId;
            this.generatedObject.PaymentStatus =''; 
            this.generatedObject.VehicleSeizeStatus=''; 
            this.generatedObject.DocsSeizeStatus ='';
            this.dismiss();
          }, error => {
            this.toastService.showToast('Error in Saving Payment Info');
            this.toastService.hideLoader();
          });
        } else if (result.Error) {
          this.toastService.showToast(result.Error.ErrorMessage[0]);
        }
      });  
    } else {
      const alert: Alert = this.alertCtrl.create({
        title: 'You don\'t seem to have an active internet connection.',
        message: 'You have to get Cash.',
        buttons: [{
          text: 'OK',
          handler: () => {
            localForage.getItem('VehicleChallan').then((challans: any[]) => {
              if(challans&&challans.length){
                const index = challans.findIndex(challan => challan.ChallanDate == this.generatedObject.ChallanDate);
                // challans[index].PaymentStatus = "";
                const paymentObject = {
                  'ChallanId': null,
                  'PaymentId': 'CASH' + Math.floor(Math.random() *10000),
                  'PaymentTypeName': "Cash",
                  // 'PaymentDate': result.Response.Payments[0].Payment1[0].Date[0]
                  'PaymentDate': this.generatedObject.ChallanDate
                };
                localForage.getItem('ChallanPayment').then((value: any[]) => {
                  if(value){
                    value.push(paymentObject);
                    localForage.setItem('ChallanPayment', value).then(() => {
                      return localForage.getItem('ChallanPayment');
                    });
                  }else {
                    localForage.setItem('ChallanPayment', [paymentObject]).then(() => {
                      return localForage.getItem('ChallanPayment');
                    });
                  }
                }).then(response => {
                  this.toastService.showToast("Data saved offline.");
                });
                localForage.removeItem('VehicleChallan');
                localForage.setItem('VehicleChallan',challans);
              }
            }).then(response => {
              this.toastService.showToast("Data saved offline.");
              this.generatedObject.PaymentStatus =''; 
              this.generatedObject.VehicleSeizeStatus=''; 
              this.generatedObject.DocsSeizeStatus ='';
              this.dismiss();
            });          
          }
        }]
  
      });
      alert.present();
    }
  }



  seize() {
    // this.navCtrl.push(SeizePage, {'data': this.generatedObject});
    const modal = this.modalCtrl.create(SeizePage, { 'data': this.generatedObject });
    modal.present()
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
