import api from '@molgenis/molgenis-api-client'
import {
  SET_TOTAL_PATIENTS,
  SET_ALL_PATIENTS,
  SET_PATIENT_INFORMATION_PATIENT_ID,
  SET_FILTERED_PATIENTS,
  SET_PATIENTS_FILTER_ACTIVE
} from './mutations'
/* API paths */
import {
  PATIENT_TABLE,
  PATIENTS_API_PATH
} from '../../config'
import { setFilterGroupInformationFromURL } from '../../helpers'

export const GET_PATIENTS_INFORMATION_PATIENT_ID = '__GET_PATIENTS_INFORMATION_PATIENT_ID__'
export const GET_ALL_PATIENTS = '__GET_ALL_PATIENTS__'
export const GET_FILTERED_PATIENTS = '__GET_FILTERED_PATIENTS__'

export default {
  [GET_ALL_PATIENTS] ({commit}) {
    api.get(PATIENTS_API_PATH + '?start=0&num=10000')
      .then(response => response.json())
      .then(response => {
        commit(SET_TOTAL_PATIENTS, response.total)
        commit(SET_ALL_PATIENTS, response.items)
      })
  },
  [GET_PATIENTS_INFORMATION_PATIENT_ID] ({commit}, id) {
    api.get(PATIENTS_API_PATH + '/' + id)
      .then(response => response.json())
      .then(response => {
        commit(SET_PATIENT_INFORMATION_PATIENT_ID, [id, response])
      })
  },
  [GET_FILTERED_PATIENTS] ({state, commit, rootState}) {
    console.log('FILTERING STARTED')
    if (typeof (rootState.route.query.q) !== 'undefined' && rootState.route.query.q.length > 0) {
      commit(SET_PATIENTS_FILTER_ACTIVE, true)
      rootState.filterGroupInformation = setFilterGroupInformationFromURL(rootState.filterGroupInformation, rootState.route.query.q, PATIENT_TABLE)
      api.get(PATIENTS_API_PATH + '?q=' + rootState.route.query.q + '&start=0&num=10000')
        .then(response => response.json())
        .then(response => {
          commit(SET_FILTERED_PATIENTS, response.items)
        })
    } else {
      rootState.filterGroupInformation = setFilterGroupInformationFromURL(rootState.filterGroupInformation, '', PATIENT_TABLE)
      commit(SET_PATIENTS_FILTER_ACTIVE, false)
      commit(SET_FILTERED_PATIENTS, [])
    }
  }
}
