import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AuthPage } from '../pages/auth/auth';
import { TransactionsPage } from '../pages/transactions/transactions';
import { ProfilePage } from '../pages/profile/profile';
import { SendReceivePage } from '../pages/send-receive/send-receive';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Contacts } from '@ionic-native/contacts';
import { TouchID } from '@ionic-native/touch-id';

@NgModule({
  declarations: [
    MyApp,
    AuthPage,
    TransactionsPage,
    ProfilePage,
    SendReceivePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    TransactionsPage,
    ProfilePage,
    SendReceivePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Contacts,
    TouchID,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
