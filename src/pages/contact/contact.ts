import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactsProvider } from '../../providers/contacts/contacts';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contacts;
  constructor(public navCtrl: NavController,
              public contactsService:ContactsProvider
  ) {
    this.contacts = this.contactsService.getContacts();
  }

}
