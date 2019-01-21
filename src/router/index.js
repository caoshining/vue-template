
import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const routes = [
  {
    path: '/',
    name: 'Index',
    component: _import('IndexCont/index'),
    title: '首页头部',
    meta: {
      headerContent: '首页',
      keepAlive: true
    }
  }
]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
