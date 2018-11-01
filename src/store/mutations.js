import Vue from 'vue'
import { getMetadata, getMetadataColumnsMutations } from './helpers'
import { MUTATION_TABLE } from './config'

export const SET_METADATA = '__SET_METADATA__'
export const SET_FILTER_GROUP_INFORMATION = '__SET_FILTER_GROUP_INFORMATION__'

export default {
  [SET_METADATA] (state, [metadata, type]) {
    let listMetadata = getMetadata(metadata, type, false)
    let listMetadataAllFieldsVisible = getMetadata(metadata, type, true)
    if (MUTATION_TABLE.includes(type)) {
      let listMetadataColumnsMutations = getMetadataColumnsMutations(metadata, type)
      Vue.set(state.metadataColumnsMutations, type, listMetadataColumnsMutations)
    }
    Vue.set(state.metadata, type, listMetadata)
    Vue.set(state.metadataAllFieldsVisible, type, listMetadataAllFieldsVisible)
  },
  [SET_FILTER_GROUP_INFORMATION] (state, [table, name, information]) {
    let filterList = []
    let keyForItem = information['meta']['attributes'][0]['name']
    Object.keys(information['items']).map(function (key) {
      if (information['items'][key]['label']) {
        filterList.push({
          'name': information['items'][key][keyForItem],
          'label': information['items'][key]['label'],
          'activeFilter': false
        })
      } else {
        filterList.push({
          'name': information['items'][key][keyForItem],
          'activeFilter': false
        })
      }
    })
    /* Creates a key if the table isn't available yet in the state */
    if (!(state.filterGroupInformation.hasOwnProperty(table))) {
      Vue.set(state.filterGroupInformation, table, {})
    }
    /* Adds the filter lists to the table they belong with (either mutation or patient), with as key the name
     * of the filter. */
    Vue.set(state.filterGroupInformation[table], name, filterList)
  }
}
