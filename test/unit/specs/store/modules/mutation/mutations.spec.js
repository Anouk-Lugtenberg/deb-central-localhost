import mutations from '../../../../../../src/store/modules/mutation/mutations'
import { expect } from 'chai'

describe('store', () => {
  describe('modules', () => {
    describe('mutation', () => {
      describe('mutations', () => {
        describe('SET_ALL_MUTATIONS', () => {
          it('should add all the information from the mutations as an object with as key the cdna notation', () => {
            const state = {
              mutations: {}
            }
            const exampleMutations = [{
              ID: 'M1',
              cdnanotation: 'c.g>c',
              POS: 80
            }, {
              ID: 'M2',
              cdnanotation: 'c.g>t',
              POS: 4
            }]
            const expectedStateMutations = {
              'c.g>c': {
                ID: 'M1',
                cdnanotation: 'c.g>c',
                POS: 80
              },
              'c.g>t': {
                ID: 'M2',
                cdnanotation: 'c.g>t',
                POS: 4
              }
            }
            mutations.__SET_ALL_MUTATIONS__(state, [exampleMutations, 'cdnanotation'])
            expect(state.mutations).to.deep.equal(expectedStateMutations)
          })
        })

        describe('SET_MUTATION_IDENTIFIERS', () => {
          it('should add all the cdnanotation from the mutations as identifiers to a list', () => {
            const state = {
              allMutationIdentifiers: []
            }
            const exampleMutations = [{
              ID: 'M1',
              cdnanotation: 'c.g>c'
            }, {
              ID: 'M2',
              cdnanotation: 'c.g>t'
            }]
            const expectedStateMutationIdentifiers = ['c.g>c', 'c.g>t']

            mutations.__SET_MUTATION_IDENTIFIERS__(state, [exampleMutations, 'cdnanotation'])
            expect(state.allMutationIdentifiers).to.deep.equal(expectedStateMutationIdentifiers)
          })
          it('should sort the cdnanotation by natural sort before adding to the list', () => {
            const state = {
              allMutationIdentifiers: []
            }
            const exampleMutations = [{
              ID: 'M1',
              cdnanotation: 'B1'
            }, {
              ID: 'M2',
              cdnanotation: 'A'
            }, {
              ID: 'M3',
              cdnanotation: 'B0'
            }]
            const expectedStateMutationIdentifiers = ['A', 'B0', 'B1']

            mutations.__SET_MUTATION_IDENTIFIERS__(state, [exampleMutations, 'cdnanotation'])
            expect(state.allMutationIdentifiers).to.deep.equal(expectedStateMutationIdentifiers)
          })
        })
        describe('SET_BOOLEAN_COMPACT_VIEW_MUTATIONS', () => {
          it('should set the boolean for the compact view', () => {
            const state = {
              isCompactViewMutations: false
            }
            const expectedIsCompactViewMutations = true

            mutations.__SET_BOOLEAN_COMPACT_VIEW_MUTATIONS__(state, true)
            expect(state.isCompactViewMutations).to.equal(expectedIsCompactViewMutations)
          })
        })

        describe('SET_PATIENT_FOR_MUTATION', () => {
          it('should add the patientsID found for a mutation as a list to an object, with as key the identifer of the mutation', () => {
            const state = {
              patientsPerMutation: {}
            }
            const exampleFoundPatients = [{
              PatientID: 'P1',
              Phenotype: 'sick'
            }, {
              PatientID: 'P2',
              Phenotype: 'healthy'
            }]
            const id = 'Mutation1'
            const columnPatientIdentifier = 'PatientID'

            const expectedPatientsPerMutation = {
              'Mutation1': ['P1', 'P2']
            }

            mutations.__SET_PATIENT_FOR_MUTATION__(state, [id, exampleFoundPatients, columnPatientIdentifier])
            expect(state.patientsPerMutation).to.deep.equal(expectedPatientsPerMutation)
          })
          it('should natural sort the patient identifiers before adding them to the state', () => {
            const state = {
              patientsPerMutation: {}
            }
            const exampleFoundPatients = [{
              PatientID: 'P300',
              Phenotype: 'sick'
            }, {
              PatientID: 'P1',
              Phenotype: 'sick'
            }, {
              PatientID: 'P50',
              Phenotype: 'healthy'
            }]
            const id = 'Mutation1'
            const columnPatientIdentifier = 'PatientID'

            const expectedPatientsPerMutation = {
              'Mutation1': ['P1', 'P50', 'P300']
            }

            mutations.__SET_PATIENT_FOR_MUTATION__(state, [id, exampleFoundPatients, columnPatientIdentifier])
            expect(state.patientsPerMutation).to.deep.equal(expectedPatientsPerMutation)
          })
        })

        describe('SET_SEARCH_MUTATION', () => {
          it('should set the search in the state', () => {
            const state = {
              search: ''
            }
            const expectedSearch = 'searchString'
            mutations.__SET_SEARCH_MUTATION__(state, 'searchString')
            expect(state.search).to.equal(expectedSearch)
          })
        })

        describe('SET_FILTERED_MUTATIONS', () => {
          const state = {
            filteredMutationIdentifiers: [],
            mutationsIsFiltering: true
          }
          it('should add the filtered mutations identifiers to a list and set this in the state', () => {
            const exampleFilteredMutations = [{
              ID: 'M1',
              cdnanotation: 'c.g>c'
            }, {
              ID: 'M2',
              cdnanotation: 'c.g>t'
            }]
            const expectedStateFilteredMutationIdentifiers = ['c.g>c', 'c.g>t']

            mutations.__SET_FILTERED_MUTATIONS__(state, [exampleFilteredMutations, 'cdnanotation'])
            expect(state.filteredMutationIdentifiers).to.deep.equal(expectedStateFilteredMutationIdentifiers)
          })
          it('should natural sort the identifiers before adding them to the state', () => {
            const exampleFilteredMutations = [{
              cdnanotation: 'c.58_70del'
            }, {
              cdnanotation: 'c.3g>a'
            }, {
              cdnanotation: 'c.62dup'
            }]
            const expectedStateFilteredMutationIdentifiers = ['c.3g>a', 'c.58_70del', 'c.62dup']

            mutations.__SET_FILTERED_MUTATIONS__(state, [exampleFilteredMutations, 'cdnanotation'])
            expect(state.filteredMutationIdentifiers).to.deep.equal(expectedStateFilteredMutationIdentifiers)
          })
          it('should set the state of mutationsIsFiltering to false once done', () => {
            const exampleFilteredMutations = [{}]
            const expectedMutationsIsFiltering = false
            mutations.__SET_FILTERED_MUTATIONS__(state, [exampleFilteredMutations, 'cdnanotation'])
            expect(state.mutationsIsFiltering).to.equal(expectedMutationsIsFiltering)
          })
        })

        describe('SET_ACTIVE_FILTERS_MUTATIONS', () => {
          it('should add the active filters to the state', () => {
            const state = {
              activeFiltersCheckbox: []
            }
            const exampleActiveFilters = [[{selector: 'consequence', comparison: '=in=', arguments: ['consequence2']}]]
            const expectedActiveFilteres = [[{selector: 'consequence', comparison: '=in=', arguments: ['consequence2']}]]
            mutations.__SET_ACTIVE_FILTERS_MUTATIONS__(state, exampleActiveFilters)
            expect(state.activeFiltersCheckbox).to.deep.equal(expectedActiveFilteres)
          })
        })

        describe('SET_MUTATIONS_IS_FILTERING', () => {
          it('should set the state according to given boolean', () => {
            const state = {
              mutationsIsFiltering: false
            }
            mutations.__SET_MUTATIONS_IS_FILTERING__(state, true)
            expect(state.mutationsIsFiltering).to.equal(true)
          })
        })

        describe('SET_VISIBILITY_GENOME_BROWSER', () => {
          it('should set the visibility of the Genome Browser according to given boolean', () => {
            const state = {
              genomeBrowserVisible: true
            }
            mutations.__SET_VISIBILITY_GENOME_BROWSER__(state, false)
            expect(state.genomeBrowserVisible).to.equal(false)
          })
        })

        describe('SET_MUTATIONS_BETWEEN_POSITION_START_AND_END', () => {
          it('should add the mutation identifiers which are found in the genome browser to the state', () => {
            const state = {
              mutationsBetweenPositionStartAndEnd: []
            }
            const exampleMutations = ['c.3g>a', 'c.g>t']
            const expectedMutations = ['c.3g>a', 'c.g>t']

            mutations.__SET_MUTATIONS_BETWEEN_POSITION_START_AND_END__(state, exampleMutations)
            expect(state.mutationsBetweenPositionStartAndEnd).to.deep.equal(expectedMutations)
          })
        })

        describe('SET_GENOME_POSITION', () => {
          it('should set the gnome position from the mutation in the state', () => {
            const state = {
              genomePositionMutation: ''
            }
            mutations.__SET_GENOME_POSITION__(state, 100)
            expect(state.genomePositionMutation).to.equal(100)
          })
        })
      })
    })
  })
})
