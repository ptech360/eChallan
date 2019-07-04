import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewChallanPage } from './view-challan';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ViewChallanPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewChallanPage),
    TranslateModule
  ],
})
export class ViewChallanPageModule { }
