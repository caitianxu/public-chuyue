import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { SearchPage } from '../search/search';
import { BookinfoPage } from '../bookinfo/bookinfo';
import { VideoinfoPage } from '../videoinfo/videoinfo';
import { MePage } from '../me/me';

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html'
})
export class VideosPage {
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
    this.service.post('/api/hbjt/video/getVideoCats').then(res => {
      console.log('分类')
      this.topData.push(...res.data);
      console.log(this.topData)
      this.getlistData(this.topData[0].video_cat_id);
    })
  }
  getlistData(video_cat_id) {
    this.param['cid'] = video_cat_id;
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
    this.service.post('/api/hbjt/video/getList', this.param).then(res => {
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
  toVadioinfoPage(item) {
    this.navCtrl.push(VideoinfoPage, item);
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
