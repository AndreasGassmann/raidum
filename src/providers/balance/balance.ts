import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Socket } from 'ng-socket-io';

@Injectable()
export class BalanceProvider {
  balance: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(public http: Http, private socket: Socket) {
    this.updateBalance();
  }

  updateBalance() {
    this.socket.emit('getBalances');
  }

}
