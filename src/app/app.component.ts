import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataLocalService } from './services/dataLocal/data-local.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataLocal:DataLocalService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.changeDarkMode();
    });
  }

  changeDarkMode(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: light)');
    if (prefersDark.matches){
      console.log(prefersDark);
       document.body.classList.toggle('light');
      }
     }
}
