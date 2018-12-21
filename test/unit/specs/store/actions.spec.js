import td from 'testdouble'
import api from '@molgenis/molgenis-api-client'
import utils from '@molgenis/molgenis-vue-test-utils'
import { expect } from 'chai'
import actions, {SET_FILTERS_FROM_ACTIVE_CHECKBOXES} from '../../../../src/store/actions'
import {
  SET_ALL_REFERENCES,
  SET_LIST_METADATA_COLUMNS_MUTATIONS,
  SET_METADATA,
  SET_REFERENCE_METADATA,
  SET_TABLE_FOR_FILTER_GROUP_INFORMATION,
  SET_FILTER_GROUP_INFORMATION_ENUM,
  SET_FILTER_GROUP_INFORMATION, SET_FILTERED_REFERENCES
} from '../../../../src/store/mutations'
import {
  SET_ACTIVE_FILTERS_PATIENTS
} from '../../../../src/store/modules/patients/mutations'
import {
  SET_ACTIVE_FILTERS_MUTATIONS
} from '../../../../src/store/modules/mutation/mutations'

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
            type: SET_METADATA,
            payload: [response.json().meta.attributes, state.PATIENT_TABLE,
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
            type: SET_METADATA,
            payload: [response.json().meta.attributes, state.MUTATION_TABLE,
              ['fieldMutations'], ['filterMutations'], []]
          }, {
            type: SET_LIST_METADATA_COLUMNS_MUTATIONS, payload: [response.json().meta.attributes, state.MUTATION_TABLE, ['aaNotation']]
          }]
        }

        utils.testAction(actions.__GET_METADATA_MUTATIONS__, options, done)
      })
    })

    describe('GET_FILTERED_GROUP_INFORMATION', () => {
      it('should call the mutation SET_TABLE_FOR_FILTER_GROUP_INFORMATION if table doesnt exist as key in state filterGroupInformation', done => {
        const state = {
          filterGroupInformation: {}
        }
        const options = {
          state: state,
          expectedMutations: [
            {type: SET_TABLE_FOR_FILTER_GROUP_INFORMATION, payload: 'Patients'}
          ],
          payload: 'Patients'
        }
        utils.testAction(actions.__GET_FILTERED_GROUP_INFORMATION__, options, done)
      })

      it('should retrieve refEntity information from state and commit SET_FILTER_GROUP_INFORMATION if field is filter', done => {
        const state = {
          filterGroupInformation: {
            'Mutations': {}
          },
          metadata: {
            'Mutations': [{
              fieldType: 'MREF',
              name: 'mrefForTest',
              isFilter: true,
              refEntity: {
                href: '/url/for/test'
              }
            }]
          }
        }
        const response = {
          json: function () {
            return {
              href: '/url/for/test',
              meta: {},
              items: [{
                _href: '/url/to/single/option1',
                mrefForTest: 'option1'
              }, {
                _href: '/url/to/single/option2',
                mrefForTest: 'option2'
              }]
            }
          }
        }
        const options = {
          state: state,
          expectedMutations: [
            {type: SET_FILTER_GROUP_INFORMATION,
              payload: ['Mutations', 'mrefForTest', response.json()]}
          ],
          payload: 'Mutations'
        }
        const get = td.function('api.get')
        td.when(get('/url/for/test')).thenResolve(response)
        td.replace(api, 'get', get)

        utils.testAction(actions.__GET_FILTERED_GROUP_INFORMATION__, options, done)
      })
      it('should commit mutation SET_FILTER_GROUP_INFORMATION if field which is filter is deeper nested in field with type compound', done => {
        const state = {
          filterGroupInformation: {
            'Mutations': {}
          },
          metadata: {
            'Mutations': [{
              fieldType: 'COMPOUND',
              attributes: [{
                href: '/url/for/test/compound',
                fieldType: 'CATEGORICAL',
                name: 'categoricalForTest',
                isFilter: true,
                refEntity: {
                  href: '/url/for/test/compound/attribute'
                }
              }]
            }]
          }
        }
        const response = {
          json: function () {
            return {
              href: '/url/for/test/compound',
              meta: {},
              items: [{
                _href: '/url/to/single/option1',
                categoricalForTest: 'option1'
              }, {
                _href: '/url/to/single/option2',
                categoricalForTest: 'option2'
              }]
            }
          }
        }
        const options = {
          state: state,
          expectedMutations: [{
            type: SET_FILTER_GROUP_INFORMATION,
            payload: ['Mutations', 'categoricalForTest', response.json()]
          }],
          payload: 'Mutations'
        }
        const get = td.function('api.get')
        td.when(get('/url/for/test/compound/attribute')).thenResolve(response)
        td.replace(api, 'get', get)

        utils.testAction(actions.__GET_FILTERED_GROUP_INFORMATION__, options, done)
      })

      const stateFieldTypeEnum = {
        filterGroupInformation: {
          'Mutations': {}
        },
        metadata: {
          'Mutations': [{
            fieldType: 'ENUM',
            name: 'enumForTest',
            isFilter: true
          }, {
            fieldType: 'COMPOUND',
            attributes: [{
              fieldType: 'ENUM',
              name: 'enumForTest',
              isFilter: true
            }]
          }]
        }
      }

      it('should loop through the metadata from the tables and commit mutation SET_FILTER_GROUP_INFORMATION_ENUM is field is of fieldtype ENUM', done => {
        const options = {
          state: stateFieldTypeEnum,
          expectedMutations: [
            {type: SET_FILTER_GROUP_INFORMATION_ENUM,
              payload: ['Mutations', 'enumForTest', {
                fieldType: 'ENUM',
                name: 'enumForTest',
                isFilter: true
              }]}
          ],
          payload: 'Mutations'
        }
        utils.testAction(actions.__GET_FILTERED_GROUP_INFORMATION__, options, done)
      })
      it('should commit mutation SET_FILTER_GROUP_INFORMATION_ENUM if field with type enum is deeper nested in field with type compound', done => {
        const options = {
          state: stateFieldTypeEnum,
          expectedMutations: [
            {type: SET_FILTER_GROUP_INFORMATION_ENUM,
              payload: ['Mutations', 'enumForTest', {
                fieldType: 'ENUM',
                name: 'enumForTest',
                isFilter: true
              }]}
          ],
          payload: 'Mutations'
        }
        utils.testAction(actions.__GET_FILTERED_GROUP_INFORMATION__, options, done)
      })
    })

    describe('SET_FILTERS_FROM_ACTIVE_CHECKBOXES', () => {
      it('should commit mutation for setting active filters patients when there are no active filters active', done => {
        const state = {
          filterGroupInformation: {
            'Patients': {
              'blistering': [{
                activeFilter: false,
                name: 'yes'
              }]
            }
          },
          PATIENT_TABLE: 'Patients',
          MUTATION_TABLE: 'Mutations'
        }
        const options = {
          state: state,
          expectedMutations: [{
            type: 'patients/' + SET_ACTIVE_FILTERS_PATIENTS,
            payload: [[]]
          }]
        }
        utils.testAction(actions.__SET_FILTERS_FROM_ACTIVE_CHECKBOXES__, options, done)
      })
      it('should commit mutation for setting active filters mutations when there are no active filters', done => {
        const state = {
          filterGroupInformation: {
            'Mutations': {
              'consequence': [{
                activeFilter: false,
                name: 'no'
              }]
            }
          },
          PATIENT_TABLE: 'Patients',
          MUTATION_TABLE: 'Mutations'
        }
        const options = {
          state: state,
          expectedMutations: [{
            type: 'mutation/' + SET_ACTIVE_FILTERS_MUTATIONS,
            payload: [[]]
          }]
        }
        utils.testAction(actions.__SET_FILTERS_FROM_ACTIVE_CHECKBOXES__, options, done)
      })
      it('should add the filters which are active to the list with active filters and commit mutation for co-responding table', done => {
        const state = {
          filterGroupInformation: {
            'Mutations': {
              'consequence': [{
                activeFilter: false,
                name: 'consequence1'
              }, {
                activeFilter: true,
                name: 'consequence2'
              }]
            },
            'Patients': {
              'blistering': [{
                activeFilter: true,
                name: 'no'
              }, {
                activeFilter: false,
                name: 'yes'
              }]
            }
          },
          PATIENT_TABLE: 'Patients',
          MUTATION_TABLE: 'Mutations'
        }
        const activeFiltersMutations = [[{selector: 'consequence', comparison: '=in=', arguments: ['consequence2']}]]
        const options = {
          state: state,
          expectedMutations: [{
            type: 'mutation/' + SET_ACTIVE_FILTERS_MUTATIONS,
            payload: activeFiltersMutations
          }]
        }
        utils.testAction(actions.__SET_FILTERS_FROM_ACTIVE_CHECKBOXES__, options, done)
        const activeFiltersPatients = [{selector: 'blistering', comparison: '=in=', arguments: ['no', 'yes']}]
        const optionsPatients = {
          state: state,
          expectedMutations: [{
            type: 'patients/' + SET_ACTIVE_FILTERS_PATIENTS,
            payload: activeFiltersPatients
          }]
        }
        utils.testAction(actions.__SET_FILTERS_FROM_ACTIVE_CHECKBOXES__, optionsPatients, done)
      })
    })

    describe('GET_FILTERS_FROM_URL', () => {
      const state = {
        route: {
          query: {
            q: 'blistering=in=(unknown)'
          }
        },
        filterGroupInformation: {
          'Mutations': {
            'consequence': [{
              activeFilter: false,
              name: 'consequence1'
            }, {
              activeFilter: false,
              name: 'consequence2'
            }]
          },
          'Patients': {
            'blistering': [{
              activeFilter: false,
              name: 'unknown'
            }, {
              activeFilter: true,
              name: 'yes'
            }]
          }
        }
      }
      it('should dispatch the action SET_FILTERS_FROM_ACTIVE_CHECKBOXES', done => {
        const options = {
          state: state,
          expectedActions: [{
            type: SET_FILTERS_FROM_ACTIVE_CHECKBOXES
          }]
        }
        utils.testAction(actions.__GET_FILTERS_FROM_URL__, options, done)
      })
      it('should change the state of filter group information according to the information given in the url', () => {
        const expectedFilterGroupInformation = {
          'Mutations': {
            'consequence': [{
              activeFilter: false,
              name: 'consequence1'
            }, {
              activeFilter: false,
              name: 'consequence2'
            }]
          },
          'Patients': {
            'blistering': [{
              activeFilter: true,
              name: 'unknown'
            }, {
              activeFilter: false,
              name: 'yes'
            }]
          }
        }
        const options = {
          state: state,
          dispatch: function () {}
        }
        actions.__GET_FILTERS_FROM_URL__(options)
        expect(state.filterGroupInformation).to.deep.equal(expectedFilterGroupInformation)
      })
    })

    describe('RESET_FILTERS', () => {
      const state = {
        route: {
          query: {
            q: 'blistering=in=(unknown)'
          }
        },
        filterGroupInformation: {
          'Mutations': {
            'consequence': [{
              activeFilter: true,
              name: 'consequence1'
            }, {
              activeFilter: false,
              name: 'consequence2'
            }]
          },
          'Patients': {
            'blistering': [{
              activeFilter: true,
              name: 'unknown'
            }, {
              activeFilter: false,
              name: 'yes'
            }]
          }
        }
      }
      it('should change the state of all the active filters to false in filter group information', () => {
        const expectedFilterGroupInformation = {
          'Mutations': {
            'consequence': [{
              activeFilter: false,
              name: 'consequence1'
            }, {
              activeFilter: false,
              name: 'consequence2'
            }]
          },
          'Patients': {
            'blistering': [{
              activeFilter: false,
              name: 'unknown'
            }, {
              activeFilter: false,
              name: 'yes'
            }]
          }
        }
        const options = {
          state: state,
          dispatch: function () {}
        }
        actions.__RESET_FILTERS__(options)
        expect(state.filterGroupInformation).to.deep.equal(expectedFilterGroupInformation)
      })
      it('should dispatch action SET_FILTERS_FROM_ACTIVE_CHECKBOXES', done => {
        const options = {
          state: state,
          expectedActions: [{
            type: SET_FILTERS_FROM_ACTIVE_CHECKBOXES
          }]
        }
        utils.testAction(actions.__RESET_FILTERS__, options, done)
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

    describe('GET_FILTERED_REFERENCES', () => {
      it('should get the filtered publications from the server and commit mutation SET_FILTERED_REFERENCES', done => {
        const state = {
          route: {
            query: {
              q: 'Title=q=gene'
            }
          },
          PUBLICATIONS_API_PATH: '/api/v2/publications',
          COLUMN_PUBMED_ID_REFERENCE_TABLE: 'pubmedIdentifier'
        }
        const response = {
          json: function () {
            return {items: ['filteredPublications']}
          }
        }
        const get = td.function('api.get')
        td.when(get(state.PUBLICATIONS_API_PATH + '?q=' + state.route.query.q)).thenResolve(response)
        td.replace(api, 'get', get)
        const options = {
          state: state,
          expectedMutations: [{
            type: SET_FILTERED_REFERENCES,
            payload: [state.COLUMN_PUBMED_ID_REFERENCE_TABLE, response.json().items]
          }]
        }
        utils.testAction(actions.__GET_FILTERED_REFERENCES__, options, done)
      })
    })
  })
})
