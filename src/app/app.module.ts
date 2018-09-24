import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginComponent } from '../components/login/login';
import { GenerateChallanComponent } from '../components/generate-challan/generate-challan';
import { ViolenterHistoryPage } from '../pages/violenter-history/violenter-history';
import { AddViolationComponent } from '../components/add-violation/add-violation';
import { PaymentGatewayPage } from '../pages/payment-gateway/payment-gateway';
import { SeizePage } from '../pages/seize/seize';
import { SeizeModal } from '../pages/seize/seize-modal/seize-modal';
import { ReceiptPage } from '../pages/receipt/receipt';
import { ProfileComponent } from '../components/profile/profile';
import { NoRecordsComponent } from '../components/no-records/no-records';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import {Api, User, FeaturesProvider, ProfileProvider, PeopleProvider, ViolentsProvider, ContactsProvider, StorageService} from '../providers/providers';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginComponent,
    GenerateChallanComponent,
    ViolenterHistoryPage,
    AddViolationComponent,
    PaymentGatewayPage,
    SeizePage,
    SeizeModal,
    ReceiptPage,
    ProfileComponent,
    NoRecordsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginComponent,
    GenerateChallanComponent,
    ViolenterHistoryPage,
    AddViolationComponent,
    PaymentGatewayPage,
    SeizePage,
    SeizeModal,
    ReceiptPage,
    ProfileComponent,
    NoRecordsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Api,
    User,
    FeaturesProvider,
    ProfileProvider,
    PeopleProvider,
    ViolentsProvider,
    ContactsProvider,
    StorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Uid,
    AndroidPermissions   
  ]
})
export class AppModule {}
