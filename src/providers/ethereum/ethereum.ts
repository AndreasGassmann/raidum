import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Address } from "../../models/address";
import * as EthereumTx from "ethereumjs-tx";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import { Transaction } from "../../models/transaction";

@Injectable()
export class EthereumProvider {

  public addressRegex = '^(0x)?[0-9a-fA-F]{40}$';
  private compiledAddressRegex: RegExp;

  constructor(public http: Http) {
    this.compiledAddressRegex = new RegExp(this.addressRegex);
  }

  public getEthereumRegex(): string {
    return this.addressRegex;
  }

  public isValidAddress(address: string): boolean {
    return this.compiledAddressRegex.test(address);
  }

  public isValidTx(rawTx: string) {
    const tx = new EthereumTx(this.addHexPrefix(rawTx));
    return tx && tx.verifySignature();
  }

  public addHexPrefix(s: string) {
    if (!s.startsWith('0x')) {
      s = '0x' + s;
    }
    return s;
  }

  public wei2Eth(wei: number) {
    return wei / 1000000000000000000;
  }

  public wei2gwei(wei: number) {
    return wei / 1000000000;
  }

  public getAddress(address: string): Promise<Address> {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      if (!this.isValidAddress(address)) reject('Invalid address');
      var request = '[{"id":"1","jsonrpc":"2.0","method":"eth_getBalance","params":["' + address + '","latest"]},{"id":"2","jsonrpc":"2.0","method":"eth_gasPrice","params":[]},{"id":"3","jsonrpc":"2.0","method":"eth_getTransactionCount","params":["' + address + '","pending"]}]';
      this.http.post('https://rinkeby.infura.io/', request, options).map(res => res.json()).toPromise().then((results: any) => {
        console.log('getAddress', results);
        resolve(new Address(this.wei2Eth(parseInt(results[0].result)), parseInt(results[1].result), parseInt(results[2].result)));
      }).catch((error: Response) => {
        console.error('getAddress', error);
        reject(error);
      });
    });
  }

  public sendTransaction(signedTx: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      var request = '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["' + signedTx + '"],"id":1}';
      this.http.post('https://api.myetherapi.com/eth', request, options).map(res => res.json()).toPromise().then((result: any) => {
        if (result.error) {
          reject(result.error.message);
        } else {
          resolve(result.result);
        }
      }).catch((error: Response) => {
        reject(error);
      });
    });
  }

  public signedTx2Transaction(rawSignedTx: string): Transaction {
    const tx = new EthereumTx(rawSignedTx);
    var txJson = tx.toJSON();
    var obj = {};
    for (var i = 0; i < tx._fields.length; i++) {
      obj[tx._fields[i]] = txJson[i];
    }

    var transaction = new Transaction();
    transaction.nonce = parseInt(obj['nonce']);
    transaction.gasPrice = parseInt(obj['gasPrice']);
    transaction.gasLimit = parseInt(obj['gasLimit']);
    transaction.to = obj['to'].toLowerCase();
    transaction.from = '0x' + tx.getSenderAddress().toString('hex').toLowerCase();
    transaction.value = this.wei2Eth(parseInt(obj['value']));
    transaction.data = obj['data'];
    transaction.chainId = parseInt(obj['chainId']);

    return transaction;
  }

}