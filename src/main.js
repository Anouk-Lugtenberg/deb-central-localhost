import 'es6-promise/auto'
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import lodash from 'lodash'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearchPlus, faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearchPlus, faCaretRight, faCaretDown)
// Object.defineProperty(Vue.prototype, '$lodash', { value: lodash })
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('field-types', require('./components/fieldTypes/FieldTypes'))
Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
