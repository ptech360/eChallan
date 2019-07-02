import { Component, OnInit, ViewChild } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { StorageService } from '../../providers/providers';
import { NavController, Tabs } from 'ionic-angular';
import { LoginComponent } from '../../components/login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  constructor(public nav: NavController, private storage: StorageService) {

  }

  ionViewDidEnter() {
    this.tabRef.select(2);
  }

  ngOnInit() {
    this.storage.isToken.subscribe(val => {
      if (!val)
        this.nav.setRoot(LoginComponent);
    })
  }
}
