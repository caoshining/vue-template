import axios from 'axios'
import { baseUrl , baseImgPath,baseXmlUrl } from '../config/env'
const APIUtils = {
  base: baseUrl,
  baseXmlUrl,
  XML2jsobj: function (node) {
    var data = {}
    // append a value
    function Add(name, value) {
      if (data[name]) {
        if (data[name].constructor !== Array) {
          data[name] = [data[name]]
        }
        data[name][data[name].length] = value
      }
      else {
        data[name] = value
      }
    }
    // element attributes
    var c, cn
    if (node.attributes) {
      for (c = 0; cn = node.attributes[c]; c++) {
        Add(cn.name, cn.value);
      }
    }
    // child elements
    for (c = 0; cn = node.childNodes[c]; c++) {
      if (cn.nodeType === 1) {
        if (cn.childNodes.length === 1 && cn.firstChild.nodeType === 3) {
          // text value
          Add(cn.nodeName, cn.firstChild.nodeValue);
        }
        else {
          // sub-object
          Add(cn.nodeName, this.XML2jsobj(cn));
        }
      }
    }
    return data
  },
  code: function (d) {
    return d.match(/code="(\d+?)"/g)[0].split('=')[1].replace(/"/g, '')
  },
  /**
   * 公用post请求
   * @param url
   * @param params
   * @returns {Promise.<TResult>}
   */
  commonPost: (url, params ) => {
    let time = new Date().getTime()
    return axios({
      url: APIUtils.base+url,
      method: 'post',
      data: params,
      timeout: 8000,
      responseType: 'json',
      transformRequest: [function (data) {
        // 将POST 的数据以Formdata提交
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    }).then(res => {
      let time1 = new Date().getTime()
      // console.log(url+'接口耗时======='+(time1-time)/1000+'秒')
      // console.log(url+'接口返回数据：',APIUtils.XML2jsobj(res.data.documentElement))
      // return APIUtils.XML2jsobj(res.data.documentElement)
      return res
    }).catch( error => {
      console.log(error)
    })
  },
  /**
   * 公用get请求
   * @param url
   * @returns {Promise.<TResult>}
   */
  commonGet: (url,params)=>{
    // Toast.loading('正在加载...', 0, null);
    let time = new Date().getTime()
    return axios({
      url: APIUtils.base+url,
      responseType: 'json',
      params:params
    }).then(res => {
      let time1 = new Date().getTime()
      // console.log(url+'接口耗时======='+(time1-time)/1000+'秒')
      // console.log(url+'接口返回数据：',APIUtils.XML2jsobj(res.data.documentElement))
      // return APIUtils.XML2jsobj(res.data.documentElement)
      return res
    }).catch( error =>{
      console.log(error)
    })
  },
  /**
   * 公用xml请求
   * @param url
   * @returns {Promise.<TResult>}
   */
  commonXml: (url)=>{
    // Toast.loading('正在加载...', 0, null);
    let time = new Date().getTime()
    return axios({
      url: APIUtils.baseXmlUrl+url,
      responseType: 'document',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
        }
    }).then(res => {
      let time1 = new Date().getTime()
      console.log('料到******',res)
      // console.log(url+'接口耗时======='+(time1-time)/1000+'秒')
      // console.log(url+'接口返回数据：',APIUtils.XML2jsobj(res.data.documentElement))

      // return APIUtils.XML2jsobj(res.data.documentElement)

      // return res
    }).catch( error =>{
      console.log('料到xml**error***')
      console.log(error)
    })
  },
  commonFormate: ( url , params)=>{
    // Toast.loading('正在加载...', 0, null);
    let time = new Date().getTime()
    return axios({
      url: APIUtils.base + url,
      timeout: 8000,
      responseType: 'json',
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).then(res => {
      let time1 = new Date().getTime()
      // console.log(url+'接口耗时======='+(time1-time)/1000+'秒')
      // console.log(url+'接口返回数据：',APIUtils.XML2jsobj(res.data.documentElement))
      // return APIUtils.XML2jsobj(res.data.documentElement)
      return res
    }).catch(error =>{
      console.log(error);
    })
  },
  jsonGet: url => {
    let time = new Date().getTime()
    // Toast.loading('正在加载...', 0, null);
    return axios({
      url: APIUtils.base + url,
      responseType: 'json',
      timeout: 8000
    }).then(res => {
      let time1 = new Date().getTime()
      // console.log(url+'接口耗时======='+(time1-time)/1000+'秒')
      // Toast.hide();
      // console.log(url+'接口返回数据========',res.data);
      return res;
    }).catch( error => {
      // console.log(error);
      // Toast.hide();
      // Toast.info('网络连接失败，请检查您的网络设置并稍后再试',2,null,false)
    })
  }
}
export default APIUtils
