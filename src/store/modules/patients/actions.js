import api from '@molgenis/molgenis-api-client'
import {
  SET_TOTAL_PATIENTS,
  SET_ALL_PATIENTS,
  SET_PATIENT_INFORMATION_PATIENT_ID
} from './mutations'
/* API paths */
import {
  PATIENTS_API_PATH
} from '../../actions'

export const GET_PATIENTS_INFORMATION_PATIENT_ID = '__GET_PATIENTS_INFORMATION_PATIENT_ID__'
export const GET_ALL_PATIENTS = '__GET_ALL_PATIENTS__'

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
  }
}
