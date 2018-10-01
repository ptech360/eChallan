import { Component } from '@angular/core';
import { ViolentsProvider } from '../../providers/violents/violents';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { PaymentGatewayPage } from '../../pages/payment-gateway/payment-gateway';
import { SeizePage } from '../../pages/seize/seize';

/**
 * Generated class for the AddViolationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-violation',
  templateUrl: 'add-violation.html'
})
export class AddViolationComponent {

  text: string;
  totalCharge:number = 0.0;
  violenter;
  violentOpts: { title: string, subTitle: string };
  currentViolents:any[] = [];
  violentsList:any = [];
  loading: Loading;

  constructor(public violent:ViolentsProvider,
              public navCtrl:NavController,
              public navParam:NavParams,
              public generateCtrl:LoadingController
  ) {
    this.showLoading()
    this.violent.getViolents().subscribe(response => {
      this.loading.dismiss();
      this.violentsList = response;
      // this.violenter.pastOffences.forEach(element => {
      //   const createdate:any = new Date(element.createdDate);
      //   const now:any = new Date();
      //   const millisTill10: number = new Date() - createdate;
        
      //   this.violentsList.filter(violent => {

      //   });
      // });
    })
  }

  ionViewDidLoad() {
    this.violenter = this.navParam.get('data');    
  }

  subTotal(){
    for(let i=0;i<this.currentViolents.length;i++){
      this.totalCharge += Number(this.currentViolents[i].offenceFine);
    }
  }

  payment(){
    this.navCtrl.push(PaymentGatewayPage, { data: this.currentViolents, charge:this.totalCharge, violenter: this.violenter })
  }

  seize(){
    this.navCtrl.push(SeizePage, { data: this.currentViolents, charge:this.totalCharge, violenter: this.violenter });
  }

  showLoading(){
    this.loading =  this.generateCtrl.create({
      content:'getting violents...',
      dismissOnPageChange:true
    })
    this.loading.present()
  }

}
