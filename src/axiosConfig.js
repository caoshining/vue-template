// import { Message, MessageBox } from 'element-ui'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'

axios.defaults.withCredentials = true;
//免登页面
const noLoginSheet = ['/my','/testCpt','/center']
// request拦截器
axios.interceptors.request.use(config => {

  config.headers['accessToken'] = store.getters.token
  config.headers['appid'] = store.getters.appid
  store.dispatch('updateLoadingStatus', true)
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})
// respone拦截器
axios.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错
     */
    // 配置loading
    store.dispatch('updateLoadingStatus', false)
    const res = response.data
    const errCode = ['1018', '1019', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009'];
    if (errCode.indexOf(res.code) !== -1) {
      store.commit('SET_APPID', '')
      store.commit('SET_NAME', '')
      store.commit('SET_TOKEN', '')

      let curRouter = router.app.$route.path || ''
      if (curRouter) {
        if (!noLoginSheet.includes(curRouter)) router.app.$router.push('/login')
      } else {
        router.app.$router.push('/login')        
      }
    }
    return response.data
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)
