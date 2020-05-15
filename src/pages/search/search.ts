import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { BookinfoPage } from '../bookinfo/bookinfo';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  mySearchText: any;
  param = {
    searchText: '',
    pageNum: 0,
    pageSize: 10,
    pages: 1,
    total: 0,
    clinet_type: 'QY',
    more: false
  }
  searchData: Array<any> = [];
  constructor(public navCtrl: NavController, private service: AppService) {

  }
  search(infiniteScroll?) {
    if (this.param.total <= this.searchData.length && this.param.total > 0) {
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      this.param['more'] = true;
      return false;
    }
    this.param['searchText'] = this.mySearchText;
    this.param['pageNum'] += 1;
    this.service.post('/v2/api/book/getList', this.param).then(res => {
      console.log(res)
      this.param.total = res.data.total;
      this.searchData.push(...res.data.rows);
      if (res.data.total == 0 || this.param.total <= this.searchData.length ) {
        this.param['more'] = true;
      }
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      this.service.loadingEnd();
    })
  }
  ionViewDidLoad() {
    this.service.loadingStart();
    this.search();
  }
  onInput($event) {
    this.param['pageNum'] = 0;
    this.param['more'] = false;
    this.searchData = [];
    this.search();
  }
  //图书详情
  toBookinfoPage(item) {
    this.navCtrl.push(BookinfoPage, {
      id: item.book_id,
      cname: item.book_name
    })
  }
}
