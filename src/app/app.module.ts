import { NgModule ,LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import localeEsEc from '@angular/common/locales/es-EC';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { TabsPageRoutingModule } from './pages/tabs/tabs-routing.module';


registerLocaleData(localeEsEc, 'es-Ec');
/**
 * Modulo principal de la App
 */
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(),
     AppRoutingModule,
     TabsPageRoutingModule,
    //  AppRoutingModule,
     IonicStorageModule.forRoot(),
     HttpClientModule,
     ChartsModule,
     ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    SocialSharing, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es-Ec' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
