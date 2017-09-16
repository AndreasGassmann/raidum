import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Contacts, IContactFindOptions, ContactFindOptions, Contact, ContactField, ContactFieldType, ContactName } from '@ionic-native/contacts';
import { DomSanitizer } from '@angular/platform-browser';

import { SendPage } from '../send/send';

@Component({
  selector: 'page-recipient',
  templateUrl: 'recipient.html',
})
export class RecipientPage {

  myContacts: any;

  constructor(public navCtrl: NavController, private contacts: Contacts, private sanitizer: DomSanitizer, private platform: Platform) {
    if (this.platform.is('cordova')) {
      let fields: ContactFieldType[] = ["displayName", "addresses"];

      let options: IContactFindOptions = new ContactFindOptions();
      options.filter = "";
      options.multiple = true;
      options.hasPhoneNumber = true;

      this.contacts.find(fields, options).then((contacts) => {
        console.log(contacts);
        this.myContacts = contacts.filter(c => c.phoneNumbers).map(c => {
          return {
            name: c.name.formatted,
            phoneNumber: c.phoneNumbers[0].value,
            photo: c.photos ? c.photos[0].value : ''
          }
        });
        console.log(this.myContacts);
      });
    } else {
      this.myContacts = [{
        name: 'Andy',
        phoneNumber: '+41 12 345 67 89',
        photo: 'https://unsplash.it/200'
      }, {
        name: 'Pascal',
        phoneNumber: '+41 12 345 67 89',
        photo: 'https://unsplash.it/201'
      },
      {
        name: 'Ale',
        phoneNumber: '+41 12 345 67 89',
        photo: 'https://unsplash.it/202'
      }];
    }
  }

  sanitizeImage(value) {
    if (this.platform.is('cordova')) {
      return this.sanitizer.bypassSecurityTrustUrl('file://' + value)
    } else {
      return value;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipientPage');
  }

  selectRecipient() {
    this.navCtrl.push(SendPage);
  }
}
