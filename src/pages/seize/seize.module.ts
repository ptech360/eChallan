import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeizePage } from './seize';

@NgModule({
  declarations: [
    SeizePage,
  ],
  imports: [
    IonicPageModule.forChild(SeizePage),
  ],
})
export class SeizePageModule {}
