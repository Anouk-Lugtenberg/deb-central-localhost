import Vue from 'vue'
import { naturalSort } from '../../helpers'

export const SET_ALL_MUTATIONS = '__SET_ALL_MUTATIONS__'
export const SET_TOTAL_MUTATIONS = '__SET_TOTAL_MUTATIONS__'
export const SET_BOOLEAN_COMPACT_VIEW_MUTATIONS = '__SET_BOOLEAN_COMPACT_VIEW_MUTATIONS__'
export const SET_PATIENT_FOR_MUTATION = '__SET_PATIENT_FOR_MUTATION__'
export const SET_SEARCH_MUTATION = '__SET_SEARCH_MUTATION__'
export const SET_MUTATIONS_FILTER_ACTIVE = '__SET_MUTATION_FILTER_ACTIVE__'
export const SET_ACTIVE_FILTERS_MUTATIONS = '__SET_ACTIVE_FILTERS_MUTATIONS__'
export const SET_FILTERED_MUTATIONS = '__SET_FILTERED_MUTATIONS__'
export const SET_MUTATIONS_IS_FILTERING = '__SET_MUTATIONS_IS_FILTERING__'
export const SET_VISIBILITY_GENOME_BROWSER = '__SET_VISIBILITY_GENOME_BROWSER__'
export const SET_MUTATIONS_BETWEEN_POSITION_START_AND_END = '__SET_MUTATIONS_BETWEEN_POSITION_START_AND_END__'
export const SET_GENOME_POSITION = '__SET_GENOME_POSITION__'

export default {
  [SET_ALL_MUTATIONS] (state, [mutations, CDNANotation]) {
    let identifiers = []
    Object.keys(mutations).map(function (key) {
      identifiers.push(mutations[key][CDNANotation])
      Vue.set(state.mutations,
        mutations[key][CDNANotation],
        mutations[key])
    })
    state.allMutationIdentifiers = naturalSort(identifiers)
  },
  [SET_TOTAL_MUTATIONS] (state, number) {
    state.totalMutations = number
  },
  [SET_BOOLEAN_COMPACT_VIEW_MUTATIONS] (state, isCompactView) {
    state.isCompactViewMutations = isCompactView
  },
  [SET_PATIENT_FOR_MUTATION] (state, [id, information, columnPatientIdentifier]) {
    let patients = []
    Object.keys(information).map(function (patient) {
      patients.push(information[patient][columnPatientIdentifier])
    })
    Vue.set(state.patientsPerMutation, id, naturalSort(patients))
  },
  [SET_SEARCH_MUTATION] (state, search) {
    state.search = search
  },
  [SET_FILTERED_MUTATIONS] (state, [mutations, CDNANotation]) {
    let filteredIdentifiers = []
    Object.keys(mutations).map(function (key) {
      filteredIdentifiers.push(mutations[key][CDNANotation])
    })
    state.filteredMutationIdentifiers = naturalSort(filteredIdentifiers)
    state.mutationsIsFiltering = false
  },
  [SET_ACTIVE_FILTERS_MUTATIONS] (state, filters) {
    state.activeFiltersCheckbox = filters
  },
  [SET_MUTATIONS_FILTER_ACTIVE] (state, boolean) {
    state.mutationsFiltersActive = boolean
  },
  [SET_MUTATIONS_IS_FILTERING] (state, boolean) {
    state.mutationsIsFiltering = boolean
  },
  [SET_VISIBILITY_GENOME_BROWSER] (state, isVisible) {
    state.genomeBrowserVisible = isVisible
  },
  [SET_MUTATIONS_BETWEEN_POSITION_START_AND_END] (state, mutations) {
    state.mutationsBetweenPositionStartAndEnd = mutations
  },
  [SET_GENOME_POSITION] (state, position) {
    state.genomePositionMutation = position
  }
}
