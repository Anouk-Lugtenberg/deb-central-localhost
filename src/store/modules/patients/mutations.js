import Vue from 'vue'
import { naturalSort } from '../../helpers'
import flattenDepth from 'lodash/flattenDepth'

export const SET_TOTAL_PATIENTS = '__SET_TOTAL_PATIENTS__'
export const SET_ALL_PATIENTS = '__SET_ALL_PATIENTS__'
export const SET_PATIENT_INFORMATION_PATIENT_ID = '__SET_PATIENT_INFORMATION_PATIENT_ID__'
export const SET_SEARCH_PATIENTS = '__SET_SEARCH_PATIENTS__'
export const SET_FILTERED_PATIENTS = '__SET_FILTERED_PATIENTS__'
export const SET_ACTIVE_FILTERS_PATIENTS = '__SET_ACTIVE_FILTERS_PATIENTS__'
export const SET_PATIENTS_FILTER_ACTIVE = '__SET_PATIENTS_FILTER_ACTIVE__'
export const SET_PATIENTS_IS_FILTERING = '__SET_PATIENTS_IS_FILTERING__'
export const SET_PATIENTS_FOR_PUBLICATION_IDENTIFIER = '__SET_PATIENTS_FOR_PUBLICATION_IDENTIFIER__'

const filterKeys = (obj, filter) => {
  let keys = []
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && filter.test(key)) {
      keys.push(key)
    }
  }
  return keys
}

export default {
  [SET_ALL_PATIENTS] (state, [patients, columnPatientIdentifier, mutationColumnsForPatient]) {
    let identifiers = []
    Object.keys(patients).map(function (key) {
      let mutations = []
      /* This saves the mutations per patients as object 'mutations' and the rest of the information as 'information'.
      Done because the information about the mutations is treated differently by the program.
       */
      let regexFromArray = new RegExp(mutationColumnsForPatient.join('|'))
      let filteredKeys = filterKeys(patients[key], regexFromArray)
      filteredKeys.forEach(function (element) {
        if (patients[key][element]) {
          mutations.push(patients[key][element])
        }
      })
      identifiers.push(patients[key][columnPatientIdentifier])
      Vue.set(state.patients,
        patients[key][columnPatientIdentifier],
        {
          information: patients[key],
          mutations: flattenDepth(mutations, 1)
        })
    })
    state.allIdentifiersPatients = naturalSort(identifiers)
  },
  [SET_SEARCH_PATIENTS] (state, search) {
    state.search = search
  },
  [SET_FILTERED_PATIENTS] (state, [patients, columnPatientIdentifier]) {
    let filteredIdentifiers = []
    Object.keys(patients).map(function (key) {
      filteredIdentifiers.push(patients[key][columnPatientIdentifier])
    })
    state.filteredPatientsIdentifiers = naturalSort(filteredIdentifiers)
    state.patientsIsFiltering = false
  },
  [SET_ACTIVE_FILTERS_PATIENTS] (state, filters) {
    state.activeFiltersCheckbox = filters
  },
  [SET_PATIENTS_FILTER_ACTIVE] (state, boolean) {
    state.patientsFilterActive = boolean
  },
  [SET_PATIENTS_IS_FILTERING] (state, boolean) {
    state.patientsIsFiltering = boolean
  },
  [SET_PATIENTS_FOR_PUBLICATION_IDENTIFIER] (state, [publicationIdentifier, patients, columnPatientIdentifier]) {
    let patientsForPublicationIdentifier = []
    Object.keys(patients).map(function (key) {
      patientsForPublicationIdentifier.push(patients[key][columnPatientIdentifier])
    })
    Vue.set(state.patientsForPublicationIdentifier, publicationIdentifier, naturalSort(patientsForPublicationIdentifier))
  }
}
