import Vue from 'vue'
import { VISIBLE_FIELDS } from './actions'

export const SET_METADATA = '__SET_METADATA__'
export const SET_SEARCH = '__SET_SEARCH__'
/*
This constant variable can be adjusted to determine which fields from the tables are visible
on loading the page - should be in UPPERCASE, and same as 'name' field from metadata from tables.
 */

export default {
  [SET_METADATA] (state, [metadata, type]) {
    let options = VISIBLE_FIELDS[type]
    let listMetadata = []
    metadata.forEach(function (element) {
      let fieldVisible = false
      if (options.indexOf(element.name.toUpperCase()) > -1) {
        fieldVisible = true
      }
      if (element.name.includes('cDNA_change')) {
        listMetadata.unshift({
          'name': element.name,
          'label': element.label,
          'fieldType': element.fieldType,
          'visible': fieldVisible
        })
      } else {
        listMetadata.push({
          'name': element.name,
          'label': element.label,
          'fieldType': element.fieldType,
          'visible': fieldVisible
        })
      }
    })
    Vue.set(state.metadata, type, listMetadata)
  },
  [SET_SEARCH] (state, search) {
    state.search = search
  }
}
