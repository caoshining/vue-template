import { customerLogin, customerLogout, GetUserInfo } from '@/api/api'
/*, logout, getInfo*/
import { getToken, setToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    appid: '',
    applyid: '',
    token: '',
    name: '',
    uploadphoto: '',
    level: '',
    loginType: '1',
    source: 1000,
    userbankdata: '',
    nick:"",
    filterdata:{}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_APPID: (state, appid) => {
      state.appid = appid
    },
    SET_APPLYID: (state, applyid) => {
      state.applyid = applyid
    },
    SET_NAME: (state, customid) => {
      state.name = customid
    },
    SET_LEVEL:(state, level) => {
      state.level = level
    },
    SET_AVATAR: (state, uploadphoto) => {
      state.uploadphoto = uploadphoto
    },
    SET_LoginType: (state, loginType) => {
      state.loginType = loginType
    },
    SET_Source: (state, source) => {
      state.source = source
    },
    SET_USERBANKDATA: (state, data) => {
      state.userbankdata = data
    },
    SET_NICK: (state, nickid) => {
      state.nick = nickid;
    },
    SET_FILTER: (state,data) => {
    	state.filterdata = data
    }
  },

  actions: {
    // 登录
    Login({ commit }, userinfo) {
      const userdata = userinfo.username.trim()
      return new Promise((resolve, reject) => {
        customerLogin(userinfo).then(response => {
          console.log("-----",response)
          if(response.code==0){
            const data = response.data;
            console.log("custonid",data.customid)
            // appid
            // nickid
            // token
            commit('SET_APPID', data.appid)
            commit('SET_NAME', data.customid)
            // commit('SET_AVATAR', data.uploadphoto)
            commit('SET_TOKEN', data.token)
            commit('SET_NICK',data.nickid)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state },data) {
      return new Promise((resolve, reject) => {
        customerLogout(data).then((res) => {
          if ( res.code === '0') {
            commit('SET_APPID', '')
            commit('SET_NAME', '')
            commit('SET_AVATAR', '')
            commit('SET_TOKEN', '')
            removeToken()
            sessionStorage.removeItem('saveExpert')
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //
    // // 获取用户信息
    GetInfo({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        GetUserInfo(data).then(response => {
          const data = response.data
          console.log('用户信息',data)
          // commit('SET_ROLES', data.role)
          commit('SET_NAME', data.customid)
          commit('SET_AVATAR', data.headImgPath)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
    // // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     removeToken()
    //     resolve()
    //   })
    // }
  }
}

export default user
