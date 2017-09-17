import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfirmationPage } from '../confirmation/confirmation';

import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { EthereumPriceProvider } from '../../providers/ethereum-price/ethereum-price';

@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {
  contact;
  amount: number = 0;
  toAddress: string = '0xcf5f6b71649d66c34bec1882d72acccf97437ae0';

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiServiceProvider, public ethPrice: EthereumPriceProvider) {
    this.contact = this.navParams.get('contact');
    if (this.contact.toAddress) {
      this.toAddress = this.contact.toAddress;
    }
    this.amount = Math.max(1, Math.round(this.navParams.get('amount')));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendPage');
  }

  openConfirmation() {
    console.log(this.toAddress);
    this.apiService.sendAmount(this.toAddress, this.amount).subscribe(data => {
      console.log(data);
      this.navCtrl.push(ConfirmationPage, {
        contact: this.contact,
        amount: this.amount
      });
    });

  }

  goBack() {
    this.navCtrl.pop();
  }

}
