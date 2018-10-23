import Vue from 'vue'
import { getMetadata } from './helpers'

export const SET_METADATA = '__SET_METADATA__'
export const SET_SEARCH = '__SET_SEARCH__'

export default {
  [SET_METADATA] (state, [metadata, type]) {
    let listMetadata = getMetadata(metadata, type)
    Vue.set(state.metadata, type, listMetadata)
  },
  [SET_SEARCH] (state, search) {
    state.search = search
  }
}
