import router from './router'
import store from './store'
// import { getToken, setToken, removeToken }  from '@/utils/auth' // 验权
const whiteList = [
  '/',
] // 不重定向白名单

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
    endTime = Date.now()
})
methods.forEach(key => {
    let method = router[key].bind(router)
    router[key] = function (...args) {
        isPush = true
        method.apply(null, args)
    }
})

router.beforeEach((to, from, next) => {
  // store.dispatch('updateLoadingStatus',  true)
    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)
    if (toIndex) {
        if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
          store.dispatch('updateDirection', 'forward' )
        } else {
            // 判断是否是ios左滑返回
            if (!isPush && (Date.now() - endTime) < 377) {
              store.dispatch('updateDirection', '')
            } else {
              store.dispatch('updateDirection', 'reverse')
            }
        }
    } else {
        ++historyCount
        history.setItem('count', historyCount)
        to.path !== '/' && history.setItem(to.path, historyCount)
        store.dispatch('updateDirection', 'forward')
    }

    if (/\/http/.test(to.path)) {
        let url = to.path.split('http')[1]
        window.location.href = `http${url}`
    } else {
        //TODO后期重构6-28
        if((to.path.includes('/care')||to.path.includes('/allCares'))&&!store.getters.token) next('/unloginCare')
        if(to.path.includes('/center')&&!store.getters.token) next('/my')
        else next()
    }
})

router.afterEach((to) => {
    isPush = false
})
