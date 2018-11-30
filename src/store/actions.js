import api from '@molgenis/molgenis-api-client'
import {
  SET_METADATA,
  SET_LIST_METADATA_COLUMNS_MUTATIONS,
  SET_FILTER_GROUP_INFORMATION,
  SET_ERROR,
  SET_TABLE_FOR_FILTER_GROUP_INFORMATION,
  SET_FILTER_GROUP_INFORMATION_ENUM
} from './mutations'

import { createActiveFilterQueries, setFilterGroupInformationFromURL } from './helpers'
import { SET_ACTIVE_FILTERS_PATIENTS } from './modules/patients/mutations'
import { SET_ACTIVE_FILTERS_MUTATIONS } from './modules/mutation/mutations'

/* ACTION CONSTANTS */
export const GET_METADATA = '__GET_METADATA__'
export const SET_FILTERS_FROM_ACTIVE_CHECKBOXES = '__SET_FILTERS_CHECKBOX__'
export const GET_FILTERED_GROUP_INFORMATION = '__GET_FILTERED_GROUP_INFORMATION__'
export const GET_FILTERS_FROM_URL = '__GET_FILTERS_FROM_URL__'
export const RESET_FILTERS = '__RESET_FILTERS__'

export default {
  [GET_METADATA] ({commit, state, getters, rootState}) {
    let VISIBLE_FIELDS = getters.getVisibleFields
    let VISIBLE_FILTERS = getters.getVisibleFilters
    let TABLES = [state.MUTATION_TABLE, state.PATIENT_TABLE]
    for (let i = 0; i < TABLES.length; i++) {
      api.get(`/api/v2/${TABLES[i]}?start=0&num=10`)
        .then(response => response.json())
        .then(response => {
          commit(SET_METADATA, [response.meta.attributes, TABLES[i], VISIBLE_FIELDS[TABLES[i]],
            VISIBLE_FILTERS[TABLES[i]], state.MUTATION_COLUMNS_FOR_PATIENT])
          if (state.MUTATION_TABLE.includes(TABLES[i])) {
            commit(SET_LIST_METADATA_COLUMNS_MUTATIONS, [response.meta.attributes, TABLES[i], rootState.VISIBLE_COLUMNS_MUTATION_PATIENTS_CARD])
          }
        }, error => {
          commit(SET_ERROR, error)
        })
    }
  },
  [GET_FILTERED_GROUP_INFORMATION] ({commit, state}, table) {
    if (!(state.filterGroupInformation.hasOwnProperty(table))) {
      commit(SET_TABLE_FOR_FILTER_GROUP_INFORMATION, table)
    }
    Object.keys(state.metadata[table].map(function (field) {
      if (field.isFilter) {
        if (field.fieldType === 'ENUM') {
          commit(SET_FILTER_GROUP_INFORMATION_ENUM, [table, field.name, field])
        }
        api.get(field.refEntity.href)
          .then(response => response.json())
          .then(response => {
            commit(SET_FILTER_GROUP_INFORMATION, [table, field.name, response])
          }, error => {
            commit(SET_ERROR, error)
          })
      }
      if (field.fieldType === 'COMPOUND') {
        field.attributes.forEach(function (attribute) {
          if (attribute.isFilter) {
            if (attribute.fieldType === 'ENUM') {
              commit(SET_FILTER_GROUP_INFORMATION_ENUM, [table, attribute.name, attribute])
            } else {
              api.get(attribute.refEntity.href)
                .then(response => response.json())
                .then(response => {
                  commit(SET_FILTER_GROUP_INFORMATION, [table, attribute.name, response])
                }, error => {
                  commit(SET_ERROR, error)
                })
            }
          }
        })
      }
    }
    ))
  },
  [SET_FILTERS_FROM_ACTIVE_CHECKBOXES] ({commit, state}) {
    Object.keys(state.filterGroupInformation).map(function (attribute) {
      let activeFilters = []
      let filterListPerAttribute = state.filterGroupInformation[attribute]
      Object.keys(filterListPerAttribute).map(function (filterName) {
        activeFilters.push(createActiveFilterQueries(filterName, filterListPerAttribute[filterName]))
      })
      if (attribute.includes(state.PATIENT_TABLE)) {
        commit('patients/' + SET_ACTIVE_FILTERS_PATIENTS, activeFilters)
      } else if (attribute.includes(state.MUTATION_TABLE)) {
        commit('mutation/' + SET_ACTIVE_FILTERS_MUTATIONS, activeFilters)
      }
    })
  },
  [GET_FILTERS_FROM_URL] ({commit, state, dispatch}) {
    state.filterGroupInformation = setFilterGroupInformationFromURL(state.filterGroupInformation, state.route.query.q)
    dispatch(SET_FILTERS_FROM_ACTIVE_CHECKBOXES)
  },
  [RESET_FILTERS] ({commit, state, dispatch}) {
    state.filterGroupInformation = setFilterGroupInformationFromURL(state.filterGroupInformation, '')
    dispatch(SET_FILTERS_FROM_ACTIVE_CHECKBOXES)
  }
}
