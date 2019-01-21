<template>
  <div id="app" style="height:100%;">
    <div v-transfer-dom>
      <loading v-model="isLoading">...</loading>
    </div>
    <router-view class="router-view">
    </router-view>
  </div>
</template>

<script>
	import {  Drawer, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom } from 'vux'
  import { mapState, mapActions } from 'vuex'
  // ToDo自造loading
  // import loading from '@/components/loading/overall-loading';
  export default {
    name: 'app',
		directives: {
			TransferDom
		},
    components: {
			Drawer,
			ViewBox,
			XHeader,
			Tabbar,
			TabbarItem,
			Loading,
    },
    computed: {
			
		},
    data () {
      return {
        isLoading:false,
      }
    },
    mounted () {
      
    },
  }
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
body {
  background-color: #fbf9fe;
}
.weui-tabbar:before{border-top: none!important;}
.weui-tabbar__icon{height: 25px!important;width:25px!important;}
.weui-tabbar{position: fixed!important;bottom: 0;}
.weui-tabbar.index_tabbar{box-shadow: 0 -20px 35px 0 rgba(233,233,233,0.50);}
// .weui-tabbar__item{padding-top: 0 !important;}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  font-family:
  "PingFang SC",
  "Heiti SC",
  "Helvetica Neue",
  Helvetica, Arial,
  "Hiragino Sans GB",
  "Microsoft YaHei", "WenQuanYi Micro Hei",
  sans-serif !important;
}
</style>
