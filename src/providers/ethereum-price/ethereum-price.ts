import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EthereumPriceProvider {
  ethPrice: number = 1050;

  constructor(public http: Http) { }
}
