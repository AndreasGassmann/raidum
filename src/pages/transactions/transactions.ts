import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiServiceProvider } from '../../providers/api-service/api-service';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class TransactionsPage {

  constructor(public navCtrl: NavController, private apiService: ApiServiceProvider) {
    /*this.apiService.getHistory().map(res => res.json()).subscribe(data => {
      console.log(data);
    });*/
  }

}
