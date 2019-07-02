import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ProvidersLanguageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const LNG_KEY = ''

@Injectable()
export class LanguageProvider {
  selected: any;

  constructor(private translate: TranslateService, private storage: Storage) {

  }

  setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);

    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    })
  }

  getLanguage() {
    return [
      { text: 'English', value: 'en', img: 'assets/imgs/en.png' },
      { text: 'Hindi', value: 'hi', img: 'assets/imgs/hi.png' }
    ]
  }

  setLanguage(lng: any) {
    this.translate.use(lng);
    this.selected = lng;
    this.storage.set(LNG_KEY, lng);
  }

}
