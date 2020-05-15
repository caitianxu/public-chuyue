import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AppService } from '../../app/app.service';


import { BookinfoPage } from '../bookinfo/bookinfo';
import { AudioinfoPage } from '../audioinfo/audioinfo';
import { VideoinfoPage } from '../videoinfo/videoinfo';
import { BooksPage } from '../books/books';
import { SearchPage } from '../search/search';
import { MePage } from '../me/me';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hotBook: any;
  hotVideo: any;
  hotAudio: any;
  constructor(public navCtrl: NavController, private service: AppService) {

  }

  ionViewWillEnter() {
    this.service.post('/api/hbjt/getbooks', {}).then(book => {
      this.hotBook = book.data.rows;
    })
    this.service.post('/api/hbjt/getvideos', {}).then(video => {
      this.hotVideo = video.data.rows;
    })
    this.service.post('/api/hbjt/getaudios', {}).then(audio => {
      this.hotAudio = audio.data.rows;
      this.service.loadingEnd();
    })
  }
  //视频详情
  toVadioinfoPage(item){
    this.navCtrl.push(VideoinfoPage, item);
  }
  //图书列表
  toBooklistPage() {
    this.navCtrl.push(BooksPage);
  }
  //音频列表
  toAudiolistPage() {
    this.navCtrl.parent.select(1);
  }
  //视频列表
  toVadiolistPage() {
    this.navCtrl.parent.select(2);
  }
  //音频详情
  toAudioinfoPage(item) {
    this.navCtrl.push(AudioinfoPage, item);
  }
  //图书详情
  toBookinfoPage(item) {
    this.navCtrl.push(BookinfoPage, {
      id: item.book_id,
      cname: item.book_name
    })
  }
  //搜索
  toSearchPage(){
    this.navCtrl.push(SearchPage);
  }
  //我的
  toMePage() {
    this.navCtrl.push(MePage);
  }
  //扫码
  saomaAddBook(){
    this.service.saomaAddBook(param => {
      this.navCtrl.push(BookinfoPage, {
        id: param.book_id,
        cname: param.book_name
      })
    })
  }
}
