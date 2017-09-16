import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';

import { Credentials } from 'uport'
import { Connect, SimpleSigner } from 'uport-connect'

import { TabsPage } from '../pages/tabs/tabs';
import { AuthPage } from '../pages/auth/auth';

import { EthereumProvider } from '../providers/ethereum/ethereum';
import { ApiServiceProvider } from '../providers/api-service/api-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private deeplinks: Deeplinks, private ethProvider: EthereumProvider, private apiService: ApiServiceProvider) {
    platform.ready().then(() => {
      this.rootPage = AuthPage;

      let masterToken = '0xe656324cdea2db0a0c0cf5151fe1f2523f9064d8';

      /*
            this.apiService.getBalances().map(res => res.json()).subscribe(data => {
              console.log(data);
              let balance = 0;
              data.forEach(d => {
                balance += d.balance;
              });
              console.log(balance);
            });
      */
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.deeplinks.route({}).subscribe((match) => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        console.log('Successfully matched route', match);
      }, (nomatch) => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);

        if (nomatch && nomatch.$link && nomatch.$link.url && nomatch.$link.url.indexOf("raidum://token?text=#access_token=") === 0) {
          let resToken = nomatch.$link.url.substring(34); // Remove raidum://token?text=#access_token=
          console.log(resToken);

          const credentials = new Credentials({ address: '2odxodKieqfR5g9xPw5hZJZjNo3LNyNuT5z' });

          credentials.receive(resToken).then(res => {
            console.log(res);
            alert('dbkwlv ' + JSON.stringify(res));

            const uport = new Connect('raidum', {
              clientId: '2odxodKieqfR5g9xPw5hZJZjNo3LNyNuT5z',
              network: 'rinkeby',
              signer: SimpleSigner('683d35aeb88968f3449a6f4aaff6cad217da9598738f6d4d5e107e23509b5912'),
              mobileUriHandler: (uri) => {

                //navigator.app.loadUrl(uri);
                console.log('lbwkds' + uri);
                //window.open(uri, '_system', 'location=yes');
              }
            })

            const txobject = {
              to: '0xc3245e75d3ecd1e81a9bfb6558b6dafe71e9f347',
              value: '0.1',
              function: (x, y) => {
                console.log('asdfasdga', x, y);
              },
              //function: setStatus(string 'hello', bytes32 '0xc3245e75d3ecd1e81a9bfb6558b6dafe71e9f347'),
              appName: 'raidum'
            }
            uport.sendTransaction(txobject).then(txID => {
              alert('txID: ' + txID);
              console.log('txId', + txID)
            }).catch(e => {
              console.log('asdfgsg', e)
            })

            // const credentials = res.verified
            const name = res.name
          })
        } else {
          console.log('no match!')
        }

      });
    });
  }
}
