import td from 'testdouble'
import api from '@molgenis/molgenis-api-client'
import utils from '@molgenis/molgenis-vue-test-utils'
import actions from '../../../../src/store/actions'
import {SET_ALL_REFERENCES, SET_METADATA, SET_REFERENCE_METADATA} from '../../../../src/store/mutations'

describe('store', () => {
  describe('actions', () => {
    afterEach(() => td.reset())
    // const getters = {
    //   getVisibleFields: {Mutations: ['exon']},
    //   getVisibleFilters: {}
    // }
    const state = {
      MUTATION_TABLE: 'Mutations',
      PATIENT_TABLE: 'Patients',
      PUBLICATIONS_API_PATH: '/api/v2/col7a1_Publications'
    }
    describe('GET_ALL_REFERENCES', () => {
      it('should get the references, and store them in the state', done => {
        const response = {
          json: function () {
            return {items: [], meta: []}
          }
        }
        const get = td.function('api.get')
        td.when(get('/api/v2/col7a1_Publications?start=0&num=10000')).thenResolve(response)
        td.replace(api, 'get', get)
        const options = {
          state: state,
          expectedMutations: [{
            type: SET_ALL_REFERENCES, payload: [],
          }, {
            type: SET_REFERENCE_METADATA, payload: []
          }]
        }
        utils.testAction(actions.__GET_ALL_REFERENCES__, options, done)
      })
    })
    // describe('GET_METADATA', () => {
    //   it('should retrieve a list with metadata from the server and store them in the state', done => {
    //     const response = {
    //       meta: {
    //         name: 'Mutations',
    //         label: 'Mutations',
    //         attributes: [{
    //           fieldType: 'DECIMAL',
    //           name: 'numericID',
    //           label: 'numericID'
    //         }, {
    //           fieldType: 'XREF',
    //           name: 'exon',
    //           label: 'Exon',
    //           refEntity: {
    //             href: '/api/v2/exon'
    //           }
    //         }]
    //       }
    //     }
    //     const get = td.function('api.get')
    //     td.when(get('/api/v2/Mutations?start=0&num=10')).thenResolve(response)
    //     td.replace(api, 'get', get)
    //
    //     const options = {
    //       getters: getters,
    //       state: state,
    //       expectedMutations: [
    //         {type: SET_METADATA, payload: response.meta.attributes}
    //       ]
    //     }
    //     utils.testAction(actions.__GET_METADATA__, options, done)
    //   })
    // })
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
