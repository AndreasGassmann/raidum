import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EthereumPriceProvider } from '../../providers/ethereum-price/ethereum-price';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class TransactionsPage {
  transactions: any = [];

  constructor(public navCtrl: NavController, public ethPrice: EthereumPriceProvider) {
  }

  getRandomImage(id) {
    return 'https://randomuser.me/api/portraits/med/men/' + id + '.jpg';
  }

}
