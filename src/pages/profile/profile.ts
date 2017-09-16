import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contacts, IContactFindOptions, ContactFindOptions, Contact, ContactField, ContactFieldType, ContactName } from '@ionic-native/contacts';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  myContacts: any;

  constructor(public navCtrl: NavController, private contacts: Contacts, private sanitizer: DomSanitizer) {
    let fields: ContactFieldType[] = ["displayName", "addresses"];

    let options: IContactFindOptions = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    options.hasPhoneNumber = true;

    this.contacts.find(fields, options).then((contacts) => {
      this.myContacts = contacts.filter(c => c.phoneNumbers).map(c => {
        return {
          name: c.name.formatted,
          phoneNumber: c.phoneNumbers[0].value,
          photo: c.photos ? c.photos[0].value : ''
        }
      });
    });
  }

  sanitizeImage(value) {
    return this.sanitizer.bypassSecurityTrustUrl(value)
  }

}
