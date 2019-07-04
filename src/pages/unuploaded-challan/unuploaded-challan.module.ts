import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnuploadedChallanPage } from './unuploaded-challan';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UnuploadedChallanPage,
  ],
  imports: [
    IonicPageModule.forChild(UnuploadedChallanPage),
    TranslateModule
  ],
})
export class UnuploadedChallanPageModule { }
