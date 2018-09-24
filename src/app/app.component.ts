import { Component, OnInit} from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginComponent } from '../components/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  rootPage:any = LoginComponent;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events:Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
  ngOnInit(){
    this.handleEvent();
  }

  handleEvent(){
    this.events.subscribe('session:expired', () => {
      this.rootPage = LoginComponent;
    });
  }
}
