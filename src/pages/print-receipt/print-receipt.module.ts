import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrintReceiptPage } from './print-receipt';

@NgModule({
  declarations: [
    PrintReceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(PrintReceiptPage),
  ],
})
export class PrintReceiptPageModule {}
