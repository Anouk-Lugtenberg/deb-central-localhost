import td from 'testdouble'
import api from '@molgenis/molgenis-api-client'
import utils from '@molgenis/molgenis-vue-test-utils'
import actions from '../../../../../../src/store/modules/patients/actions'
import {SET_ALL_PATIENTS} from '../../../../../../src/store/modules/patients/mutations'

describe('store', () => {
  describe('modules', () => {
    describe('mutation', () => {
      describe('actions', () => {
        afterEach(() => td.reset())
        describe('GET_ALL_PATIENTS', () => {
          it('should make a call to the api to retrieve all the patients and store it in the state', done => {
            const response = {
              json: function () {
                return {
                  items: []
                }
              }
            }
            const rootState = {
              PATIENTS_API_PATH: 'Patients',
              COLUMN_PATIENT_IDENTIFIER: 'PatientID',
              MUTATION_COLUMNS_FOR_PATIENT: ['MutationColumn1', 'MutationColumn2']
            }
            const get = td.function('api.get')
            td.when(get(rootState.PATIENTS_API_PATH + '?start=0&num=10000')).thenResolve(response)
            td.replace(api, 'get', get)

            const options = {
              rootState: rootState,
              expectedMutations: [{
                type: SET_ALL_PATIENTS,
                payload: [response.json().items, rootState.COLUMN_PATIENT_IDENTIFIER, rootState.MUTATION_COLUMNS_FOR_PATIENT]
              }]
            }
            utils.testAction(actions.__GET_ALL_PATIENTS__, options, done)
          })
        })
        describe('GET_FILTERED_PATIENTS', () => {

        })
      })
    })
  })
})
