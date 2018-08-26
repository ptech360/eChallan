import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginComponent } from '../components/login/login';
import { LoginProvider } from '../providers/login/login';
import { GenerateChallanComponent } from '../components/generate-challan/generate-challan';
import { FeaturesProvider } from '../providers/features/features';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { PeopleProvider } from '../providers/people/people';
import { ViolenterHistoryPage } from '../pages/violenter-history/violenter-history';
import { ChartProvider } from '../providers/chart/chart';
import { AddViolationComponent } from '../components/add-violation/add-violation';
import { ViolentsProvider } from '../providers/violents/violents';
import { PaymentGatewayPage } from '../pages/payment-gateway/payment-gateway';
import { SeizePage } from '../pages/seize/seize';
import { SeizeModal } from '../pages/seize/seize-modal/seize-modal';
import { ReceiptPage } from '../pages/receipt/receipt';
import { ContactsProvider } from '../providers/contacts/contacts';
import { ProfileComponent } from '../components/profile/profile';
import { ProfileProvider } from '../providers/profile/profile';
import { NoRecordsComponent } from '../components/no-records/no-records';


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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    FeaturesProvider,
    PeopleProvider,
    ChartProvider,
    ViolentsProvider,
    ContactsProvider,
    ProfileProvider,
  ]
})
export class AppModule {}
