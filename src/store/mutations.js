import Vue from 'vue'
import { getMetadata, getMetadataColumnsMutations } from './helpers'

export const SET_METADATA = '__SET_METADATA__'
export const SET_TABLE_FOR_FILTER_GROUP_INFORMATION = '__SET_TABLE_FOR_FILTER_GROUP_INFORMATION__'
export const SET_LIST_METADATA_COLUMNS_MUTATIONS = '__SET_LIST_METADATA_COLUMNS_MUTATIONS__'
export const SET_FILTER_GROUP_INFORMATION = '__SET_FILTER_GROUP_INFORMATION__'
export const SET_FILTER_GROUP_INFORMATION_ENUM = '__SET_FILTER_GROUP_INFORMATION_ENUM__'
export const SET_ALL_REFERENCES = '__SET_ALL_REFERENCES__'
export const SET_ERROR = '__SET_ERROR__'

export default {
  [SET_METADATA] (state, [metadata, type, options, filters, mutationColumns]) {
    let listMetadata = getMetadata(metadata, options, filters, mutationColumns)
    Vue.set(state.metadata, type, listMetadata)
  },
  [SET_LIST_METADATA_COLUMNS_MUTATIONS] (state, [metadata, type, visibleColumns]) {
    let listMetadataColumnsMutations = getMetadataColumnsMutations(metadata, visibleColumns)
    Vue.set(state.metadataColumnsMutations, type, listMetadataColumnsMutations)
  },
  [SET_TABLE_FOR_FILTER_GROUP_INFORMATION] (state, table) {
    Vue.set(state.filterGroupInformation, table, {})
  },
  [SET_FILTER_GROUP_INFORMATION] (state, [table, name, information]) {
    let filterList = []
    let keyForItem = information['meta']['attributes'][0]['name']
    Object.keys(information['items']).map(function (key) {
      if (information['items'][key]['label']) {
        filterList.push({
          name: information['items'][key][keyForItem],
          label: information['items'][key]['label'],
          activeFilter: false
        })
      } else {
        filterList.push({
          name: information['items'][key][keyForItem],
          activeFilter: false
        })
      }
    })
    /* Adds the filter lists to the table they belong with (either mutation or patient), with as key the name
     * of the filter. */
    Vue.set(state.filterGroupInformation[table], name, filterList)
  },
  [SET_FILTER_GROUP_INFORMATION_ENUM] (state, [table, name, information]) {
    let filterList = []
    information['enumOptions'].forEach(function (option) {
      filterList.push({
        name: option,
        activeFilter: false
      })
    })
    Vue.set(state.filterGroupInformation[table], name, filterList)
  },
  [SET_ALL_REFERENCES] (state, references) {
    state.allReferences = references
  },
  [SET_ERROR] (state, error) {
    state.error = {status: error.status, statusText: error.statusText, url: error.url}
  }
}
