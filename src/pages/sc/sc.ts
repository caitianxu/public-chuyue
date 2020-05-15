import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { AudioinfoPage } from '../audioinfo/audioinfo';


@Component({
  selector: 'page-sc',
  templateUrl: 'sc.html'
})
export class ScPage {
  param = {
    member_id: null,
    member_token: null,
    pageNum: 0,
    pageSize: 10,
    total: 0,
    more: false,
    type: 2
  }
  readRecord = [];
  loadMore = false
  constructor(public navCtrl: NavController, private service: AppService) {

  }

  ionViewWillEnter() {
    this.param.member_id = this.service.LoginUserInfo.member_id;
    this.param.member_token = this.service.LoginUserInfo.token;
    this.readRecord = [];
    this.pageinit();
  }
  pageinit() {
    this.param.total = 0;
    this.param.pageNum = 0;
    this.param.more = false
    this.loadData();
  }
  loadData(infiniteScroll?) {
    if (this.param.total <= this.readRecord.length && this.param.total > 0) {
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      this.param['more'] = true;
      return false;
    }
    this.param.pageNum += 1;
    this.service.post('/api/hbjt/getcollectlist', this.param).then(res => {
      console.log(res)
      this.param.total = res.data.total;
      res.data.rows.forEach(element => {
        if (element)
          this.readRecord.push(element);
      });
      console.log(this.readRecord)
      if (res.data.total == 0 || this.param.total <= this.readRecord.length) {
        this.param['more'] = true;
      }
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    })
  }
  formatDate(str) {
    var date = new Date(Date.parse(str.replace(/-/g, "/")));
    return (date.getMonth() + 1) + "月" + date.getDate() + "日 " + date.getHours() + ":" + date.getMinutes();
  }
  delAll() {
    if (this.readRecord.length) {
      this.service.dialogs.confirm('你确定要删除这些收藏记录吗?').then(index => {
        if (index == 1) {
          this.delitem(this.readRecord[0]);
        }
      })
    }
  }
  delitem(item) {
    this.readRecord.splice(0, 1);
    this.service.post('/api/hbjt/addcollect', {
      media_id: item.audio_id,
      member_id: this.service.LoginUserInfo.member_id,
      type: 2
    }).then(res => {
      if (this.readRecord.length) {
        this.delitem(this.readRecord[0]);
      }
      else {
        this.pageinit();
      }
    })
  }
  toAudioinfoPage(item) {
    this.navCtrl.push(AudioinfoPage, item);
  }
}
