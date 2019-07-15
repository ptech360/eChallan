import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the ProvidersLanguageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const LNG_KEY = 'SelectedLanguage';

@Injectable()
export class LanguageProvider {
  selected: any;
  selectedLanguage = new Subject<string>();
  languages: { text: string; value: string; ch: string; }[] = [
    { text: 'English', value: 'en', ch: 'En' },
    { text: 'Hindi', value: 'hi', ch: 'हिं' },
    { text: 'Kannada', value: 'ka', ch: 'ಕ' }
  ];

  constructor(private translate: TranslateService, private storage: Storage) {

  }

  setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    this.selectedLanguage.next(language);
    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
      // else {
      //   this.setLanguage(language);
      //   this.selected = language;
      // }
    })
  }

  getLanguages() {
    return this.languages;
  }

  setLanguage(lng: any) {
    this.translate.use(lng);
    this.selected = lng;
    this.storage.set(LNG_KEY, lng);
    this.selectedLanguage.next(lng);
  }

}
