import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  name: string = 'Andreas Gassmann';
  address: string = '73494bcb0865a72fd03cb3242e4c7b48688c0feb';
  phone: string = '+41 79 725 32 58';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    try {
      let info = JSON.parse(localStorage.getItem('userInfo'));
      this.name = info.name;
      this.address = '0x' + info.address;
      this.phone = info.phone;
    } catch (e) {
      console.log(e);
    }
  }

  clearLocalStorage() {
    localStorage.setItem('hasOnboarding', JSON.stringify(false))
  }

  openEtherscan() {
    window.open('http://etherscan.io/address/0x829BD824B016326A401d083B33D092293333A830', '_system');
  }

}
