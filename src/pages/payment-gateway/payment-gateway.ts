import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Loading, LoadingController } from 'ionic-angular';
import { AddViolationComponent } from '../../components/add-violation/add-violation';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ViolentsProvider } from '../../providers/violents/violents';
import { PrintReceiptPage } from '../print-receipt/print-receipt';

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
export class PaymentGatewayPage implements OnInit{

  public currenViolations;
  public charge;
  public violenter;
  public challanForm:FormGroup
  violationIds: any = [];
  loading: Loading;
  violations: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl:AlertController, public fb:FormBuilder,
              public violent:ViolentsProvider,
              public modalCtrl:ModalController,
              public generateCtrl:LoadingController
  ) {
    this.currenViolations = this.navParams.get('data')
    this.charge = this.navParams.get('charge')
    this.violenter = this.navParams.get('violenter')
  }

  ngOnInit(){
    this.challanForm = this.getChallanForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentGatewayPage');
    console.log(this.currenViolations);
    console.log(this.charge);
    console.log(this.violenter);
  }

  confirm(){
    let alert = this.alertCtrl.create({
      title: 'Payment Gateway',
      subTitle: 'App will be redirected to a gateway, Click Success for successfull trnansaction page or Error for unsuccessfull transaction',
      buttons: [
        {
          text: 'Error',
          role: 'cancel',
          handler: () => {
            this.violent
            this.navCtrl.popTo(AddViolationComponent)
          }
        },
        {
          text: 'Success',
          handler: () => {
            this.showLoading();
            this.violent.generateChallan(this.challanForm.value).subscribe((response: any) => {
              this.loading.dismiss();
              this.challanForm.value['challanId'] = response.challanId;
              this.challanForm.value['amount'] = this.charge;
              this.challanForm.value['violations'] = this.violations;
              this.challanForm.value['vehicleNo'] = this.violenter.vehicleNo;
              const violenterModal =  this.modalCtrl.create(PrintReceiptPage, {data: this.challanForm.value});
              violenterModal.present();
              this.navCtrl.popToRoot();
            })
          }
        }
      ]
    });
    alert.present();
  }

  getChallanForm(){
    this.currenViolations.forEach(element => {
      this.violationIds.push(element.offenceId);
      this.violations.push(element.offenceName);
    });
    return this.fb.group({
      "REGISTRATIONNO": [this.violenter.registrationno],
      "OWNERNAME": [this.violenter.ownername],
      "FATHERNAME": [this.violenter.fathername],
      "PERMANENTADDRESS": [this.violenter.permanentaddress],
      "CHASSISNO": [this.violenter.chassisno],
      "ENGNO": ["TEST"],
      "BODYTYPE": [this.violenter.bodytype],
      "MAKERMODEL": [this.violenter.makermodel],
      "ViolationId": [this.violationIds.toString()],
      "DlNo": ["TEST"],
      "UserName": ["sa"],
      "LocationName": ["GURGAON"],
      "MOBILENUMBER": [this.violenter.mobilenumber],
      "COLOUR": [ this.violenter.colour],
      "PaymentTypeName": ["Net-Banking"],
      "PaymentId": ["TXN101043252612212383"] 
    });
  }

  showLoading(){
    this.loading =  this.generateCtrl.create({
      content:'processing...',
      dismissOnPageChange:true
    })
    this.loading.present()
  }
}
