import { Component, OnInit} from '@angular/core';
import { Platform, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginComponent } from '../components/login/login';
import { User } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events:Events, public user: User) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need
      statusBar.styleDefault();
      user.getAppInfo().subscribe((response:any) => {
        splashScreen.hide();
      },(error:any) => {
        console.log(error);
      })
    });
  }
  
  ngOnInit(){
    if(this.user.isLoggedIn()){
      this.rootPage = TabsPage;
    }else {
      this.rootPage = LoginComponent;
    }
  }
}
