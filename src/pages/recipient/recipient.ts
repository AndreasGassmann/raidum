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
  myOtherContacts: any;

  constructor(public navCtrl: NavController, private contacts: Contacts, private sanitizer: DomSanitizer, private platform: Platform) {
    // if (this.platform.is('cordova')) {
    /*
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
    });*/
    // } else {
    this.myContacts = [{
      name: 'Kiana Sporer',
      phoneNumber: '+41 78 401 68 87',
      photo: 'https://randomuser.me/api/portraits/med/women/33.jpg'
    }, {
      name: 'Stefan Meier',
      phoneNumber: '+41 79 071 51 49',
      photo: 'https://randomuser.me/api/portraits/med/men/53.jpg'
    }, {
      name: 'Jack Bauch',
      phoneNumber: '+41 79 212 47 04',
      photo: 'https://randomuser.me/api/portraits/med/men/82.jpg'
    }, {
      name: 'Michaela Lewis',
      phoneNumber: '+41 79 212 47 04',
      photo: 'https://randomuser.me/api/portraits/med/women/43.jpg'
    }];

    this.myOtherContacts = [{
      name: 'Naomi Vasquez',
      phoneNumber: '+1 (730) 274-3325',
      photo: 'https://randomuser.me/api/portraits/med/women/35.jpg'
    }, {
      name: 'Samuel May',
      phoneNumber: '+1 (240) 804-3872',
      photo: 'https://randomuser.me/api/portraits/med/men/26.jpg'
    }, {
      name: 'Carmen Gutierrez',
      phoneNumber: '+41 79 212 47 04',
      photo: 'https://randomuser.me/api/portraits/med/women/13.jpg'
    }, {
      name: 'Russel Collier',
      phoneNumber: '+1 (240) 804-3872',
      photo: 'https://randomuser.me/api/portraits/med/men/23.jpg'
    }, {
      name: 'Svetlana Baker',
      phoneNumber: '+1 (240) 804-3872',
      photo: 'https://randomuser.me/api/portraits/med/women/3.jpg'
    }];
    //}
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

  selectRecipient(c) {
    this.navCtrl.push(SendPage, {
      contact: c
    });
  }
}
