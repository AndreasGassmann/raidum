import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnterAmountPage } from '../enter-amount/enter-amount';

@Component({
  selector: 'page-send-receive',
  templateUrl: 'send-receive.html'
})
export class SendReceivePage {

  constructor(public navCtrl: NavController) {

  }

  openEnterAmount() {
    this.navCtrl.push(EnterAmountPage);
  }
}
