import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the ContactsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactsProvider {

  contacts = [
    {
      name: 'Ankush Rajpal',
      phone: '9893847574',
      email: 'ankush@gmail.com',
      post: 'Application Manager',
      img: 'https://images.desimartini.com/media/uploads/2015-5/manoj-bajpayee-stil-traffic-main.jpeg',
    },
    {
      name: 'Ankit Nagpal',
      phone: '9383746736',
      email: 'ankush@gmail.com',
      post: 'Area Inspector',
      img: 'https://spiderimg1.amarujala.com/assets/images/2017/08/18/750x506/acb-rajasthan_1503047911.jpeg',
    },
    {
      name: 'Jaspal Singh',
      phone: '9893847574',
      email: 'ankush@gmail.com',
      post: 'Area Incharge',
      img: 'https://images.tribuneindia.com/cms/gall_content/2016/5/2016_5$largeimg10_Tuesday_2016_234040622.jpg',
    },
    {
      name: 'Narendra Modi',
      phone: '9893847574',
      email: 'ankush@gmail.com',
      post: 'Prime minister',
      img: 'https://yt3.ggpht.com/a-/ACSszfFprNp-1Ay1IhDjH4NenwvLItZpPHeJdewulw=s900-mo-c-c0xffffffff-rj-k-no',
    },
    {
      name: 'Jaya Rathi',
      phone: '9893847574',
      email: 'ankush@gmail.com',
      post: 'Womens Department',
      img: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201609/police-story_647_090216110012.jpg',
    },
  ]

  constructor(public api: Api) {
  }

  getContacts(){
    return this.contacts;
  }

}
