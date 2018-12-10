import api from '@molgenis/molgenis-api-client'
import {
  SET_TOTAL_PATIENTS,
  SET_ALL_PATIENTS,
  SET_PATIENT_INFORMATION_PATIENT_ID,
  SET_FILTERED_PATIENTS,
  SET_PATIENTS_FILTER_ACTIVE,
  SET_PATIENTS_FOR_PUBLICATION_IDENTIFIER
} from './mutations'
import {
  SET_ERROR
} from './../../mutations'
import { setFilterGroupInformationFromURL } from '../../helpers'

export const GET_PATIENTS_INFORMATION_PATIENT_ID = '__GET_PATIENTS_INFORMATION_PATIENT_ID__'
export const GET_ALL_PATIENTS = '__GET_ALL_PATIENTS__'
export const GET_FILTERED_PATIENTS = '__GET_FILTERED_PATIENTS__'
export const GET_PATIENTS_FOR_PUBLICATION_IDENTIFIER = '__GET_PATIENTS_FOR_PUBLICATION_IDENTIFIER__'

export default {
  [GET_ALL_PATIENTS] ({commit, rootState}) {
    api.get(rootState.PATIENTS_API_PATH + '?start=0&num=10000')
      .then(response => response.json())
      .then(response => {
        commit(SET_TOTAL_PATIENTS, response.total)
        commit(SET_ALL_PATIENTS, [response.items, rootState.COLUMN_PATIENT_IDENTIFIER, rootState.MUTATION_COLUMNS_FOR_PATIENT])
      }, error => {
        commit(SET_ERROR, error, {root: true})
      })
  },
  [GET_PATIENTS_INFORMATION_PATIENT_ID] ({commit, rootState}, id) {
    api.get(rootState.PATIENTS_API_PATH + '/' + id)
      .then(response => response.json())
      .then(response => {
        commit(SET_PATIENT_INFORMATION_PATIENT_ID, [id, response])
      }, error => {
        commit(SET_ERROR, error, {root: true})
      })
  },
  [GET_FILTERED_PATIENTS] ({state, commit, rootState}) {
    if (typeof (rootState.route.query.q) !== 'undefined' && rootState.route.query.q.length > 0) {
      commit(SET_PATIENTS_FILTER_ACTIVE, true)
      api.get(rootState.PATIENTS_API_PATH + '?q=' + rootState.route.query.q + '&start=0&num=10000')
        .then(response => response.json())
        .then(response => {
          commit(SET_FILTERED_PATIENTS, [response.items, rootState.COLUMN_PATIENT_IDENTIFIER, rootState.MUTATION_COLUMNS_FOR_PATIENT])
        }, error => {
          commit(SET_ERROR, error, {root: true})
        })
    } else {
      rootState.filterGroupInformation = setFilterGroupInformationFromURL(rootState.filterGroupInformation, '', rootState.PATIENT_TABLE)
      commit(SET_PATIENTS_FILTER_ACTIVE, false)
      commit(SET_FILTERED_PATIENTS, [])
    }
  },
  [GET_PATIENTS_FOR_PUBLICATION_IDENTIFIER] ({state, commit, rootState}, id) {
    api.get(rootState.PATIENTS_API_PATH + '?q=' + rootState.COLUMN_PUBMED_ID_PATIENT_TABLE + '=in=' + id)
      .then(response => response.json())
      .then(response => {
        commit(SET_PATIENTS_FOR_PUBLICATION_IDENTIFIER, [id, response.items, rootState.COLUMN_PATIENT_IDENTIFIER])
      }, error => {
        commit(SET_ERROR, error, {root: true})
      })
  }
}
