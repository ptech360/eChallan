import { Injectable } from '@angular/core';
import { Api } from '../api/api';

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

  constructor(public api: Api) {
    console.log('Hello ViolentsProvider Provider');
  }

  getViolents(){
    // return this.violentsList;
    return this.api.get('TrafficVioList');
  }

  generateChallan(data: any){
    return this.api.post('VehicleChallan',data);
  }

  challanPayment(data:any){
    return this.api.put('ChallanPayment',data);
  }
  
  vehicleType() {
    return this.api.get('VehicleTypes');
  }

  VehicleDocs() {
    return this.api.get('VehicleDocs');
  }

  vehicleSeize(data:any) {
    return this.api.post('VehicleSeize',data);
  }

  documentSeize(data:any) {
    return this.api.post('DocumentSeize',data);
  }
}
