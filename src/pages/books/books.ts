import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { AppService } from '../../app/app.service';

import { BookinfoPage } from '../bookinfo/bookinfo';
import { SearchPage } from '../search/search';
import { MePage } from '../me/me';

@Component({
  selector: 'page-books',
  templateUrl: 'books.html'
})
export class BooksPage {
  param = {
    pageSize: 15,
    pageNum: 0,
    book_cat_id: null,
    total: 0,
    more: false
  };
  topData: any = [{
    book_cat_id: '0',
    book_cat_name: '热门图书'
  }, {
    book_cat_id: '-1',
    book_cat_name: '最新推荐'
  }]; //分类
  searchData: any = [];

  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private service: AppService) {

  }
  clearData(){
    this.topData = [{
      book_cat_id: '0',
      book_cat_name: '热门图书'
    }, {
      book_cat_id: '-1',
      book_cat_name: '最新推荐'
    }];
    this.searchData = [];
  }
  ionViewWillEnter() {
    this.service.loadingStart();
    this.clearData();
    this.service.post('/v2/api/bookCat/getList').then(res => {
      console.log('分类')
      this.topData.push(...res.data);
      console.log(this.topData)
      this.getlistData(this.topData[0].book_cat_id);
    })
  }
  getlistData(book_cat_id) {
    this.param['book_cat_id'] = book_cat_id;
    this.param['pageNum'] = 0;
    this.service.loadingStart();
    this.getlistDataMore();
  }
  getlistDataMore(infiniteScroll?) {
    this.param['pageNum'] += 1;
    if (this.param.total <= this.searchData.length && this.param.total > 0 && this.param['pageNum'] > 0) {
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      this.param['more'] = true;
      this.service.loadingEnd();
      return false;
    }
    this.service.post('/v2/api/book/getList', this.param).then(res => {
      this.param['total'] = res.data.total;
      if (this.param['pageNum'] == 1) {
        this.searchData = [];
        setTimeout(() => {
          this.content.scrollToTop();
        }, 500)
      }
      this.searchData.push(...res.data.rows);
      this.service.loadingEnd();
      if (res.data.total == 0 || this.param.total <= this.searchData.length) {
        this.param['more'] = true;
      }
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      this.service.loadingEnd();
    })
  }


  //图书详情
  toBookinfoPage(item) {
    this.navCtrl.push(BookinfoPage, {
      id: item.book_id,
      cname: item.book_name
    })
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
