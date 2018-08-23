import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ViolentsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ViolentsProvider {

  violentsList = [
      {
        name: 'No Helmet',
        code: '001',
        charge: '100'
      },
      {
        name: 'Crossing Red Light',
        code: '002',
        charge: '150'
      },
      {
        name: 'Over Speed',
        code: '003',
        charge: '50'
      },
      {
        name: 'Hit & Run',
        code: '004',
        charge: '1500'
      }
  ]

  constructor(public http: HttpClient) {
    console.log('Hello ViolentsProvider Provider');
  }

  getViolents(){
    return this.violentsList;
  }

}
