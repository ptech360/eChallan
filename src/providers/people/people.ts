import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PeopleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeopleProvider {

  people = [
    {
      name: 'Hitesh Shadija',
      driving_license: 'd000',
      register_certificate: 'r000',
      vehicle_no: 'v000',
      dob: '14/06/1992',
      image: 'https://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg',
      previous_violation_count: '2',
      violations: [
        {
          name: 'No Helmet',
          code: '001',
          date_of_violation: '14/06/2017',
          time_of_violation: '13:20',
          charge_person: 'Gaitonde',
          location: 'Bani Square Junction',
          charge_filed: '50',
          currency: 'Rupee'
        }
      ],
    },
    {
      name: 'Amit Shukla',
      driving_license: 'd111',
      register_certificate: 'r111',
      vehicle_no: 'v111',
      dob: '24/09/1992',
      image: 'https://metron-group.com/metron-wp/wp-content/uploads/2016/10/person-to-person-business.jpg',
      previous_violation_count: '1',
      violations: [
        {
          name: 'Crossed Red Light',
          code: '002',
          date_of_violation: '24/03/2017',
          time_of_violation: '18:20',
          charge_person: 'Gaitonde',
          location: 'Bani Square Junction',
          charge_filed: '50',
          currency: 'Rupee'
        }
      ],
    }
  ]
  constructor(public http: HttpClient) {
    console.log('Hello PeopleProvider Provider');
  }

  getPerson(type,value){
    if(type=='driving_license'){
      for(let i=0; i<this.people.length; i++ ){
        if(this.people[i].driving_license == value){
          return this.people[i];
        }
      }
    }
    return null;
  }

}
