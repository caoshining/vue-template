import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import vux from './modules/vux'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    vux
  },
  getters,
  plugins: [createPersistedState({
    key: 'LiaoDaoVuex',
    storage: window.localStorage
  })]
})
