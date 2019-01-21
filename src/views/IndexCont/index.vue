<template>
  <div id="app" style="height:100%;">
    <div>Hello,Vue</div>
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
    
      }
    },
    mounted () {
      
    },
  }
</script>

<style lang="less">

</style>
