import { Component } from '@angular/core';
import { ProfileProvider } from '../../providers/profile/profile';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { LoginComponent } from '../login/login';
import { TabsPage } from '../../pages/tabs/tabs';
import { StorageService } from '../../providers/providers';

/**
 * Generated class for the ProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfileComponent {

  profile;
  loading: Loading;
  userDetails: any = {};

  constructor(public profileService: ProfileProvider,
              public navCtrl:NavController,
              public storage: StorageService,
              public profileCtrl:LoadingController
  ) {
    this.profile = this.profileService.getProfile();
    this.userDetails = this.storage.getData('user-detail');
  }

  logout(){
    this.showLoading();
    this.storage.clearData();
    this.storage.isToken.next(false);
    this.navCtrl.setRoot(LoginComponent);
  }

  showLoading(){
    this.loading =  this.profileCtrl.create({
      content:'Log out...',
      dismissOnPageChange:true,      
    })
    this.loading.present();
  }
}
