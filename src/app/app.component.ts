import { Component } from '@angular/core';
import { Platform, IonicApp, App, NavController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppService } from './app.service';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  //用于判断返回键是否触发
  backButtonPressed: boolean = false;
  constructor(public ionicApp: IonicApp, public appCtrl: App, public toastCtrl: ToastController,
    private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, service: AppService) {
    platform.ready().then(() => {
      service.init(() => {
        statusBar.styleDefault();
        splashScreen.hide();
      })
      //注册返回按键事件
      this.registerBackButtonAction();
    });
    setInterval(() => {
      let activeNav: NavController = this.appCtrl.getActiveNavs()[0];
      console.log(activeNav)
    }, 3000)
  }
  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => { });
        activePortal.onDidDismiss(() => { });
        return;
      }
      let activeNav: NavController = this.appCtrl.getActiveNavs()[0];
      return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
    }, 1);
  }

  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }
}
