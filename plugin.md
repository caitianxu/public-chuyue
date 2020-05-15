
ionic cordova build android --prod --release

//生成apk文件
cordova build --release android 

//生成秘钥文件
keytool -genkey -v -keystore wdyl.keystore -alias wdyl.keystore -keyalg RSA -validity 20000
//CN=cai, OU=cai, O=cai, L=cai, ST=cai, C=cai
//123456  123456

//将秘钥文件复制到apk目录
jarsigner -verbose -keystore wdyl.keystore -signedjar chuyue.apk android-release-unsigned.apk wdyl.keystore

//检测APK是否有效
jarsigner  -verbose -certs -verify wdyl.apk 





//生成打包秘钥
CN=cai, OU=cai, O=cai, L=cai, ST=cai, C=cai  123456
keytool -genkey -v -keystore release-key.keystore -alias cordova-wdyl -keyalg RSA -keysize 2048 -validity 10000

QQ插件： cordova-plugin-qqsdk  安装：$cordova plugin add cordova-plugin-qqsdk --variable QQ_APP_ID=YOUR_QQ_APPID --save 
微博插件：cordova-plugin-weibosdk  安装： $cordova plugin add cordova-plugin-weibosdk --variable WEIBO_APP_ID=YOUR_WEIBO_APPID --save 
微信插件：cordova-plugin-wechat  安装： $cordova plugin add cordova-plugin-wechat --variable wechatappid=YOUR_WECHAT_APPID --save

————————————微信————————————
ionic cordova plugin add cordova-plugin-wechat --variable wechatappid=wx1726323de580e8ba
https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx1726323de580e8ba&secret=80448ccbd8c9ef57a16d5a15d3dfc269&code=071Dgej60cYVPG1uW1h601E5j60Dgejw&grant_type=authorization_code

APP_ID = "wx1726323de580e8ba";
KEY_ID = "af2cd31j20177d265320ce671fzwwfac";
SECRET = "80448ccbd8c9ef57a16d5a15d3dfc269";
————————————微信————————————

————————————QQ————————————
ionic cordova plugin add cordova-plugin-qqsdk --variable QQ_APP_ID=1105996385
————————————QQ————————————

————————————微博————————————
ionic cordova plugin add cordova-plugin-weibosdk --variable WEIBO_APP_ID= 1221184477
————————————微博————————————

//ios 内购

$ ionic cordova plugin add cordova-plugin-inapppurchase
$ npm install --save @ionic-native/in-app-purchase
import { InAppPurchase } from '@ionic-native/in-app-purchase';

状态栏
ionic cordova plugin add https://github.com/apache/cordova-plugin-statusbar.git
npm install --save @ionic-native/status-bar
import { StatusBar } from '@ionic-native/status-bar'

启动页
import { SplashScreen } from '@ionic-native/splash-screen';

事件驱动
$ npm install --save @ionic-native/device
import { Device } from  '@ionic-native/device’;

支付宝
$ cordova plugin add  https://github.com/ejiyuan/cordova-plugin-alipay.git --variable APP_ID=2088911360032984 --variable SANDBOX_MODE=false
cordova plugin add https://github.com/ejiyuan/cordova-plugin-alipay.git --variable APP_ID=2088911360032984 --variable SANDBOX_MODE=false
cordova plugin add https://github.com/DreamMoon/cordova-plugin-alipay.git --variable PARTNER_ID=2088911360032984
cordova plugin add cordova-plugin-alipay-v2 --variable APP_ID=2088911360032984



   // "cordova-plugin-advanced-http": {
    //     "source": {
    //         "type": "registry",
    //         "id": "cordova-plugin-advanced-http@^1.5.9"
    //     },
    //     "is_top_level": true,
    //     "variables": {}
    // },
    // "BookRead": {
    //     "source": {
    //         "type": "local",
    //         "path": "../BookRead"
    //     },
    //     "is_top_level": true,
    //     "variables": {}
    // },

//控制台日志
cordova plugin add cordova-plugin-console


Camera   拍照摄像
$ ionic cordova plugin add cordova-plugin-camera
$ npm install --save @ionic-native/camera
import { Camera, CameraOptions } from '@ionic-native/camera';

Http 网络请求
$ ionic cordova plugin add cordova-plugin-advanced-http
$ npm install --save @ionic-native/http
import { HTTP } from '@ionic-native/http';


Network  网络
$ ionic cordova plugin add cordova-plugin-network-information
$ npm install --save @ionic-native/network
import { Network } from '@ionic-native/network';

Brightness  亮度
$ ionic cordova plugin add cordova-plugin-brightness
$ npm install --save @ionic-native/brightness
import { Brightness } from '@ionic-native/brightness';


App Update  app自动更新
$ ionic cordova plugin add cordova-plugin-app-update
$ npm install --save @ionic-native/app-update
import { AppUpdate } from '@ionic-native/app-update';


Alipay 支付宝
$ ionic cordova plugin add cordova-alipay-base --variable ALI_PID=com.cjzww.cjreader
$ npm install --save @ionic-native/alipay
import { Alipay, AlipayOrder } from '@ionic-native/alipay';


Dialogs 对话框
$ ionic cordova plugin add cordova-plugin-dialogs
$ npm install --save @ionic-native/dialogs
import { Dialogs } from '@ionic-native/dialogs';

File 文件管理
$ ionic cordova plugin add cordova-plugin-file
$ npm install --save @ionic-native/file
import { File } from '@ionic-native/file';


Barcode Scanner  二维码
$ ionic cordova plugin add phonegap-plugin-barcodescanner
$ npm install --save @ionic-native/barcode-scanner
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


Zip 文件解压
$ ionic cordova plugin add cordova-plugin-zip
$ npm install --save @ionic-native/zip
import { Zip } from '@ionic-native/zip';


Safari View Controller 浏览器打开
$ ionic cordova plugin add cordova-plugin-safariviewcontroller
$ npm install --save @ionic-native/safari-view-controller
import { SafariViewController } from '@ionic-native/safari-view-controller';


Open Native Settings  打开原生设置
$ ionic cordova plugin add cordova-open-native-settings
$ npm install --save @ionic-native/open-native-settings
import { OpenNativeSettings } from '@ionic-native/open-native-settings';


Market   在应用商店或市场打开一个APP
$ ionic cordova plugin add cordova-plugin-market
$ npm install --save @ionic-native/market
import { Market } from '@ionic-native/market';


Launches in app Browser  在应用浏览器启动
$ ionic cordova plugin add cordova-plugin-inappbrowser
$ npm install --save @ionic-native/in-app-browser
import { InAppBrowser } from '@ionic-native/in-app-browser';


Image Picker 选择图片
$ ionic cordova plugin add cordova-plugin-telerik-imagepicker --variable PHOTO_LIBRARY_USAGE_DESCRIPTION="your usage message"
$ npm install --save @ionic-native/image-picker
import { ImagePicker } from '@ionic-native/image-picker';


File Transfer  上传下载
$ ionic cordova plugin add cordova-plugin-file-transfer
$ npm install --save @ionic-native/file-transfer
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


