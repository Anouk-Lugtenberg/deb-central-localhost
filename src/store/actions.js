import api from '@molgenis/molgenis-api-client'
import {
  SET_METADATA,
  SET_FILTER_GROUP_INFORMATION
} from './mutations'
import {
  MUTATION_TABLE,
  PATIENT_TABLE
} from './config'
import { createActiveFilterQueries } from './helpers'
import { SET_ACTIVE_FILTERS_PATIENTS } from './modules/patients/mutations'
import { SET_ACTIVE_FILTERS_MUTATIONS } from './modules/mutation/mutations'

/* ACTION CONSTANTS */
export const GET_METADATA = '__GET_METADATA__'
export const GET_FILTER_GROUP_INFORMATION = '__GET_FILTER_GROUP_INFORMATION__'
export const SET_FILTERS_CHECKBOX = '__SET_FILTERS_CHECKBOX__'

/* Tables */
const TABLES = [MUTATION_TABLE, PATIENT_TABLE]

export default {
  [GET_METADATA] (context) {
    for (let i = 0; i < TABLES.length; i++) {
      api.get('/api/v2/' + TABLES[i] + '?start=0&num=10')
        .then(response => response.json())
        .then(response => {
          context.commit(SET_METADATA, [response.meta.attributes, TABLES[i]])
        })
    }
  },
  [GET_FILTER_GROUP_INFORMATION] ({commit}, [table, name, href]) {
    api.get(href)
      .then(response => response.json())
      .then(response => {
        commit(SET_FILTER_GROUP_INFORMATION, [table, name, response])
      })
  },
  [SET_FILTERS_CHECKBOX] ({commit, state}) {
    Object.keys(state.filterGroupInformation).map(function (attribute) {
      let activeFilters = []
      let filterListPerAttribute = state.filterGroupInformation[attribute]
      Object.keys(filterListPerAttribute).map(function (filterName) {
        activeFilters.push(createActiveFilterQueries(filterName, filterListPerAttribute[filterName]))
      })
      if (attribute.includes(PATIENT_TABLE)) {
        commit('patients/' + SET_ACTIVE_FILTERS_PATIENTS, activeFilters)
      } else if (attribute.includes(MUTATION_TABLE)) {
        commit('mutation/' + SET_ACTIVE_FILTERS_MUTATIONS, activeFilters)
      }
    })
  }
}
