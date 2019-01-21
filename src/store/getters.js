const getters = {
  token: state => state.user.token,
  appid: state => state.user.appid,
  applyid: state => state.user.applyid,
  uploadphoto: state => state.user.uploadphoto,
  level: state => state.user.level,
  name: state => state.user.name,
  nick: state => state.user.nick,
  userbankdata: state => state.user.userbankdata,

  loginType: state => state.user.loginType,
  source: state => state.user.source,
  mobileType: state => '3',
  appVersion: state => '1.3.0',

  route: state => state.route,
  path: state => state.route.path,
  isLoading: state => state.vux.isLoading,
  apptype: state => state.vux.apptype,
  direction: state => state.vux.direction
}
export default getters
