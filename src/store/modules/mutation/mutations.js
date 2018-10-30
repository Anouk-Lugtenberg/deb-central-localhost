import Vue from 'vue'
import { naturalSort, createActiveFilterQueries } from '../../helpers'
import {
  COLUMN_MUTATION_ID,
  COLUMN_PATIENT_ID
} from '../../actions'

export const SET_ALL_MUTATIONS = '__SET_ALL_MUTATIONS__'
export const SET_TOTAL_MUTATIONS = '__SET_TOTAL_MUTATIONS__'
export const SET_PATIENT_FOR_MUTATION = '__SET_PATIENT_FOR_MUTATION__'
export const SET_SEARCH_MUTATION = '__SET_SEARCH_MUTATION__'
export const SET_MUTATIONS_FILTER_ACTIVE = '__SET_MUTATION_FILTER_ACTIVE__'
export const SET_FILTERS_CHECKBOX = '__SET_FILTERS_CHECKBOX__'
export const SET_FILTERED_MUTATIONS = '__SET_FILTERED_MUTATIONS__'
export const SET_FILTER_GROUP_INFORMATION = '__SET_FILTER_GROUP_INFORMATION__'

export default {
  [SET_ALL_MUTATIONS] (state, mutations) {
    let identifiers = []
    Object.keys(mutations).map(function (key) {
      identifiers.push(mutations[key][COLUMN_MUTATION_ID])
      Vue.set(state.mutations,
        mutations[key][COLUMN_MUTATION_ID],
        mutations[key])
    })
    state.allMutationIdentifiers = naturalSort(identifiers)
  },
  [SET_TOTAL_MUTATIONS] (state, number) {
    state.totalMutations = number
  },
  [SET_PATIENT_FOR_MUTATION] (state, [id, information]) {
    let patients = []
    Object.keys(information).map(function (patient) {
      patients.push(information[patient][COLUMN_PATIENT_ID])
    })
    Vue.set(state.patientsPerMutation, id, naturalSort(patients))
  },
  [SET_SEARCH_MUTATION] (state, search) {
    state.stringSearch = search
    state.search = search
  },
  [SET_MUTATIONS_FILTER_ACTIVE] (state, boolean) {
    state.mutationsFiltersActive = boolean
  },
  [SET_FILTERS_CHECKBOX] (state) {
    console.log('SETTING FILTERS')
    let activeFilters = []
    Object.keys(state.filterGroupInformation).map(function (attribute) {
      console.log('Filter group information: ' + state.filterGroupInformation)
      activeFilters.push(createActiveFilterQueries(attribute, state.filterGroupInformation[attribute]))
    })
    console.log('Active filters: ' + activeFilters)
    state.activeFiltersCheckbox = activeFilters
  },
  [SET_FILTERED_MUTATIONS] (state, mutations) {
    let filteredIdentifiers = []
    Object.keys(mutations).map(function (key) {
      filteredIdentifiers.push(mutations[key][COLUMN_MUTATION_ID])
    })
    state.filteredMutationIdentifiers = filteredIdentifiers
  },
  [SET_FILTER_GROUP_INFORMATION] (state, [name, information]) {
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
    Vue.set(state.filterGroupInformation, name, filterList)
  },
  [SET_FILTERS_CHECKBOX] (state) {
    console.log('SETTING FILTERS')
    let activeFilters = []
    Object.keys(state.filterGroupInformation).map(function (attribute) {
      console.log('Filter group information: ' + state.filterGroupInformation)
      activeFilters.push(createActiveFilterQueries(attribute, state.filterGroupInformation[attribute]))
    })
    console.log('Active filters: ' + activeFilters)
    state.activeFiltersCheckbox = activeFilters
  }
}
