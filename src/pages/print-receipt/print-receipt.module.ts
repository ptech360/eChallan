import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrintReceiptPage } from './print-receipt';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PrintReceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(PrintReceiptPage),
    TranslateModule
  ],
})
export class PrintReceiptPageModule { }
