import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { LoginPage } from '../login/login';
import { SetingPage } from '../seting/seting';
import { ReadcodePage } from '../readcode/readcode';
import { ScPage } from '../sc/sc';
import { VaPage } from '../va/va';
import { ReviewsPage } from '../reviews/reviews';
import { PhonePage } from '../phone/phone';

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  convertData = {
    today: 0,
    total: 0,
    book: 0,
    order: 0,
    comments: 0
  }
  constructor(public navCtrl: NavController, private service: AppService) {

  }
  ionViewWillEnter() {
    console.log(this.service.LoginUserInfo)
    if (this.service.LoginUserInfo) {
      this.service.post('/v2/api/member/readCount').then(res => {
        this.convertData['today'] = res.data.todayTime;
        this.convertData['total'] = res.data.allTime;
        this.convertData['book'] = res.data.bookNums;
        this.convertData['order'] = res.data.rank;
        this.convertData['comments'] = res.data.reviewNum;
      })
    }
  }
  tologin() {
    this.navCtrl.push(LoginPage);
  }
  tologout() {
    this.service.LoginUserInfo = null;
    localStorage.clear();
    this.convertData = {
      today: 0,
      total: 0,
      book: 0,
      order: 0,
      comments: 0
    }
  }
  //前往设置
  to_seting() {
    if (this.service.LoginUserInfo) {
      this.navCtrl.push(SetingPage);
    }
    else {
      this.tologin();
    }
  }
  toReadCode() {
    if (this.service.LoginUserInfo) {
      this.navCtrl.push(ReadcodePage);
    }
    else {
      this.tologin();
    }
  }
  tosc() {
    if (this.service.LoginUserInfo) {
      this.navCtrl.push(ScPage);
    }
    else {
      this.tologin();
    }
  }
  tova() {
    if (this.service.LoginUserInfo) {
      this.navCtrl.push(VaPage);
    }
    else {
      this.tologin();
    }
  }
  toReviews() {
    if (this.service.LoginUserInfo) {
      this.navCtrl.push(ReviewsPage);
    }
    else {
      this.tologin();
    }
  }
  setPhone() {
    this.navCtrl.push(PhonePage);
  }
}
