import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SendPage } from '../send/send';

@Component({
  selector: 'page-send-receive',
  templateUrl: 'send-receive.html'
})
export class SendReceivePage {

  constructor(public navCtrl: NavController) {

  }

  openSend() {
    this.navCtrl.push(SendPage);
  }
}
