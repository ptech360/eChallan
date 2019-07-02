import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesLanguagePopoverPage } from './pages-language-popover';

@NgModule({
  declarations: [
    PagesLanguagePopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesLanguagePopoverPage),
  ],
})
export class PagesLanguagePopoverPageModule {}
