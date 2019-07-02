import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';


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
import { ProfileComponent } from '../components/profile/profile';
import { NoRecordsComponent } from '../components/no-records/no-records';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { Api, User, FeaturesProvider, ProfileProvider, PeopleProvider, ViolentsProvider, ContactsProvider, StorageService } from '../providers/providers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintReceiptPage } from '../pages/print-receipt/print-receipt';
import { VehicleDetailComponent } from '../components/vehicle-detail/vehicle-detail';
import { Camera } from '../../node_modules/@ionic-native/camera';
import { ToastService } from '../providers/toast/toast.service';
import { Geolocation } from '@ionic-native/geolocation';
import { NetworkProvider } from '../providers/network/network';
import { Network } from '@ionic-native/network';
import { LanguageProvider } from '../providers/language/language';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginComponent,
    GenerateChallanComponent,
    VehicleDetailComponent,
    ViolenterHistoryPage,
    AddViolationComponent,
    PaymentGatewayPage,
    PrintReceiptPage,
    SeizePage,
    SeizeModal,
    ProfileComponent,
    NoRecordsComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
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
    VehicleDetailComponent,
    ViolenterHistoryPage,
    AddViolationComponent,
    PaymentGatewayPage,
    PrintReceiptPage,
    SeizePage,
    SeizeModal,
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
    ToastService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Uid,
    AndroidPermissions,
    Camera,
    Geolocation,
    NetworkProvider,
    Network,
    LanguageProvider
  ]
})
export class AppModule { }
