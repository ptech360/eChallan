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
  files: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl:AlertController, public fb:FormBuilder,
              public violent:ViolentsProvider,
              public modalCtrl:ModalController,
              public generateCtrl:LoadingController
  ) {
    this.currenViolations = this.navParams.get('data')
    this.charge = this.navParams.get('charge')
    this.violenter = this.navParams.get('violenter')
    this.files = this.navParams.get('files');
  }

  ngOnInit(){
    this.challanForm = this.getChallanForm();
    this.challanForm.patchValue(this.violenter);
    this.challanForm.controls['VehicleNo'].patchValue(this.violenter.VehicleNo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentGatewayPage');
    console.log(this.currenViolations);
    console.log(this.charge);
    console.log(this.violenter);
    console.log(this.files);
    
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
            const formData = new FormData();
            Object.keys(this.challanForm.value).forEach(element => {
              formData.append(element,this.challanForm.value[element]);
            });
            this.files.forEach((file:any) => {
              formData.append('file',file);
            });
            formData.append('VehicleImageFile','abstreg');
            this.violent.generateChallan(formData).subscribe((response: any) => {
              this.loading.dismiss();
              this.challanForm.value['ChallanId'] = response.ChallanId;
              this.challanForm.value['ChallanDate'] = new Date();
              this.challanForm.value['amount'] = this.charge;
              this.challanForm.value['violations'] = this.violations;
              this.challanForm.value['VehicleNo'] = this.violenter.VehicleNo;
              this.challanForm.value['VehicleClass'] = this.violenter.VehicleClass;
              const violenterModal =  this.modalCtrl.create(PrintReceiptPage, {data: this.challanForm.value});
              violenterModal.present();
              this.navCtrl.popToRoot();
            },(error: any) => {
              this.loading.dismiss();
            })
          }
        }
      ]
    });
    alert.present();
  }

  getChallanForm(){
    this.currenViolations.forEach(element => {
      this.violationIds.push(element.ViolationId);
      this.violations.push(element.ViolationName);
    });
    return this.fb.group({
      BodyType: [''],
      ChassisNo: [''],
      Colour: [''],
      EngNo: [''],
      FatherName: [''],
      MakerModel: [''],
      DlNo:[''],
      MobileNumber: [''],
      OwnerName: [''],
      PermanentAddress: [''],
      RegistrationNo: [''],
      VehicleNo: [''],
      ViolationId:[this.violationIds.toString()],
      UserName: ["sa"],
      LocationName: ["GURGAON"],
      GeoLocation: ["GURGAON"],
      PaymentTypeName: ["Net-Banking"],
      PaymentId : ["TXN101043252612212383"] 
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
