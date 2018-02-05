import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfirmationPage } from '../confirmation/confirmation';

import { EthereumPriceProvider } from '../../providers/ethereum-price/ethereum-price';

import { Socket } from 'ng-socket-io';

@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {
  contact;
  amount: number = 0;
  toAddress: string = '0xcf5f6b71649d66c34bec1882d72acccf97437ae0';

  constructor(public navCtrl: NavController, public navParams: NavParams, public ethPrice: EthereumPriceProvider, private socket: Socket) {
    this.contact = this.navParams.get('contact');
    if (this.contact.toAddress) {
      this.toAddress = this.contact.toAddress;
    }
    this.amount = this.navParams.get('amount');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendPage');
  }

  openConfirmation() {
    this.socket.emit('transactionRequest', {
      senderID: 1,
      receiverID: 2,
      amount: this.amount
    })
    this.navCtrl.push(ConfirmationPage, {
      contact: this.contact,
      amount: this.amount,
      isSending: true
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

}
