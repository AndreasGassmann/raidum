import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiServiceProvider } from '../api-service/api-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BalanceProvider {
  balance: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(public http: Http, private apiService: ApiServiceProvider) {
    setInterval(() => {
      this.updateBalance();
    }, 1000);
    this.updateBalance();
  }

  updateBalance() {
    this.apiService.getBalances().subscribe(data => {
      console.log(data);
      let balance = 0;
      data.forEach(d => {
        balance += d.balance;
      });
      console.log(balance);
      this.balance.next(balance);
    });
  }

}
