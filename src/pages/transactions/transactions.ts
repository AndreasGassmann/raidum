import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiServiceProvider } from '../../providers/api-service/api-service';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class TransactionsPage {
  transactions: any = [];

  constructor(public navCtrl: NavController, private apiService: ApiServiceProvider) {
    this.apiService.getBalances().subscribe(balances => {
      console.log(balances);
      balances.forEach(c => {
        this.apiService.getHistory(c.channel_address).subscribe(data => {
          console.log(data);
          if (data) {
            this.transactions.push(...data);
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

}
