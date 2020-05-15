import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Dialogs } from '@ionic-native/dialogs';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Injectable()
export class AppService {
  platformName: string = 'weixin'; //终端类型
  token: string; //用户token
  LoginUserInfo: any; //用户信息
  savePath: string = ''; //保存地址
  ctxPath: string; //服务器地址
  version: string; //app版本号
  version_code: number; //app版本code
  version_remark: string; //app版本功能描述
  loading: any; //加载对象
  updateBookInfoReviews: boolean = false;
  network: any = 'wifi';
  org_id: any = 214;
  unbarcodeScanner = false;
  constructor(private platform: Platform,
    public loadingCtrl: LoadingController,
    public http: Http,
    public dialogs: Dialogs,
    public barcodeScanner: BarcodeScanner,
    public statusBar: StatusBar) {
    this.ctxPath = 'http://cjszyun.cn';
  }
  /**
   * 服务初始化
   * @param callback 
   */
  init(callback?: any) {
    this.version = '1.0.0';
    this.version_code = 1;
    this.version_remark = 'APP发布!';
    if (this.isAndroid()) {
      this.platformName = 'android';
    }
    if (this.isIos()) {
      this.platformName = 'ios';
    }
    this.LoginUserInfo = JSON.parse(localStorage.getItem('LoginUserInfo'));
    this.token = this.LoginUserInfo ? this.LoginUserInfo.token : null;
    if (callback) {
      callback();
    }
  }
  loadingStart(txt?: string) {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
  loadingEnd() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }
  post(url: string, body?: any): Promise<any> {
    body = body ? body : {};
    if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1) {
      url = this.ctxPath + url;
      body.org_id = this.LoginUserInfo ? this.LoginUserInfo.org_id : this.org_id;
      body.token_type = this.platformName;
      body.member_token = this.token;
      body.client_type = body.client_type ? body.client_type : 'QY';
    }
    console.log(url)
    body = this.param(body);
    console.log(body)
    this.network = 'wifi';
    let pos = this.http.post(url, body).toPromise();
    //异常就 设置为没有网络
    pos.catch(error => {
      this.network = 'none';
    })
    return pos;
  }
  param(data) {
    let url = '';
    for (const k in data) {
      const value = data[k] !== undefined ? data[k] : '';
      url += `&${k}=${encodeURIComponent(value)}`;
    }
    return url ? url.substring(1) : '';
  }
  getUserInfo() {
    this.post('/v2/api/mobile/memberInfo').then(success => {
      let data = success.data;
      data.pwd = this.LoginUserInfo.pwd;
      data.token = this.LoginUserInfo.token;
      this.LoginUserInfo = data;
      //存储用户信息
      localStorage.setItem('LoginUserInfo', JSON.stringify(this.LoginUserInfo));
    })
  }
  /**
   * 
   * @param callback 扫码看书
   */
  saomaAddBook(callback?) {
    if (this.unbarcodeScanner) return false;
    this.dialogs.alert('您正在使用扫码加书功能，请将摄像头对准图书二维码', '温馨提示', '确定').then(() => {
      this.unbarcodeScanner = true;
      setTimeout(() => {
        this.unbarcodeScanner = false;
      }, 3000);
      this.barcodeScanner.scan().then((success) => {
        this.unbarcodeScanner = false;
        let search = success.text.split('?')[1];
        let searchs = search.split('&');
        let param = {
          org_id: null,
          book_id: null,
          device_id: null,
          book_type: null
        }
        for (var key in searchs) {
          if (searchs[key].indexOf('o=') != -1) {
            param['org_id'] = searchs[key].replace('o=', '');
          }
          if (searchs[key].indexOf('b=') != -1) {
            param['book_id'] = searchs[key].replace('b=', '');
          }
          if (searchs[key].indexOf('d=') != -1) {
            param['device_id'] = searchs[key].replace('d=', '');
          }
          if (searchs[key].indexOf('t=') != -1) {
            param['book_type'] = searchs[key].replace('t=', '');
          }
        }
        if (param.org_id && param.book_id && callback) {
          //绑定机构
          if(this.LoginUserInfo && this.LoginUserInfo.org_id != param.org_id){

          }
          callback(param)
        }
      })
    })
  }
  /**
   * 网络
   */
  getNetEork(): string {
    return this.network;
  }

  /**
  * 是否真机环境
  */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }
}