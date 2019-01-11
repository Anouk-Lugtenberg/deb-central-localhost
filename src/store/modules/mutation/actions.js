import api from '@molgenis/molgenis-api-client'
import {
  SET_ALL_MUTATIONS,
  SET_TOTAL_MUTATIONS,
  SET_PATIENT_FOR_MUTATION,
  SET_MUTATIONS_FILTER_ACTIVE,
  SET_FILTERED_MUTATIONS,
  SET_MUTATIONS_BETWEEN_POSITION_START_AND_END
} from './mutations'
import {
  SET_ERROR
} from './../../mutations'

import { createInQueryPatientsPerMutation, createRSQLQueryPatientsPerMutation } from '../../helpers'
/* Action constants */
export const GET_FILTERED_MUTATIONS = '__GET_FILTERED_MUTATIONS__'
export const GET_ALL_MUTATIONS = '__GET_ALL_MUTATIONS__'
export const GET_PATIENT_FOR_MUTATION = '__GET_PATIENT_FOR_MUTATION__'
export const GET_MUTATIONS_BETWEEN_POSITION_START_AND_END = '__GET_MUTATIONS_BETWEEN_POSITION_START_AND_END__'

export default {
  [GET_ALL_MUTATIONS] ({commit, rootState}) {
    api.get(rootState.MUTATIONS_API_PATH + '?start=0&num=10000')
      .then(response => response.json())
      .then(response => {
        commit(SET_ALL_MUTATIONS, [response.items, rootState.COLUMN_MUTATION_CDNANOTATION])
        commit(SET_TOTAL_MUTATIONS, response.total)
      }, error => {
        commit(SET_ERROR, error, {root: true})
      })
  },
  // Identifier and linkPatientMutation are the same for DEB central, but not for CHD7/FIPA. That's why they're two different variables.
  [GET_PATIENT_FOR_MUTATION] ({commit, rootState}, [identifier, linkPatientMutation]) {
    let query = []
    rootState.MUTATION_COLUMNS_FOR_PATIENT.forEach(function (column) {
      query.push(createInQueryPatientsPerMutation(column, linkPatientMutation))
    })
    /* '+' is not handled right in the URL, so it's converted to '%2B' */
    api.get(rootState.PATIENTS_API_PATH + '?q=' + createRSQLQueryPatientsPerMutation(query).replace(new RegExp('\\+', 'g'), '%2B'))
      .then(response => response.json())
      .then(response => {
        commit(SET_PATIENT_FOR_MUTATION, [identifier, response.items, rootState.COLUMN_PATIENT_IDENTIFIER])
      }, error => {
        commit(SET_ERROR, error, {root: true})
      })
  },
  [GET_FILTERED_MUTATIONS] ({state, commit, rootState}) {
    if (typeof (rootState.route.query.q) !== 'undefined' && rootState.route.query.q.length > 0) {
      commit(SET_MUTATIONS_FILTER_ACTIVE, true)
      api.get(rootState.MUTATIONS_API_PATH + '?q=' + rootState.route.query.q + '&start=0&num=10000')
        .then(response => response.json())
        .then(response => {
          commit(SET_FILTERED_MUTATIONS, [response.items, rootState.COLUMN_MUTATION_CDNANOTATION])
        }, error => {
          commit(SET_ERROR, error, {root: true})
        })
    }
  },
  [GET_MUTATIONS_BETWEEN_POSITION_START_AND_END] ({state, commit, rootState}, [viewStart, viewEnd]) {
    let start = viewStart.toFixed(0)
    let end = viewEnd.toFixed(0)
    let positionColumn = rootState.COLUMN_MUTATION_POSITION
    let mutationsBetweenPosition = []
    Object.keys(state.mutations).forEach(function (mutation) {
      let position = state.mutations[mutation][positionColumn]
      if (start <= position && position <= end) {
        mutationsBetweenPosition.push(mutation)
      }
    })
    commit(SET_MUTATIONS_BETWEEN_POSITION_START_AND_END, mutationsBetweenPosition)
  }
}
