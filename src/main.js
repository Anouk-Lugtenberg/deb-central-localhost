import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearchPlus, faCaretRight, faCaretDown, faTimes, faPlus, faMinus, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
sync(store, router)
library.add(faSearchPlus, faCaretRight, faCaretDown, faTimes, faPlus, faMinus, faExternalLinkAlt)
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
