import td from 'testdouble'
import api from '@molgenis/molgenis-api-client'
import utils from '@molgenis/molgenis-vue-test-utils'
import actions from '../../../../src/store/actions'
import {
  SET_ALL_REFERENCES,
  SET_LIST_METADATA_COLUMNS_MUTATIONS,
  SET_METADATA,
  SET_REFERENCE_METADATA
} from '../../../../src/store/mutations'

describe('store', () => {
  describe('actions', () => {
    afterEach(() => td.reset())
    const getters = {
      getVisibleFields: {
        Mutations: ['fieldMutations'],
        Patients: ['fieldPatients']
      },
      getVisibleFilters: {
        Mutations: ['filterMutations'],
        Patients: ['filterPatients']
      }
    }
    const state = {
      MUTATION_TABLE: 'Mutations',
      PATIENT_TABLE: 'Patients',
      PUBLICATIONS_API_PATH: '/api/v2/col7a1_Publications',
      PATIENTS_API_PATH: '/api/v2/Patients',
      MUTATIONS_API_PATH: '/api/v2/Mutations',
      MUTATION_COLUMNS_FOR_PATIENT: ['cDNAnotation'],
      VISIBLE_COLUMNS_MUTATION_PATIENTS_CARD: ['aaNotation']
    }
    describe('GET_METADATA_PATIENTS', () => {
      it('should retrieve the metadata for the patients table from the server and store them in the state', done => {
        const response = {
          json: function () {
            return {
              meta: {
                attributes: [{
                  href: 'api/test'
                }]
              }
            }
          }
        }

        const get = td.function('api.get')
        td.when(get(state.PATIENTS_API_PATH + '?start=0&num=0')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          getters: getters,
          state: state,
          expectedMutations: [{
            type: SET_METADATA, payload: [response.json().meta.attributes, state.PATIENT_TABLE,
              ['fieldPatients'], ['filterPatients'], ['cDNAnotation']]
          }]
        }

        utils.testAction(actions.__GET_METADATA_PATIENTS__, options, done)
      })
    })
    describe('GET_METADATA_MUTATIONS', () => {
      it('should retrieve the metadata for the mutations table from the server and dispatch mutations SET_METADATA and SET_LIST_METDATA_COLUMNS_MUTATIONS', done => {
        const response = {
          json: function () {
            return {
              meta: {
                attributes: [{
                  href: 'api/test'
                }]
              }
            }
          }
        }

        const get = td.function('api.get')
        td.when(get(state.MUTATIONS_API_PATH + '?start=0&num=0')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          getters: getters,
          state: state,
          expectedMutations: [{
            type: SET_METADATA, payload: [response.json().meta.attributes, state.MUTATION_TABLE,
              ['fieldMutations'], ['filterMutations'], []]
          }, {
            type: SET_LIST_METADATA_COLUMNS_MUTATIONS, payload: [response.json().meta.attributes, state.MUTATION_TABLE, ['aaNotation']]
          }]
        }

        utils.testAction(actions.__GET_METADATA_MUTATIONS__, options, done)
      })
    })
    describe('GET_ALL_REFERENCES', () => {
      it('should get the references, and dispatch actions SET_ALL_REFERENCES and SET_REFERENCE_METADATA', done => {
        const response = {
          json: function () {
            return {items: [], meta: []}
          }
        }
        const get = td.function('api.get')
        td.when(get(state.PUBLICATIONS_API_PATH + '?start=0&num=10000')).thenResolve(response)
        td.replace(api, 'get', get)
        const options = {
          state: state,
          expectedMutations: [{
            type: SET_ALL_REFERENCES, payload: []
          }, {
            type: SET_REFERENCE_METADATA, payload: []
          }]
        }
        utils.testAction(actions.__GET_ALL_REFERENCES__, options, done)
      })
    })
    // describe('RESET_FILTERS', () => {
    //   it('should dispatch the action to reset the filters from the checkboxes', done => {
    //     const state = {
    //       filterGroupInformation: ''
    //     }
    //     const options = {
    //       state: state,
    //       expectedActions: [
    //         {type: SET_FILTERS_FROM_ACTIVE_CHECKBOXES, payload: ''}
    //       ]
    //     }
    //     utils.testAction(actions.__RESET_FILTERS__, options, done)
    //   })
    //   it('should reset set the active filter boolean in filteredgroupmutation to false for every filter', done => {
    //     const state = {
    //       filterGroupInformation: {
    //         Mutations: {
    //           consequence: [
    //             {
    //               activeFilter: true,
    //               label: 'Consequence1',
    //               name: 'Consequence 1'
    //             }, {
    //               activeFilter: true,
    //               label: 'Consequence2',
    //               name: 'Consequence 2'
    //             }
    //           ]
    //         }
    //       }
    //     }
    //
    //   })
    // })
  })
})
