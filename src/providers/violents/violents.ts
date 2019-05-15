import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the ViolentsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ViolentsProvider {

  constructor(public api: Api) {
    console.log('Hello ViolentsProvider Provider');
  }

  getViolents(){
    return this.api.get('TrafficVioList');
  }

  generateChallan(data: any){
    return this.api.post('VehicleChallan',data);
  }

  generateOfflineChallan(data: any){
    return this.api.post('OfflineChallan',data);
  }

  challanPayment(data:any){
    return this.api.put('ChallanPayment',data);
  }

  sendSMS(data: any){
    return this.api.post('SendSms', data);
  }

  sendEmail(data: any){
    return this.api.post('SendEmail', data);
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

  getChallanByDate(data) {
    return this.api.get('ChallanByDate?FromDate='+data.fromDate+'&ToDate='+data.toDate);
  }

  unseizeVehicle(challanId){
    return this.api.post('RollbackSeizedVehicle?challanId='+challanId,{});
  }

  unseizeDocs(challanId){
    return this.api.post('RollbackSeizedDocs?challanId='+challanId,{});
  }
}
