import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentGatewayPage } from './payment-gateway';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PaymentGatewayPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentGatewayPage),
    TranslateModule
  ],
})
export class PaymentGatewayPageModule { }
