import { Component } from '@angular/core';
import { ViolentsProvider } from '../../providers/violents/violents';
import { NavController } from 'ionic-angular';
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
  violentOpts: { title: string, subTitle: string };
  currentViolents:any;
  violentsList:any;

  constructor(public violent:ViolentsProvider,
              public navCtrl:NavController
  ) {
    
    this.violentsList = this.violent.getViolents();
    console.log(this.violentsList)
  }

  subTotal(){
    for(let i=0;i<this.currentViolents.length;i++){
      this.totalCharge += Number(this.currentViolents[i].charge);
    }
  }

  payment(){
    this.navCtrl.push(PaymentGatewayPage, { data: this.currentViolents, charge:this.totalCharge })
  }

  seize(){
    this.navCtrl.push(SeizePage)
  }

}
