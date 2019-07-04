import { Component } from '@angular/core';
import { NavController, AlertController, Events, PopoverController } from 'ionic-angular';
import { FeaturesProvider } from '../../providers/features/features';
import { StorageService } from '../../providers/localstorage/storage';
import { ToastService } from '../../providers/toast/toast.service';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LanguagePopoverPage } from '../language-popover/language-popover';
import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../providers/language/language';
declare let IdPayPrint: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages: any;
  selectedLanguage: string;

  constructor(public navCtrl: NavController,
    public features: FeaturesProvider,
    public storage: StorageService,
    public alertCtrl: AlertController,
    public events: Events,
    private popoverCtrl: PopoverController,
    private translate: TranslateService,
    private languageService: LanguageProvider
  ) {
    this.pages = this.features.appFeatures;
    this.languageService.setInitialAppLanguage();
    this.languageService.selectedLanguage.subscribe(val => {
      this.selectedLanguage = val;
    });

  }

  open(feature: any) {
    this.navCtrl.push(feature.component);
  }

  openLanguagePopover(ev) {
    const popover = this.popoverCtrl.create(LanguagePopoverPage);
    popover.present({ ev: ev });
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: this.translate.instant('Logout'),
      subTitle: this.translate.instant('Are you sure you want to log out from the application ?'),
      buttons: [
        {
          text: this.translate.instant('No'),
          role: this.translate.instant('Cancel')
        },
        {
          text: this.translate.instant('Yes'),
          handler: () => {
            // this.storage.clearData();
            // this.storage.isToken.next(false);
            // this.navCtrl.push('LoginComponent');
            this.events.publish("user:logout");
          }
        }]
    });
    alert.present();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: this.translate.instant('ALERT.header'),
      subTitle: this.translate.instant('ALERT.msg'),
      buttons: ['OK']
    });
    alert.present();
  }

}