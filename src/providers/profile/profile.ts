import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  profile = {
    name:'Kunwar Ranjeet Singh',
    post: 'Traffic Police',
    img:'http://static.navodayatimes.in/multimedia/18_49_216097166nawi-ll.jpg',
    area: 'Palasia Square',
    address: 'Indore, M.P.'

  }
  constructor(public api: Api) {
    console.log('Hello ProfileProvider Provider');
  }

  getProfile(){
    return this.profile;
  }

}
