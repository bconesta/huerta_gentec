import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule, PERSISTENCE } from '@angular/fire/compat/auth';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';


const firebaseConfig = {
  apiKey: "AIzaSyB1WZhMitTLQplixbmSFlbSkO5tb609FoQ",
  authDomain: "huerta-hidro---gentec.firebaseapp.com",
  databaseURL: "https://huerta-hidro---gentec-default-rtdb.firebaseio.com",
  projectId: "huerta-hidro---gentec",
  storageBucket: "huerta-hidro---gentec.appspot.com",
  messagingSenderId: "648257296374",
  appId: "1:648257296374:web:e6fa2beab8accb145d19d7"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, BluetoothSerial, { provide: PERSISTENCE, useValue: 'local' }, OpenNativeSettings, WifiWizard2, Globalization],
  bootstrap: [AppComponent],
})
export class AppModule {}
