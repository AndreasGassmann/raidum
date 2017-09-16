import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationPage');
  }

  openHome() {
    this.navCtrl.popToRoot();
  }

}
