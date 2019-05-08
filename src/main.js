import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import './icons'
// 注册全局组件
import registerComponents from './utils/registerComponents'
// import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'

// Vue.use(mandMobile)
// 请求拦截器
import requestPlugin from './request/http.js'

Vue.use(registerComponents)
Vue.use(requestPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
