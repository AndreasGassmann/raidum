import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { EnterAmountPage } from '../enter-amount/enter-amount';

import { Connect, SimpleSigner } from 'uport-connect'

declare let navigator;

@Component({
  selector: 'page-send-receive',
  templateUrl: 'send-receive.html'
})
export class SendReceivePage {

  constructor(public navCtrl: NavController, private platform: Platform) {
  }

  openEnterAmount() {
    this.navCtrl.push(EnterAmountPage);
  }

  openUport() {
    // uPort object creation
    // Keys are from the app manager
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
        //const qr = '';
        /*kjua({
          text: uri,
          fill: '#0619ac',
          size: 400,
          back: 'rgba(255,255,255,1)'
        })

        // Create wrapping link for mobile touch
        //let aTag = document.createElement('a')
        //aTag.href = uri

        // Nest QR in <a> and inject
        //aTag.appendChild(qr)
        //document.querySelector('#kqr').appendChild(aTag)
*/
        //console.log(aTag)
      }).then((userProfile) => {
        alert(userProfile);
        // Do something after they have disclosed credentials
      }).catch(e => {
        console.log(e);
        alert(e);
      })
    /*
       // Attest specific credentials
        uport.attestCredentials({
          sub: THE_RECEIVING_UPORT_ADDRESS,
          claim: {
            CREDENTIAL_NAME: CREDENTIAL_VALUE
          },
          exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
        })*/
    console.log(uport);

  }
}
