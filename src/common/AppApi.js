
/* 判断设备 */
export const browser = {
  versions: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Linux') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web程序，没有头部与底部
      _weixin: u.toLowerCase().indexOf("micromessenger") > -1,// 微信
      qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };
  }(),
}

/* 调用app中的方法 */
export const AppJiek = {
  setWebviewHeight: function (data) {//原生登录接口
    if (browser.versions.android) {//登录调用原生接口
      window.liaodaoandroid.setWebviewHeight(data)
    }
    if (browser.versions.ios) {
      WebViewJavascriptBridge.callHandler('setWebviewHeight', data);
    }
  },
  CheckApp: function () {
    if (browser.versions.android) {
      if (window.caiyiandroid) {
        return true;
      } else {
        return false;
      }
    }
    if (browser.versions.ios) { //检查是否为app打开页面
    
    }
  },
  /*开启app*/
  OpenAppJudge(e) {
    const et = e.target;
    const config = {
      android: '',
      ios: '',
      href: ''
    };
    if (browser.versions.android) {
      et.href = config.android;
    } else if (browser.versions.ios) {
      et.href = config.ios;
    }
    setTimeout(function () {
      location.href = config.href;
    }, 2000);
  },
}