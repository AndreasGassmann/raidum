import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';

import { Connect, SimpleSigner } from 'uport-connect'

declare let navigator;

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }

  identifyWithUport() {
    const uport = new Connect('raidum', {
      clientId: '2odxodKieqfR5g9xPw5hZJZjNo3LNyNuT5z',
      network: 'rinkeby',
      signer: SimpleSigner('683d35aeb88968f3449a6f4aaff6cad217da9598738f6d4d5e107e23509b5912'),
      mobileUriHandler: (uri) => {

        if (this.platform.is('ios')) {
          window.location.assign(uri);
        } else {
          navigator.app.loadUrl(uri);
        }
        console.log(uri);
        //window.open(uri, '_system', 'location=yes');
      }
    });

    let web3 = uport.getWeb3();
    console.log(web3);
    // Many hacks, very success
    // uPort now opens another instance of our app with the access_token

    // Request credentials to login

    uport.requestCredentials({
      requested: ['name', 'phone'],
      notifcations: true,
    },
      (uri) => {
        alert(uri);
        console.log(uri);
      }).then((userProfile) => {
        alert(userProfile);
        // Do something after they have disclosed credentials
      }).catch(e => {
        console.log(e);
        alert(e);
      })

    console.log(uport);

  }

  downloadUport() {
    window.open('https://www.uport.me/', '_system');
  }

}
