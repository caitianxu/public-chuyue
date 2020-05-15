import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from '../../app/app.service';

declare let navigator: any;
declare let jQuery: any;
@Component({
  selector: 'page-readcode',
  templateUrl: 'readcode.html'
})
export class ReadcodePage {
  param = {
    member_id: null,
    member_token: null,
    pageNum: 0,
    pageSize: 10,
    total: 0,
    org_id: 296,
    more: false,
    clinet_type: 'QY'
  }
  readRecord: any;
  loadMore = false
  constructor(public navCtrl: NavController, private service: AppService) {

  }

  ionViewWillEnter() {
    this.param.member_id = this.service.LoginUserInfo.member_id;
    this.param.member_token = this.service.LoginUserInfo.token;
    this.pageinit();
    jQuery.readePageBack = (name) =>{
      this.service.statusBar.styleBlackTranslucent();
    }
  }
  pageinit() {
    this.param.total = 0;
    this.param.pageNum = 0;
    this.param.more = false
    this.loadData();
  }
  loadData() {
    this.service.post('/v2/api/bookShelf/getList', this.param).then(res => {
      console.log(res)
      this.readRecord = res.data;
    })
  }
  formatDate(str) {
    var date = new Date(Date.parse(str.replace(/-/g, "/")));
    return (date.getMonth() + 1) + "月" + date.getDate() + "日 " + date.getHours() + ":" + date.getMinutes();
  }
  delAll() {
    this.service.dialogs.confirm('你确定要删除这些收藏记录吗?').then(index => {
      if (index == 1) {
        let ps = this.readRecord.map((item) => item.bk_id);
        console.log(ps)
        this.service.post('/v2/api/bookShelf/delBook',{
          book_id: ps.toString()
        }).then(res => {
          this.pageinit();
        })
      }
    })
  }
  
  toread(item) {
    let options = {
      ctxPath: this.service.ctxPath.toString(),
      chid: null,
      pagenum: null,
      bookid: item.bk_id.toString(),
      bookname: item.bk_name.toString(),
      booktype: "2",
      userid: this.service.LoginUserInfo.member_id.toString(),
      token: this.service.LoginUserInfo.token.toString()
    }
    navigator.BookRead.reader(options);
  }
}
