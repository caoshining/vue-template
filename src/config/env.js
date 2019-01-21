/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl;//不变
let baseImgPath;
let baseXmlUrl;
let baseIps;

if (process.env.NODE_ENV == 'development') {
  baseXmlUrl = 'http://121.gs.9188.com/data'

  baseUrl = 'http://121.gs.9188.com'
  baseImgPath = 'http://121.gs.9188.com'
    
  baseIps = {
    ip: 'http://10.0.30.40',
    path:'/#/newsflash/'
  }
} else {
  //线上
  baseUrl = ''
  baseImgPath = ''
  baseXmlUrl = ''
  baseIps = {
    ip:'https://file.liaodaotiyu.com/',
    path:'/#/newsflash/'
  }
}

export {
  baseUrl,
  baseImgPath,
  baseXmlUrl,
  baseIps
}
