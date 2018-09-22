import { Injectable } from '@angular/core';
import { GenerateChallanComponent } from '../../components/generate-challan/generate-challan';
import { ProfileComponent } from '../../components/profile/profile';
import { NoRecordsComponent } from '../../components/no-records/no-records';
import { Api } from '../api/api';

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
      component: GenerateChallanComponent,
    },
    {
      name: 'Profile',
      img: 'assets/imgs/traffic_police.png',
      component: ProfileComponent,
    },
    {
      name: 'other',
      img: 'assets/imgs/other.png',
      component: NoRecordsComponent,
    },
    {
      name: 'other',
      img: 'assets/imgs/other.png',
      component: NoRecordsComponent,
    },
    {
      name: 'other',
      img: 'assets/imgs/other.png',
      component: NoRecordsComponent,
    },
    {
      name: 'other',
      img: 'assets/imgs/other.png',
      component: NoRecordsComponent,
    },
    {
      name: 'other',
      img: 'assets/imgs/other.png',
      component: NoRecordsComponent,
    },
    {
      name: 'other',
      img: 'assets/imgs/other.png',
      component: NoRecordsComponent,
    }
  ]
  constructor(public api: Api) {
    console.log('Hello FeaturesProvider Provider');
  }

}
