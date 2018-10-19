import Vue from 'vue'
import Vuex from 'vuex'

import mutation from './modules/mutation'
import patients from './modules/patients'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mutation: mutation,
    patients: patients
  },
  state,
  actions,
  getters,
  mutations
})
