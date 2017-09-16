import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipientPage } from '../recipient/recipient';
import { ViewChild} from '@angular/core';

import { Keyboard } from '@ionic-native/keyboard';


@Component({
  selector: 'page-enter-amount',
  templateUrl: 'enter-amount.html',
})
export class EnterAmountPage {
  @ViewChild('input') myInput ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private keyboard: Keyboard) { }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EnterAmountPage');
    setTimeout(() => {
      this.keyboard.show(); // for android
      this.myInput.setFocus();
    },150);

  }

  openRecipient() {
    this.navCtrl.push(RecipientPage);
  }
}
