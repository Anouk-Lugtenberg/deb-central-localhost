import api from '@molgenis/molgenis-api-client'
import {
  SET_TOTAL_PATIENTS,
  SET_ALL_PATIENTS,
  SET_PATIENT_INFORMATION_PATIENT_ID,
  SET_FILTERED_PATIENTS
} from './mutations'
/* API paths */
import {
  PATIENTS_API_PATH
} from '../../config'

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
  [GET_FILTERED_PATIENTS] ({commit}, query) {
    if (query.length > 0) {
      console.log('URL: ' + PATIENTS_API_PATH + '?q=' + query)
      api.get(PATIENTS_API_PATH + '?q=' + query)
        .then(response => response.json())
        .then(response => {
          commit(SET_FILTERED_PATIENTS, response.items)
        })
    } else {
      commit(SET_FILTERED_PATIENTS, [])
    }
  }
}
