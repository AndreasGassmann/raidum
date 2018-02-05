import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { EnterAmountPage } from '../enter-amount/enter-amount';
import { BalanceProvider } from '../../providers/balance/balance';
import { EthereumPriceProvider } from '../../providers/ethereum-price/ethereum-price';

import { Connect, SimpleSigner } from 'uport-connect'

declare let navigator;

@Component({
  selector: 'page-send-receive',
  templateUrl: 'send-receive.html'
})
export class SendReceivePage {
  balance: number = 0;

  constructor(public navCtrl: NavController, private platform: Platform, private balanceProvider: BalanceProvider, public ethPrice: EthereumPriceProvider) {
    this.balanceProvider.balance.subscribe(value => {
      this.balance = value;
    });
  }

  openEnterAmount() {
    this.navCtrl.push(EnterAmountPage);
  }

  openUport() {
    // uPort object creation
    // Keys are from the app manager
  }

  setUser(id) {
    console.log(id);
    localStorage.setItem('id', id);
    this.balanceProvider.updateBalance();
  }
}
