import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EthereumPriceProvider } from '../../providers/ethereum-price/ethereum-price';

@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  contact;
  isSending: boolean = true;
  amount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ethPrice: EthereumPriceProvider) {
    this.contact = this.navParams.get('contact');
    this.isSending = this.navParams.get('isSending');
    this.amount = this.navParams.get('amount');
    console.log(this.contact);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationPage');
  }

  openHome() {
    this.navCtrl.popToRoot();
  }

}
