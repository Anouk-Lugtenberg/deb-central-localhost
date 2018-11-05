import api from '@molgenis/molgenis-api-client'
import {
  SET_ALL_MUTATIONS,
  SET_TOTAL_MUTATIONS,
  SET_PATIENT_FOR_MUTATION,
  SET_MUTATIONS_FILTER_ACTIVE,
  SET_FILTERED_MUTATIONS
} from './mutations'
// import {
//   GET_FILTERED_GROUP_INFORMATION
// } from '../../../store/actions'

/* API paths */
import {
  MUTATIONS_API_PATH,
  PATIENTS_API_PATH,
  MUTATION_COLUMNS_FOR_PATIENT,
  MUTATION_TABLE
} from '../../config'
import { createInQueryPatientsPerMutation, createRSQLQueryPatientsPerMutation, setFilterGroupInformationFromURL } from '../../helpers'
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
    let query = []
    MUTATION_COLUMNS_FOR_PATIENT.forEach(function (column) {
      query.push(createInQueryPatientsPerMutation(column, mutation))
    })
    /* '+' is not handled right in the URL, so it's converted to '%2B' */
    api.get(PATIENTS_API_PATH + '?q=' + createRSQLQueryPatientsPerMutation(query).replace(new RegExp('\\+', 'g'), '%2B'))
      .then(response => response.json())
      .then(response => {
        commit(SET_PATIENT_FOR_MUTATION, [id, response.items])
      })
  },
  [GET_FILTERED_MUTATIONS] ({state, commit, rootState}) {
    if (typeof (rootState.route.query.q) !== 'undefined' && rootState.route.query.q.length > 0) {
      commit(SET_MUTATIONS_FILTER_ACTIVE, true)
      rootState.filterGroupInformation = setFilterGroupInformationFromURL(rootState.filterGroupInformation, rootState.route.query.q, MUTATION_TABLE)
      api.get(MUTATIONS_API_PATH + '?q=' + rootState.route.query.q + '&start=0&num=10000')
        .then(response => response.json())
        .then(response => {
          commit(SET_FILTERED_MUTATIONS, response.items)
        })
    } else {
      commit(SET_MUTATIONS_FILTER_ACTIVE, false)
      commit(SET_FILTERED_MUTATIONS, [])
    }
  }
}
