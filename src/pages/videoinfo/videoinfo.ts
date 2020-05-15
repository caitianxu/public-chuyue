import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-videoinfo',
  templateUrl: 'videoinfo.html'
})
export class VideoinfoPage {

  title: any;
  video: any;
  issc: boolean = false;
  hotVideo: any;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, private streamingMedia: StreamingMedia, public service: AppService, public params: NavParams) {


  }
  ionViewDidLoad() {
    this.reload(this.params.data);
  }
  reload(video) {
    if (this.video) {
      this.content.scrollToTop();
    }
    else {
      this.service.post('/api/hbjt/getvideos').then(video => {
        this.hotVideo = video.data.rows;
      })
    }
    this.video = video;
    this.title = video.video_title;
    console.log(video)
    if (this.service.LoginUserInfo) {
      //判断是否收藏
      this.service.post('/api/hbjt/searchcollect', {
        type: 1,
        member_id: this.service.LoginUserInfo.member_id,
        media_id: this.video.video_id
      }).then(res => {
        if (res.data)
          this.issc = true;
        else
          this.issc = false;
      })
    }
  }
  toread() {
    if (this.service.LoginUserInfo) {
      let options: StreamingVideoOptions = {
        successCallback: () => { console.log('Video played') },
        errorCallback: (e) => { console.log('Error streaming') },
        orientation: 'landscape',
        shouldAutoClose: true,
        controls: true
      };
      this.streamingMedia.playVideo(this.video.video_url, options);
    }
    else {
      this.navCtrl.push(LoginPage);
    }
  }

  sc() {
    //发送播放记录
    if (!this.issc) {
      this.service.post('/api/hbjt/addcollect', {
        type: 1,
        member_id: this.service.LoginUserInfo.member_id,
        media_id: this.video.video_id
      }).then(res => {
        this.service.loadingEnd();
        this.issc = true;
      })
    }
  }
}
