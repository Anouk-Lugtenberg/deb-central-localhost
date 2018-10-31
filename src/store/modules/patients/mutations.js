import Vue from 'vue'
import { naturalSort } from '../../helpers'
import { COLUMN_PATIENT_ID } from '../../config'

export const SET_TOTAL_PATIENTS = '__SET_TOTAL_PATIENTS__'
export const SET_ALL_PATIENTS = '__SET_ALL_PATIENTS__'
export const SET_PATIENT_INFORMATION_PATIENT_ID = '__SET_PATIENT_INFORMATION_PATIENT_ID__'
export const SET_SEARCH_PATIENTS = '__SET_SEARCH_PATIENTS__'
export const SET_FILTERED_PATIENTS = '__SET_FILTERED_PATIENTS__'
export const SET_ACTIVE_FILTERS_PATIENTS = '__SET_ACTIVE_FILTERS_PATIENTS__'

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
  [SET_ALL_PATIENTS] (state, patients) {
    let identifiers = []
    Object.keys(patients).map(function (key) {
      let mutations = []
      /* TODO Regex works only for deb-central.org and is hard-coded */
      /* This saves the mutations per patients as object 'mutations' and the rest of the information as 'information'.
      Done because the information about the mutations is treated differently by the program.
       */
      let filteredKeys = filterKeys(patients[key], /cDNAchange/)
      filteredKeys.forEach(function (element) {
        if (patients[key][element]) {
          mutations.push(patients[key][element])
        }
      })
      identifiers.push(patients[key][COLUMN_PATIENT_ID])
      Vue.set(state.patients,
        patients[key][COLUMN_PATIENT_ID],
        {
          'information': patients[key],
          'mutations': mutations
        })
    })
    state.allIdentifiersPatients = naturalSort(identifiers)
  },
  [SET_TOTAL_PATIENTS] (state, total) {
    state.totalPatients = total
  },
  [SET_PATIENT_INFORMATION_PATIENT_ID] (state, [id, information]) {
    Vue.set(state.informationPatients, id, information)
  },
  [SET_SEARCH_PATIENTS] (state, search) {
    state.stringSearch = search
    state.search = search
  },
  [SET_FILTERED_PATIENTS] (state, patients) {
    let filteredIdentifiers = []
    Object.keys(patients).map(function (key) {
      filteredIdentifiers.push(patients[key][COLUMN_PATIENT_ID])
    })
    state.filteredPatientsIdentifiers = filteredIdentifiers
  },
  [SET_ACTIVE_FILTERS_PATIENTS] (state, filters) {
    state.activeFiltersCheckbox = filters
  }
}
