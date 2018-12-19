import api from '@molgenis/molgenis-api-client'
import {
  SET_METADATA,
  SET_LIST_METADATA_COLUMNS_MUTATIONS,
  SET_FILTER_GROUP_INFORMATION,
  SET_ERROR,
  SET_TABLE_FOR_FILTER_GROUP_INFORMATION,
  SET_FILTER_GROUP_INFORMATION_ENUM,
  SET_ALL_REFERENCES,
  SET_FILTERED_REFERENCES,
  SET_REFERENCE_METADATA
} from './mutations'

import { createActiveFilterQueries, setFilterGroupInformationFromURL } from './helpers'
import { SET_ACTIVE_FILTERS_PATIENTS } from './modules/patients/mutations'
import { SET_ACTIVE_FILTERS_MUTATIONS } from './modules/mutation/mutations'

/* ACTION CONSTANTS */
export const GET_METADATA_PATIENTS = '__GET_METADATA_PATIENTS__'
export const GET_METADATA_MUTATIONS = '__GET_METADATA_MUTATIONS__'
export const SET_FILTERS_FROM_ACTIVE_CHECKBOXES = '__SET_FILTERS_FROM_ACTIVE_CHECKBOXES__'
export const GET_FILTERED_GROUP_INFORMATION = '__GET_FILTERED_GROUP_INFORMATION__'
export const GET_FILTERS_FROM_URL = '__GET_FILTERS_FROM_URL__'
export const RESET_FILTERS = '__RESET_FILTERS__'
export const GET_ALL_REFERENCES = '__GET_ALL_REFERENCES__'
export const GET_FILTERED_REFERENCES = '__GET_FILTERED_REFERENCES__'

export default {
  [GET_METADATA_PATIENTS] ({commit, state, getters}) {
    let VISIBLE_FIELDS = getters.getVisibleFields[state.PATIENT_TABLE]
    let VISIBLE_FILTERS = getters.getVisibleFilters[state.PATIENT_TABLE]
    api.get(state.PATIENTS_API_PATH + '?start=0&num=0')
      .then(response => response.json())
      .then(response => {
        commit(SET_METADATA, [response.meta.attributes, state.PATIENT_TABLE,
          VISIBLE_FIELDS, VISIBLE_FILTERS, state.MUTATION_COLUMNS_FOR_PATIENT])
      }, error => {
        commit(SET_ERROR, error)
      })
  },
  [GET_METADATA_MUTATIONS] ({commit, state, getters}) {
    let VISIBLE_FIELDS = getters.getVisibleFields[state.MUTATION_TABLE]
    let VISIBLE_FILTERS = getters.getVisibleFilters[state.MUTATION_TABLE]
    api.get(state.MUTATIONS_API_PATH + '?start=0&num=0')
      .then(response => response.json())
      .then(response => {
        commit(SET_METADATA, [response.meta.attributes, state.MUTATION_TABLE,
          VISIBLE_FIELDS, VISIBLE_FILTERS, []])
        commit(SET_LIST_METADATA_COLUMNS_MUTATIONS, [response.meta.attributes,
          state.MUTATION_TABLE, state.VISIBLE_COLUMNS_MUTATION_PATIENTS_CARD])
      }, error => {
        commit(SET_ERROR, error)
      })
  },
  [GET_FILTERED_GROUP_INFORMATION] ({commit, state}, table) {
    /* Adds table as key if it isn't available yet */
    if (!(state.filterGroupInformation.hasOwnProperty(table))) {
      commit(SET_TABLE_FOR_FILTER_GROUP_INFORMATION, table)
    }
    Object.keys(state.metadata[table].map(function (field) {
      if (field.isFilter) {
        if (field.fieldType === 'ENUM') {
          commit(SET_FILTER_GROUP_INFORMATION_ENUM, [table, field.name, field])
        } else {
          api.get(field.refEntity.href)
            .then(response => response.json())
            .then(response => {
              commit(SET_FILTER_GROUP_INFORMATION, [table, field.name, response])
            }, error => {
              commit(SET_ERROR, error)
            })
        }
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
  },
  [GET_ALL_REFERENCES] ({commit, state}) {
    api.get(state.PUBLICATIONS_API_PATH + '?start=0&num=10000')
      .then(response => response.json())
      .then(response => {
        commit(SET_ALL_REFERENCES, response.items)
        commit(SET_REFERENCE_METADATA, response.meta)
      }, error => {
        commit(SET_ERROR, error)
      })
  },
  [GET_FILTERED_REFERENCES] ({commit, state}) {
    api.get(state.PUBLICATIONS_API_PATH + '?q=' + state.route.query.q)
      .then(response => response.json())
      .then(response => {
        commit(SET_FILTERED_REFERENCES, [state.COLUMN_PUBMED_ID_REFERENCE_TABLE, response.items])
      })
  }
}
