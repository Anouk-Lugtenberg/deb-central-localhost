import Vue from 'vue'
import { getMetadata } from './helpers'

export const SET_METADATA = '__SET_METADATA__'
export const SET_SEARCH = '__SET_SEARCH__'

export default {
  [SET_METADATA] (state, [metadata, type]) {
    let listMetadata = getMetadata(metadata, type, false)
    let listMetadataAllFieldsVisible = getMetadata(metadata, type, true)
    Vue.set(state.metadata, type, listMetadata)
    Vue.set(state.metadataAllFieldsVisible, type, listMetadataAllFieldsVisible)
  },
  [SET_SEARCH] (state, search) {
    state.search = search
  }
}
