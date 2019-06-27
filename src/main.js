// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import store from './vuex'
import * as filters from './filters'

// 全局vux插件挂载
import { ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'

Vue.use(ToastPlugin, {
  time: 2000,
  isShowMask: true,
  position: 'default'
})
Vue.use(LoadingPlugin, {
  text: '加载中...'
})
Vue.use(ConfirmPlugin)

FastClick.attach(document.body)

// 挂载到vue的filter上
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
