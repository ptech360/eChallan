import { Component } from '@angular/core';
import { ProfileProvider } from '../../providers/profile/profile';
import { NavController } from 'ionic-angular';
import { FeaturesProvider } from '../../providers/features/features';
import { HomePage } from '../../pages/home/home';
import { LoginComponent } from '../login/login';

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

  constructor(public profileService: ProfileProvider,
              public navCtrl:NavController
  ) {
    this.profile = this.profileService.getProfile();
  }

  logout(){
    this.navCtrl.setRoot(LoginComponent)
  }
}
