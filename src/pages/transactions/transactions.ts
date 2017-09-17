import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { EthereumPriceProvider } from '../../providers/ethereum-price/ethereum-price';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class TransactionsPage {
  transactions: any = [];

  constructor(public navCtrl: NavController, private apiService: ApiServiceProvider, public ethPrice: EthereumPriceProvider) {
    this.apiService.getBalances().subscribe(balances => {
      console.log(balances);
      balances.forEach(c => {
        this.apiService.getHistory(c.channel_address).subscribe(data => {
          console.log(data);
          if (data) {
            data.forEach(d => {
              if (d.balance > 0) {
                this.transactions.push(d);
              }
            });
          }
        });
      });

      // TODO MAKE THIS BETTER
      setTimeout(() => {
        this.transactions.sort((a, b) => {
          return b.block_number - a.block_number;
        });
        console.log('total', this.transactions);
      }, 2000)
    });
  }

  getRandomImage(id) {
    return 'https://randomuser.me/api/portraits/med/men/' + id + '.jpg';
  }

}
