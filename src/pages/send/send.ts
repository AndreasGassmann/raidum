import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfirmationPage } from '../confirmation/confirmation';

import { ApiServiceProvider } from '../../providers/api-service/api-service';

@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {
  contact;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiServiceProvider) {
    this.contact = this.navParams.get('contact');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendPage');
  }

  openConfirmation() {
    this.apiService.sendAmount('cf5f6b71649d66c34bec1882d72acccf97437ae0', 2).subscribe(data => {
      console.log(data);
      this.navCtrl.push(ConfirmationPage, {
        contact: this.contact
      });
    });

  }

}
