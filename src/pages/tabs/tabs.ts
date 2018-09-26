import { Component, OnInit } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { StorageService } from '../../providers/providers';
import { NavController } from 'ionic-angular';
import { LoginComponent } from '../../components/login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit{

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  constructor(public nav: NavController,private storage: StorageService) {

  }

  ngOnInit(){
    this.storage.isToken.subscribe(val => {
      if(!val)
        this.nav.setRoot(LoginComponent);
    })
  }
}
