import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TouchID } from '@ionic-native/touch-id';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private touchId: TouchID) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
    this.touchId.isAvailable()
      .then(
      res => console.log('TouchID is available!'),
      err => console.error('TouchID is not available', err)
      );

    this.touchId.verifyFingerprint('Scan your fingerprint please')
      .then(
      res => console.log('Ok', res),
      err => console.error('Error', err)
      );
  }

}
