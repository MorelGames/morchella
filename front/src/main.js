import Vue from 'vue'
import Buefy from 'buefy'

import './icons'
import store from './store'
import { i18n } from './i18n'

import './registerServiceWorker'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas'
})

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
