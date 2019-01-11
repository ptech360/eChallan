import { Injectable } from '@angular/core';
import { GenerateChallanComponent } from '../../components/generate-challan/generate-challan';
import { ProfileComponent } from '../../components/profile/profile';
import { NoRecordsComponent } from '../../components/no-records/no-records';
import { Api } from '../api/api';
import { LoginComponent } from '../../components/login/login';

/*
  Generated class for the FeaturesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FeaturesProvider {
  appFeatures = [
    {
      name: 'Challan Generator',
      img: 'assets/imgs/challan.png',
      icon: 'calculator',
      component: GenerateChallanComponent,
    },
    {
      name: 'Profile',
      img: 'assets/imgs/traffic_police.png',
      icon: 'person',
      component: ProfileComponent,
    },
    {
      name: 'View Challans',
      icon: 'list',
      component: 'ViewChallanPage'
    },
    {
      name: 'Logout',
      icon: 'log-out',
      component: LoginComponent
    }
  ]
  constructor(public api: Api) {
    console.log('Hello FeaturesProvider Provider');
  }

}
