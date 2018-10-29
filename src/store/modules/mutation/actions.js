import api from '@molgenis/molgenis-api-client'
import {
  SET_ALL_MUTATIONS,
  SET_TOTAL_MUTATIONS,
  SET_PATIENT_FOR_MUTATION,
  SET_FILTERED_MUTATIONS
} from './mutations'
/* API paths */
import {
  MUTATIONS_API_PATH,
  PATIENTS_API_PATH
} from '../../actions'

/* Action constants */
export const GET_FILTERED_MUTATIONS = '__GET_FILTERED_MUTATIONS__'
export const GET_ALL_MUTATIONS = '__GET_ALL_MUTATIONS__'
export const GET_PATIENT_FOR_MUTATION = '__GET_PATIENT_FOR_MUTATION__'

export default {
  [GET_ALL_MUTATIONS] ({commit}) {
    api.get(MUTATIONS_API_PATH + '?start=0&num=10000')
      .then(response => response.json())
      .then(response => {
        commit(SET_ALL_MUTATIONS, response.items)
        commit(SET_TOTAL_MUTATIONS, response.total)
      },
      error => {
        console.log('Error' + error)
      })
  },
  [GET_PATIENT_FOR_MUTATION] ({commit}, [id, mutation]) {
    api.get(PATIENTS_API_PATH + '?q=cDNAchange1=="' + mutation + '",cDNAchange2=="' + mutation + '"')
      .then(response => response.json())
      .then(response => {
        commit(SET_PATIENT_FOR_MUTATION, [id, response.items])
      })
  },
  [GET_FILTERED_MUTATIONS] ({state, commit}, query) {
    console.log('Query: ' + query)
    if (query.length > 0) {
      api.get(MUTATIONS_API_PATH + '?q=' + query)
        .then(response => response.json())
        .then(response => {
          commit(SET_FILTERED_MUTATIONS, response.items)
        })
    } else {
      commit(SET_FILTERED_MUTATIONS, [])
    }
  }
}
