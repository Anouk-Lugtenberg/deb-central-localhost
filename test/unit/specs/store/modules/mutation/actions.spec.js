import td from 'testdouble'
import api from '@molgenis/molgenis-api-client'
import utils from '@molgenis/molgenis-vue-test-utils'
import actions from '../../../../../../src/store/modules/mutation/actions'
import {
  SET_ALL_MUTATIONS,
  SET_TOTAL_MUTATIONS,
  SET_PATIENT_FOR_MUTATION,
  SET_MUTATIONS_FILTER_ACTIVE,
  SET_FILTERED_MUTATIONS,
  SET_MUTATIONS_BETWEEN_POSITION_START_AND_END
} from '../../../../../../src/store/modules/mutation/mutations'


describe('store', () => {
  describe('modules', () => {
    describe('mutation', () => {
      describe('actions', () => {
        afterEach(() => td.reset())
        describe('GET_ALL_MUTATIONS', () => {
          it('makes a call to the api to retrieve all the mutation information and the total amount of mutations', done => {
            const response = {
              json: function () {
                return {
                  items: [],
                  total: 0
                }
              }
            }
            const rootState = {
              MUTATION_API_PATH: 'Mutations',
              COLUMN_MUTATION_CDNANOTATION: 'cdna_notation'
            }
            const get = td.function('api.get')
            td.when(get(rootState.MUTATIONS_API_PATH + '?start=0&num=10000')).thenResolve(response)
            td.replace(api, 'get', get)

            const options = {
              rootState: rootState,
              expectedMutations: [{
                type: SET_ALL_MUTATIONS,
                payload: [response.json().items, rootState.COLUMN_MUTATION_CDNANOTATION]
              }, {
                type: SET_TOTAL_MUTATIONS,
                payload: response.json().total
              }]
            }
            utils.testAction(actions.__GET_ALL_MUTATIONS__, options, done)
          })
        })

        describe('GET_PATIENT_FOR_MUTATION', () => {
          const rootState = {
            MUTATION_COLUMNS_FOR_PATIENT: ['mutation1', 'mutation2'],
            PATIENTS_API_PATH: 'Patients',
            COLUMN_PATIENT_IDENTIFIER: 'PatientID'
          }
          const response = {
            json: function () {
              return {
                items: ['patient1', 'patient2']
              }
            }
          }
          it('should create a rsql query for patients per mutation for every column in MUTATION_COLUMNS_FOR_PATIENT and retrieve the patients from the server', done => {
            const get = td.function('api.get')
            td.when(get(rootState.PATIENTS_API_PATH + '?q=mutation1=in=\'c.3g>a\',mutation2=in=\'c.3g>a\'')).thenResolve(response)
            td.replace(api, 'get', get)

            const identifier = 'm1'
            const linkPatientMutation = 'c.3g>a'

            const options = {
              rootState: rootState,
              expectedMutations: [{
                type: SET_PATIENT_FOR_MUTATION,
                payload: [identifier, response.json().items, rootState.COLUMN_PATIENT_IDENTIFIER]
              }],
              payload: [identifier, linkPatientMutation]
            }
            utils.testAction(actions.__GET_PATIENT_FOR_MUTATION__, options, done)
          })

          it('should replace the plus sign (+) with %2B in the search query', done => {
            const get = td.function('api.get')
            td.when(get(rootState.PATIENTS_API_PATH + '?q=mutation1=in=c.3g%2Ba,mutation2=in=c.3g%2Ba')).thenResolve(response)
            td.replace(api, 'get', get)

            const identifier = 'm1'
            const linkPatientMutation = 'c.3g+a'

            const options = {
              rootState: rootState,
              expectedMutations: [{
                type: SET_PATIENT_FOR_MUTATION,
                payload: [identifier, response.json().items, rootState.COLUMN_PATIENT_IDENTIFIER]
              }],
              payload: [identifier, linkPatientMutation]
            }
            utils.testAction(actions.__GET_PATIENT_FOR_MUTATION__, options, done)
          })
        })

        describe('GET_FILTERED_MUTATION', () => {
          it('if there is a query available in the router it should get filtered mutations from server and set filter active to true', done => {
            const rootState = {
              route: {
                query: {
                  q: '*=q=searchString'
                }
              },
              MUTATIONS_API_PATH: 'Mutations',
              COLUMN_MUTATION_CDNANOTATION: 'cdna_notation'
            }

            const response = {
              json: function () {
                return {
                  items: ['mutation1', 'mutation2']
                }
              }
            }

            const get = td.function('api.get')
            td.when(get(rootState.MUTATIONS_API_PATH +'?q=*=q=searchString&start=0&num=10000')).thenResolve(response)
            td.replace(api, 'get', get)

            const options = {
              rootState: rootState,
              expectedMutations: [{
                type: SET_MUTATIONS_FILTER_ACTIVE,
                payload: true
              }, {
                type: SET_FILTERED_MUTATIONS,
                payload: [response.json().items, rootState.COLUMN_MUTATION_CDNANOTATION]
              }]
            }

            utils.testAction(actions.__GET_FILTERED_MUTATIONS__, options, done)
          })
        })

        describe('GET_MUTATIONS_BETWEEN_POSITION_START_AND_END', () => {
          const rootState = {
            COLUMN_MUTATION_POSITION: 'position'
          }
          const state = {
            mutations: {
              M1: {
                position: 4
              },
              M2: {
                position: 40
              },
              M3: {
                position: 800
              }
            }
          }
          it('should add the mutations which are between start and end to a list and commit these to mutation', done => {
            const options = {
              rootState: rootState,
              state: state,
              expectedMutations: [{
                type: SET_MUTATIONS_BETWEEN_POSITION_START_AND_END,
                payload: ['M1', 'M2']
              }],
              payload: [1, 50]
            }

            utils.testAction(actions.__GET_MUTATIONS_BETWEEN_POSITION_START_AND_END__, options, done)

          })
          it('should round viewStart and viewEnd to a fixed number', done => {
            const options = {
              rootState: rootState,
              state: state,
              expectedMutations: [{
                type: SET_MUTATIONS_BETWEEN_POSITION_START_AND_END,
                payload: ['M1', 'M2']
              }],
              payload: [1, 39.9]
            }
            utils.testAction(actions.__GET_MUTATIONS_BETWEEN_POSITION_START_AND_END__, options, done)
          })
        })
      })
    })
  })
})
