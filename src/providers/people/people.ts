import { Injectable } from '@angular/core';
import { Api } from '../api/api';

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
      phone: '+919783746433',
      violations: [
        {
          name: 'No Helmet',
          code: '001',
          date_of_violation: '14/06/2017',
          time_of_violation: '13:20',
          charge_person: 'Malay Gaitonde',
          location: 'Bani Square Junction',
          city:'Gurugram',
          charge_filed: '100',
          currency: 'Rupee'
        },
        {
          name: 'Crossed Red Light',
          code: '002',
          date_of_violation: '19/07/2017',
          time_of_violation: '11:33',
          charge_person: 'Laxman Singh',
          location: 'NSP',
          city:'Delhi',
          charge_filed: '50',
          currency: 'Rupee'
        },
        {
          name: 'No Helmet',
          code: '003',
          date_of_violation: '30/09/2017',
          time_of_violation: '15:26',
          charge_person: 'Chankey Pandey',
          location: 'Pitampura Square',
          city:'Delhi',
          charge_filed: '150',
          currency: 'Rupee'
        },
        {
          name: 'Rash Driving',
          code: '004',
          date_of_violation: '10/10/2017',
          time_of_violation: '13:23',
          charge_person: 'Dayalal Singh',
          location: 'Pitampura Square',
          city:'Delhi',
          charge_filed: '150',
          currency: 'Rupee'
        },
        {
          name: 'Hit & Run',
          code: '005',
          date_of_violation: '20/01/2018',
          time_of_violation: '1:20',
          charge_person: 'Rajkumar Gaitonde',
          location: 'Rohtak-Delhi Highway',
          city:'Delhi',
          charge_filed: '1500',
          currency: 'Rupee'
        },
        {
          name: 'No Helmet',
          code: '001',
          date_of_violation: '14/06/2017',
          time_of_violation: '13:20',
          charge_person: 'Malay Gaitonde',
          location: 'Bani Square Junction',
          city:'Gurugram',
          charge_filed: '100',
          currency: 'Rupee'
        },
        {
          name: 'Crossed Red Light',
          code: '002',
          date_of_violation: '19/07/2017',
          time_of_violation: '11:33',
          charge_person: 'Laxman Singh',
          location: 'NSP',
          city:'Delhi',
          charge_filed: '50',
          currency: 'Rupee'
        },
        {
          name: 'No Helmet',
          code: '003',
          date_of_violation: '30/09/2017',
          time_of_violation: '15:26',
          charge_person: 'Chankey Pandey',
          location: 'Pitampura Square',
          city:'Delhi',
          charge_filed: '150',
          currency: 'Rupee'
        },
        {
          name: 'Rash Driving',
          code: '004',
          date_of_violation: '10/10/2017',
          time_of_violation: '13:23',
          charge_person: 'Dayalal Singh',
          location: 'Pitampura Square',
          city:'Delhi',
          charge_filed: '150',
          currency: 'Rupee'
        },
        {
          name: 'Hit & Run',
          code: '005',
          date_of_violation: '20/01/2018',
          time_of_violation: '1:20',
          charge_person: 'Rajkumar Gaitonde',
          location: 'Rohtak-Delhi Highway',
          city:'Delhi',
          charge_filed: '1500',
          currency: 'Rupee'
        }, 
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
      phone: '+91923412654',
      violations: [
        {
          name: 'Crossed Red Light',
          code: '002',
          date_of_violation: '24/03/2017',
          time_of_violation: '18:20',
          charge_person: 'Gaitonde',
          location: 'Bani Square Junction',
          city:'Gurugram',
          charge_filed: '50',
          currency: 'Rupee'
        }
      ],
    }
  ]
  constructor(public api: Api) {
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

  getVehicleDetails(vehicleNo:string){
    return this.api.get('VahanDetails?vehicleno='+vehicleNo);
  }

}
