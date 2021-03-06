import Vue from 'vue'
import { getMetadata, getMetadataColumnsMutations } from './helpers'

export const SET_METADATA = '__SET_METADATA__'
export const SET_TABLE_FOR_FILTER_GROUP_INFORMATION = '__SET_TABLE_FOR_FILTER_GROUP_INFORMATION__'
export const SET_LIST_METADATA_COLUMNS_MUTATIONS = '__SET_LIST_METADATA_COLUMNS_MUTATIONS__'
export const SET_FILTER_GROUP_INFORMATION = '__SET_FILTER_GROUP_INFORMATION__'
export const SET_FILTER_GROUP_INFORMATION_ENUM = '__SET_FILTER_GROUP_INFORMATION_ENUM__'
export const SET_ALL_REFERENCES = '__SET_ALL_REFERENCES__'
export const SET_REFERENCE_METADATA = '__SET_REFERENCE_METADATA__'
export const SET_SEARCH_REFERENCES = '__SET_SEARCH_REFERENCES__'
export const SET_FILTERED_REFERENCES = '__SET_FILTERED_REFERENCES__'
export const RESET_FILTERED_REFERENCES = '__RESET_FILTERED_REFERENCES__'
export const SET_ERROR = '__SET_ERROR__'

export default {
  [SET_METADATA] (state, [metadata, type, options, filters, mutationColumnsToExcludeFromMetadata]) {
    let listMetadata = getMetadata(metadata, options, filters, mutationColumnsToExcludeFromMetadata)
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
    let listReferences = {}
    references.map(function (reference) {
      listReferences[reference[state.COLUMN_PUBMED_ID_REFERENCE_TABLE]] = reference
    })
    state.allReferences = listReferences
  },
  [SET_REFERENCE_METADATA] (state, metadata) {
    state.referenceMetadata = metadata
  },
  [SET_SEARCH_REFERENCES] (state, [search, columnsToSearch]) {
    state.referencesFiltering = false
    if (search) {
      state.referencesFiltering = true
    }
    state.searchReferences = search
    state.columnsToSearchReferences = columnsToSearch
  },
  [SET_FILTERED_REFERENCES] (state, [column, references]) {
    let filteredReferences = []
    references.map(function (reference) {
      filteredReferences.push(reference[column])
    })
    state.filteredReferences = filteredReferences
    state.referencesFiltering = false
  },
  [RESET_FILTERED_REFERENCES] (state) {
    state.filteredReferences = []
  },
  [SET_ERROR] (state, error) {
    state.error = {status: error.status, statusText: error.statusText, url: error.url}
  }
}
