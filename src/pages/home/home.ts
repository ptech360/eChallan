import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import { FeaturesProvider } from '../../providers/features/features';
declare let IdPayPrint: any;
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
    // IdPayPrint('','6HY3YE1HEE7ZDM4J5GH2RCP2');
    this.navCtrl.push(feature.component)
  }

}
