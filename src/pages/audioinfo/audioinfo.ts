import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { AppService } from '../../app/app.service';

import { LoginPage } from '../login/login';
import { AudioplayPage } from '../audioplay/audioplay';



@Component({
  selector: 'page-audioinfo',
  templateUrl: 'audioinfo.html'
})
export class AudioinfoPage {
  audio: any;
  issc: boolean = false;
  hotAudio: any;
  title: any = '';
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public service: AppService, public params: NavParams) {

  }
  ionViewDidLoad() {
    this.reload(this.params.data);
  }
  reload(au) {
    console.log(au)
    if (this.audio) {
      this.content.scrollToTop();
    }
    else {
      this.service.post('/api/hbjt/getaudios').then(video => {
        this.hotAudio = video.data.rows;
      })
    }
    this.audio = au;
    this.title = this.audio.audio_title;
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
  addshlf() {
    if (this.service.LoginUserInfo) {
      this.issc = !this.issc;
      this.service.loadingStart();
      this.service.post('/api/hbjt/addcollect', {
        type: 2,
        member_id: this.service.LoginUserInfo.member_id,
        media_id: this.audio.audio_id
      }).then(res => {
        this.service.loadingEnd();
        this.issc = true;
      })
    }
    else {
      this.navCtrl.push(LoginPage);
    }
  }
  toread() {
    if (this.service.LoginUserInfo) {
      this.navCtrl.push(AudioplayPage, this.audio);
    }
    else {
      this.navCtrl.push(LoginPage);
    }
  }
}
