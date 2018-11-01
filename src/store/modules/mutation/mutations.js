import Vue from 'vue'
import { naturalSort } from '../../helpers'
import {
  COLUMN_MUTATION_CDNANOTATION,
  COLUMN_PATIENT_ID
} from '../../config'

export const SET_ALL_MUTATIONS = '__SET_ALL_MUTATIONS__'
export const SET_TOTAL_MUTATIONS = '__SET_TOTAL_MUTATIONS__'
export const SET_PATIENT_FOR_MUTATION = '__SET_PATIENT_FOR_MUTATION__'
export const SET_SEARCH_MUTATION = '__SET_SEARCH_MUTATION__'
export const SET_MUTATIONS_FILTER_ACTIVE = '__SET_MUTATION_FILTER_ACTIVE__'
export const SET_ACTIVE_FILTERS_MUTATIONS = '__SET_ACTIVE_FILTERS_MUTATIONS__'
export const SET_FILTERED_MUTATIONS = '__SET_FILTERED_MUTATIONS__'
export const SET_MUTATIONS_SEARCHING = '__SET_MUTATIONS_SEARCHING__'

export default {
  [SET_ALL_MUTATIONS] (state, mutations) {
    let identifiers = []
    Object.keys(mutations).map(function (key) {
      identifiers.push(mutations[key][COLUMN_MUTATION_CDNANOTATION])
      Vue.set(state.mutations,
        mutations[key][COLUMN_MUTATION_CDNANOTATION],
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
  [SET_FILTERED_MUTATIONS] (state, mutations) {
    let filteredIdentifiers = []
    Object.keys(mutations).map(function (key) {
      filteredIdentifiers.push(mutations[key][COLUMN_MUTATION_CDNANOTATION])
    })
    state.filteredMutationIdentifiers = filteredIdentifiers
    state.mutationsSearching = false
  },
  [SET_ACTIVE_FILTERS_MUTATIONS] (state, filters) {
    state.activeFiltersCheckbox = filters
  },
  [SET_MUTATIONS_SEARCHING] (state, boolean) {
    state.mutationsSearching = boolean
  }
}
