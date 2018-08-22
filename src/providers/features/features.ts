import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenerateChallanComponent } from '../../components/generate-challan/generate-challan';

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
      component: 'GenerateChallanComponent',
    },
    {
      name: 'other',
      img: 'https://www.freeiconspng.com/uploads/team-icon-21.png',
      component: 'GenerateChallanComponent',
    },
    {
      name: 'other',
      img: 'https://www.freeiconspng.com/uploads/team-icon-21.png',
      component: 'GenerateChallanComponent',
    },
    {
      name: 'other',
      img: 'https://www.freeiconspng.com/uploads/team-icon-21.png',
      component: 'GenerateChallanComponent',
    },
    {
      name: 'other',
      img: 'https://www.freeiconspng.com/uploads/team-icon-21.png',
      component: 'GenerateChallanComponent',
    },
    {
      name: 'other',
      img: 'https://www.freeiconspng.com/uploads/team-icon-21.png',
      component: 'GenerateChallanComponent',
    },
    {
      name: 'other',
      img: 'https://www.freeiconspng.com/uploads/team-icon-21.png',
      component: 'GenerateChallanComponent',
    }
  ]
  constructor(public http: HttpClient) {
    console.log('Hello FeaturesProvider Provider');
  }

}
