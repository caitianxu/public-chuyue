import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { AppService } from '../../app/app.service';

import { LoginPage } from '../login/login';
import { MePage } from '../me/me';

declare let jQuery;
@Component({
  selector: 'page-audioplay',
  templateUrl: 'audioplay.html'
})
export class AudioplayPage {
  audio: any;
  audioList: Array<any> = [];
  leave: boolean = false;
  loop: boolean = false;
  issc: boolean = false;
  stop: boolean = true;
  param = {
    pageSize: 100,
    pageNum: 1,
    cid: null,
    org_id: 296
  };
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,
    public service: AppService,
    public params: NavParams) {
    this.param.cid = this.params.data.audio_cat_id;
    //获取播放列表
    this.service.post('/api/hbjt/audio/getList', this.param).then(res => {
      this.audioList = res.data.rows;
    })
  }
  ionViewDidLoad() {
    this.audioCreate(this.params.data);
  }
  audioCreate(item) {
    this.audio = { ...item };
    document.getElementById("myAudio").setAttribute("src", this.audio.audio_url);
    if (this.service.LoginUserInfo) {
      //判断是否收藏
      this.service.post('/api/hbjt/searchcollect', {
        type: 2,
        member_id: this.service.LoginUserInfo.member_id,
        media_id: this.audio.audio_id
      }).then(res => {
        if (res.data)
          this.issc = true;
        else
          this.issc = false;
      })
    }
  }
  audioPause() {
    if (this.stop) {
      jQuery('#myAudio')[0].play();
    }
    else {
      jQuery('#myAudio')[0].pause();
    }
  }
  _load() {
    console.log('load')
  }
  _play() {
    this.stop = false;
  }
  _ended() {
    if (this.loop) {
      jQuery('#myAudio')[0].play();
    }
    else {
      this.audioNext();
    }
  }
  _pause() {
    this.stop = true;
  }
  audioLast() {
    let i = -1;
    this.audioList.forEach((element, index) => {
      if (element.audio_id == this.audio.audio_id) {
        i = index;
      }
    });
    if (i > 0) {
      this.audioCreate(this.audioList[i - 1]);
    }
    else {
      this.audioCreate(this.audioList[this.audioList.length - 1]);
    }
  }
  audioNext() {
    let i = -1;
    this.audioList.forEach((element, index) => {
      if (element.audio_id == this.audio.audio_id) {
        i = index;
      }
    });
    if (i >= 0 && i < this.audioList.length - 1) {
      this.audioCreate(this.audioList[i + 1]);
    }
    else {
      this.audioCreate(this.audio = this.audioList[0]);
    }
  }
  audiosc() {
    if (this.service.LoginUserInfo) {
      this.issc = !this.issc;
      this.service.loadingStart();
      this.service.post('/api/hbjt/addcollect', {
        type: 2,
        member_id: this.service.LoginUserInfo.member_id,
        media_id: this.audio.audio_id
      }).then(res => {
        this.service.loadingEnd();
      })
    }
    else {
      this.navCtrl.push(LoginPage);
    }
  }
  setloop() {
    this.loop = !this.loop;
  }
  toMePage() {
    this.navCtrl.push(MePage);
  }
}
