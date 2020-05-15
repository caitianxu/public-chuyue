import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';


@Component({
  selector: 'page-va',
  templateUrl: 'va.html'
})
export class VaPage {
  param = {
    member_id: null,
    member_token: null,
    pageNum: 0,
    pageSize: 10,
    total: 0,
    more: false,
    type: 1
  }
  readRecord = [];
  loadMore = false
  constructor(public navCtrl: NavController, private streamingMedia: StreamingMedia, private service: AppService) {

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
      type: 1
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
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: true
    };
    // item.video_url = 'http://61.182.139.77/6572308C544488346DE32C4ABC/03000A01005B53D004E78444080CFF1317C344-FC98-4FA9-8B98-5E1C365F2765.mp4?ccode=0519&duration=174&expire=18000&psid=fc919867a067c50528bb039339c304c5&sp=&ups_client_netip=3a1355b0&ups_ts=1532722305&ups_userid=&utid=Go%2FfE29MMEoCAToTVWEJ2ddY&vid=XMzczMTI3MjAwNA%3D%3D&vkey=B7bc523cac66f9bc47f0db915ce965b42&s=efbfbd11efbfbd2defbf';
    this.streamingMedia.playVideo(item.video_url, options);
    //发送播放记录
    this.service.post('/api/hbjt/searchcollect', {
      type: 1,
      member_id: this.service.LoginUserInfo.member_id,
      media_id: item.video_id
    }).then(res => {
      if (!res.data) {
        this.service.post('/api/hbjt/addcollect', {
          type: 1,
          member_id: this.service.LoginUserInfo.member_id,
          media_id: item.video_id
        }).then(res => {
          this.service.loadingEnd();
        })
      }
    })
  }
}
