import td from 'testdouble'
import api from '@molgenis/molgenis-api-client'
import utils from '@molgenis/molgenis-vue-test-utils'
import actions from '../../../../../../src/store/modules/mutation/actions'
import { SET_TOTAL_MUTATIONS } from '../../../../../../src/store/modules/mutation/mutations'

describe('store', () => {
  describe('modules', () => {
    describe('mutation', () => {
      describe('actions', () => {
        afterEach(() => td.reset())
        describe('GET_ALL_MUTATIONS', () => {
          it('should do something', done => {
            const state = {
              MUTATIONS_API_PATH: 'Mutations'
            }
            const response = {
              json: function () {
                return {
                  items: [],
                  total: 0
                }
              }
            }
            const get = td.function('api.get')
            td.when(get(state.MUTATIONS_API_PATH + '?start=0&num=10000')).thenResolve(response)
            td.replace(api, 'get', get)

            const options = {
              state: state,
              expectedMutations: [{
                type: SET_TOTAL_MUTATIONS,
                payload: [response.json().total]
              }],
              payload: {
                rootState: state
              }
            }
            utils.testAction(actions.__GET_ALL_MUTATIONS__, options, done)
          })
        })
      })
    })
  })
})
