import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import App from './components/App'
import router from './router'
import store from './store'
import modal from 'components/modal.vue'
Vue.component('modal', modal)

sync(store, router)

Vue.use(ElementUI, { locale })

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
