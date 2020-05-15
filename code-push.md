https://mobile.azure.com/apps
账号：464515804@qq.com
密码：1Qaz2Wsx2018


code-push app add ionic2_tabs_android android cordova
│ Production │ gFYrbt_wDZEcqaTj_OREQZl86N9D815301c8-d1bd-4c73-9315-a783508ac6c8 │
├────────────┼──────────────────────────
────────────────────────────────────────
┤
│ Staging    │ S_dh1w7Xgq3ELNGwbyZnDE5tSo3E815301c8-d1bd-4c73-9315-a783508ac6c8 │

code-push app add ionic2_tabs_ios ios cordova
────────────────────────────────────────
┤
│ Production │ cY3krh3sao3sFAuMqFGPcPcXfyGR815301c8-d1bd-4c73-9315-a783508ac6c8 │
├────────────┼──────────────────────────
────────────────────────────────────────
┤
│ Staging    │ yqM0biVP5Y3jUaZMVmEvPMbCM-ii815301c8-d1bd-4c73-9315-a783508ac6c8 │


https://www.jianshu.com/p/77c003dfa200


//盛天大作战-开宝箱

code-push app add openbox_android android cordova

│ Production │ pEPrmFootFEbOHjuSJB_9NwBsHxq815301c8-d1bd-4c73-9315-a783508ac6c8 │
├────────────┼──────────────────────────
────────────────────────────────────────
┤
│ Staging    │ kSZ3r-UpeIzgpDk09SL8gWENdEzQ815301c8-d1bd-4c73-9315-a783508ac6c8 │

code-push app add openbox_ios ios cordova
│ Production │ KIwHLM9G-ftJqYV2UNmkl3eegr5w815301c8-d1bd-4c73-9315-a783508ac6c8 │
├────────────┼──────────────────────────
────────────────────────────────────────
┤
│ Staging    │ SxdiBr_DOpC77i-z70IE3ITV2qrK815301c8-d1bd-4c73-9315-a783508ac6c8 │


//长江阅读-舞动夷陵

 Production │ 478WywE1RBSgTT7KJUCwlcvUaFhZ815301c8-d1bd-4c73-9315-a783508ac6c8 │
├────────────┼───────────────────────────
 ────────────────────────────────────────┤
│ Staging    │ _nbZVxaEdFrslF7cYzlx8iSTozC1815301c8-d1bd-4c73-9315-a783508ac6c8

│ Production │ vjjusmL5gosxVxNx-FF6AlMR-E_3815301c8-d1bd-4c73-9315-a783508ac6c8 │
├────────────┼────────────────────────────
 ──────────────────────────────────────┤
│ Staging    │ fYTOqtUdZQUapd6rTGpP3XaowehW815301c8-d1bd-4c73-9315-a783508ac6c8


//第一步 全局按照
cnpm install -g typescript
cnpm install -g typings
cnpm install -g tslint
cnpm install -g code-push-cli

//第二步 登录code-push服务端
code-push login

//第三步 创建项目
code-push app add ionic2_tabs_android android cordova
code-push app add ionic2_tabs_ios ios cordova

//第四步 环境准备
ionic cordova plugin add cordova-plugin-code-push
cnpm install --save @ionic-native/code-push

//第五步 编写热更新代码
this.codePush.sync({key}).subscribe(res => {})

//第六步 查看APP发布状态
code-push deployment list <appName>
code-push deployment list wdyl_android

//第七步 发布版本并查看安装情况
code-push release-cordova <appName> <platform> --des "产品又在加需求"
//默认开发版本
code-push release-cordova wdyl_android android --des "我发布在开发版本" 
code-push release-cordova wdyl_android android -d "Production" --des "我是真实版本" 

//清空部署记录
code-push deployment clear <appName> <deploymentName>
//如:清空Staging状态的部署记录
code-push deployment clear wdyl_android Staging 

//手动安装 cordova
ionic integrations enable cordova
安装 python-2.7.15.amd64
首先 npm install -g node-gyp 
再次 npm install -g -production windows-build-tools 
再次 npm install --save node-sass

ionic serve 服务中断
方案一
npm install ws@3.3.2 --save-dev --save-exact

方案二
npm uninstall --save ws
npm install --save-dev @ionic/app-scripts@latest

$ ionic cordova plugin add cordova-plugin-qrscanner
$ npm install --save @ionic-native/qr-scanner

android:name="com.cjszyun.myreader.reader.AppData"

    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.FLASHLIGHT" />
    <uses-permission android:name="com.android.vending.BILLING" />
    <uses-permission android:name="android.permission.CAMERA" android:required="false" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />
    <uses-feature android:name="android.hardware.camera.front" android:required="false" />

    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.FLASHLIGHT" />
    <uses-feature android:name="android.hardware.camera" android:required="true" />
    <uses-permission android:name="com.android.vending.BILLING" />



