import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { SearchPage } from '../search/search';
import { BookinfoPage } from '../bookinfo/bookinfo';
import { AudioinfoPage } from '../audioinfo/audioinfo';
import { MePage } from '../me/me';

@Component({
  selector: 'page-audios',
  templateUrl: 'audios.html'
})
export class AudiosPage {
  param = {
    pageSize: 12,
    pageNum: 0,
    cid: null,
    total: 0,
    more: true
  };
  topData: any = []; //分类
  searchData: any = [];

  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private service: AppService) {

  }
  clearData(){
    this.topData = [];
    this.searchData = [];
  }
  ionViewWillEnter() {
    this.service.loadingStart();
    this.clearData();
    this.service.post('/api/hbjt/audio/getAudioCats').then(res => {
      console.log('分类')
      this.topData.push(...res.data);
      console.log(this.topData)
      this.getlistData(this.topData[0].audio_cat_id);
    })
  }
  getlistData(audio_cat_id) {
    this.param['cid'] = audio_cat_id;
    this.param['pageNum'] = 0;
    this.param['more'] = true;
    this.service.loadingStart();
    this.getlistDataMore();
  }
  getlistDataMore(infiniteScroll?) {
    if (this.param.more === false) {
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      this.service.loadingEnd();
      return false;
    }
    this.param['pageNum'] += 1;
    this.service.post('/api/hbjt/audio/getList', this.param).then(res => {
      this.param['total'] = res.data.total;
      if (this.param['pageNum'] == 1) {
        this.searchData = [];
        setTimeout(() => {
          this.content.scrollToTop();
        }, 500)
      }
      this.searchData.push(...res.data.rows);
      if (res.data.total == 0 || res.data.total <= this.searchData.length) {
        this.param['more'] = false;
      }
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      this.service.loadingEnd();
    })
  }

  toBookinfoPage(id: any) {
    this.navCtrl.push(BookinfoPage, {
      id: id
    })
  }

  //音频详情
  toAudioinfoPage(item) {
    this.navCtrl.push(AudioinfoPage, item);
  }
  //搜索
  toSearchPage() {
    this.navCtrl.push(SearchPage);
  }
  //我的
  toMePage() {
    this.navCtrl.push(MePage);
  }
  //扫码
  saomaAddBook() {
    this.service.saomaAddBook(param => {
      this.navCtrl.push(BookinfoPage, {
        id: param.book_id,
        cname: param.book_name
      })
    })
  }
}
