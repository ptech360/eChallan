import { Component, ViewChild } from '@angular/core';
import { NavController} from 'ionic-angular';
import { FeaturesProvider } from '../../providers/features/features';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  pages: any;

  constructor(public navCtrl: NavController,
              public features:FeaturesProvider,     
  ) {
    this.pages = this.features.appFeatures;

  }

  open(feature:any){
    this.navCtrl.push(feature.component)
  }

}
