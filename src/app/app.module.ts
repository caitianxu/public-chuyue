import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//主页面
import { HomePage } from '../pages/home/home';
import { BooksPage } from '../pages/books/books';
import { AudiosPage } from '../pages/audios/audios';
import { VideosPage } from '../pages/videos/videos';
import { MePage } from '../pages/me/me';
import { TabsPage } from '../pages/tabs/tabs';

//子页面
import { BookinfoPage } from '../pages/bookinfo/bookinfo';
import { AudioinfoPage } from '../pages/audioinfo/audioinfo';
import { AudioplayPage } from '../pages/audioplay/audioplay';
import { VideoinfoPage } from '../pages/videoinfo/videoinfo';
import { SearchPage } from '../pages/search/search';
import { LoginPage } from '../pages/login/login';
import { SetingPage } from '../pages/seting/seting';
import { NickNamePage } from '../pages/nickname/nickname';
import { QianmingPage } from '../pages/qianming/qianming';
import { PhonePage } from '../pages/phone/phone';
import { EmailPage } from '../pages/email/email';
import { ReadcodePage } from '../pages/readcode/readcode';
import { ScPage } from '../pages/sc/sc';
import { VaPage } from '../pages/va/va';
import { ReviewsPage } from '../pages/reviews/reviews';

//插件
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Dialogs } from '@ionic-native/dialogs';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer } from '@ionic-native/file-transfer';
import { StreamingMedia } from '@ionic-native/streaming-media';

//组件
import { Http, HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { AppService } from './app.service';
import { HttpService } from './http.service';

export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions) {
  let service = new HttpService(xhrBackend, requestOptions);
  return service;
}

@NgModule({
  declarations: [
    MyApp, HomePage, BooksPage, AudiosPage, VideosPage, MePage, TabsPage,
    BookinfoPage, AudioinfoPage, SearchPage, LoginPage, AudioplayPage, VideoinfoPage,
    SetingPage, NickNamePage, QianmingPage, PhonePage, EmailPage, ReadcodePage, ScPage, VaPage, ReviewsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      pageTransition: 'ios-transition',
      backButtonText: '',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsHideOnSubPages: 'true' //隐藏全部子页面tabs
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, HomePage, BooksPage, AudiosPage, VideosPage, MePage, TabsPage,
    BookinfoPage, AudioinfoPage, SearchPage, LoginPage, AudioplayPage, VideoinfoPage,
    SetingPage, NickNamePage, QianmingPage, PhonePage, EmailPage, ReadcodePage, ScPage, VaPage, ReviewsPage
  ],
  providers: [
    HttpService, AppService,
    {
      provide: Http,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions]
    },
    StatusBar, SplashScreen,
    BarcodeScanner, Dialogs, ImagePicker, FileTransfer, StreamingMedia,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
