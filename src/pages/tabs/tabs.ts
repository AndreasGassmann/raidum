import { Component } from '@angular/core';

import { SendReceivePage } from '../send-receive/send-receive';
import { TransactionsPage } from '../transactions/transactions';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SendReceivePage;
  tab2Root = TransactionsPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
