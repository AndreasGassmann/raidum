import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiServiceProvider {
  node0 = {
    pk: '0xcf5f6b71649d66c34bec1882d72acccf97437ae0',
    port: '80'
  }

  node1 = {
    pk: '0x057bba5323fba4e721802877a2e4fad2b5a6ef9c',
    port: '81'
  }

  node2 = {
    pk: '0x43373da7e642667e3d6d8d7adeef75dc79d5330c',
    port: '82'
  }

  activeNode = this.node0;
  constructor(public http: Http) {
    console.log('Hello ApiServiceProvider Provider');
  }

  getBalances() {
    return this.http.get('http://raiden.cloudapp.net:' + this.activeNode.port + '/api/1/channels');
  }

  sendAmount(to, amount) {
    return this.http.get('http://raiden.cloudapp.net:' + this.activeNode.port + '/api/1/channels');
  }

  getHistory(channel) {
    return this.http.get('http://raiden.cloudapp.net:' + this.activeNode.port + '/api/1/events/channels/' + channel);
  }

}
