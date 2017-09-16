import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  contact;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.contact = this.navParams.get('contact');
    console.log(this.contact);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationPage');
  }

  openHome() {
    this.navCtrl.popToRoot();
  }

}
