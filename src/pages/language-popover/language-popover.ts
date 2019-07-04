import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LanguageProvider } from '../../providers/language/language';

/**
 * Generated class for the LanguagePopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-language-popover',
  templateUrl: 'language-popover.html',
})
export class LanguagePopoverPage {

  languages: any[] = [];
  selected: '';
  constructor(private viewCtrl: ViewController, private languageService: LanguageProvider) {
    this.languages = languageService.getLanguages();
    this.selected = languageService.selected;
  }

  select(lng) {
    this.languageService.setLanguage(lng);
    this.viewCtrl.dismiss();
  }



}
