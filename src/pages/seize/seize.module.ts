import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeizePage } from './seize';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SeizePage,
  ],
  imports: [
    IonicPageModule.forChild(SeizePage),
    TranslateModule
  ],
})
export class SeizePageModule { }
