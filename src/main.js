// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import Vuex from 'vuex'
import store from './store/'
import { sync } from 'vuex-router-sync' // 插件引入
import router from './router'
import '@/axiosConfig' // axios请求配置
import '@/permission' // 权限
import 'lib-flexible'
import 'babel-polyfill' // 解决兼容

import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

import { ConfigPlugin, AppPlugin, LoadingPlugin, ToastPlugin, ConfirmPlugin } from "vux"

//  加密包
import crypto from 'crypto'
import VueRouter from 'vue-router';
Vue.prototype.Crypto = crypto;

Vue.use(Vuex)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
// Vue.use(ConfirmPlugin)

if (process.env.platform === "app") {
  Vue.use(AppPlugin, store)
}

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(ConfigPlugin, {
    $layout: 'VIEW_BOX' 
    // global config for VUX, since v2.5.12
})

Vue.use(Vuex, store)

sync(store, router)

//金额高精度计算
Math.floatSub = function(arg1,arg2){    
  var r1,r2,m,n;    
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}    
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}    
  m=Math.pow(10,Math.max(r1,r2));    
  //动态控制精度长度    
  n=(r1>=r2)?r1:r2;    
  return ((arg1*m-arg2*m)/m).toFixed(n);    
}

// 解决APP内主工程页面在APP-IOS内不显示
var browser = {
  versions: function() {
  var u = navigator.userAgent, 
  app = navigator.appVersion;
  return {
    trident: u.indexOf('Trident') > -1, //IE内核
    presto: u.indexOf('Presto') > -1, //opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, //是否iPad
    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
  };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
  let getHref = location.href
  if(browser.versions.ios&&getHref.indexOf('%23')!==-1&&getHref.indexOf('appversion')!==-1){
    var paramsArr = location.href.match(/\?\S+/)[0].replace('?', '').split('&');
    let params = {};
    for (var i = 0; i < paramsArr.length; i++) {
        var tmp = paramsArr[i].split('=');
        params[tmp[0]] = tmp[1];
    }
    params.appversion=params.appversion.replace(/\./g,'')
    if(Number(params.appversion)<475){
      location.href = decodeURIComponent(location.href)
    }
  }

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
