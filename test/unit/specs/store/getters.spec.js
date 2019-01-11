import { expect } from 'chai'
import getters from '../../../../src/store/getters'

describe('store', () => {
  describe('getters', () => {
    describe('getMetadataAllFieldsVisible', () => {
      it('should return the metadata with all fieldIsVisible fields set to true', () => {
        const state = {
          metadata: {
            'Mutations': [{
              name: 'consequence',
              fieldIsVisible: false
            }, {
              name: 'details',
              fieldIsVisible: false
            }]
          }
        }
        const actual = getters.getMetadataAllFieldsVisible(state)
        const expected = {
          'Mutations': [{
            name: 'consequence',
            fieldIsVisible: true
          }, {
            name: 'details',
            fieldIsVisible: true
          }]
        }
        expect(expected).to.deep.equal(actual)
      })
    })
    describe('getRSQLReferences', () => {
      it('should return an RSQL query based on a search string and columns which to search in', () => {
        const state = {
          searchReferences: 'searchString',
          columnsToSearchReferences: ['column1', 'column2']
        }
        const actual = getters.getRSQLReferences(state)
        const expected = 'column1=q=searchString,column2=q=searchString'
        expect(expected).to.equal(actual)
      })
      it('should return an empty string when there is no search string available', () => {
        const state = {
          searchReferences: '',
          columnsToSearchReferences: ['column1', 'column2']
        }
        const actual = getters.getRSQLReferences(state)
        const expected = ''
        expect(expected).to.equal(actual)
      })
    })
    describe('getVisibleFields', () => {
      const state = {
        MUTATION_TABLE: 'Mutations',
        PATIENT_TABLE: 'Patients',
        visibleFieldsMutationTable: ['exon', 'consequence'],
        visibleFieldsPatientTable: ['phenotype']
      }
      it('should return an object which contains the visible fields for the patient and mutation table', () => {
        const actual = getters.getVisibleFields(state)
        const expected = {
          Mutations: ['exon', 'consequence'],
          Patients: ['phenotype']
        }
        expect(expected).to.deep.equal(actual)
      })
    })
    describe('getVisibleFieldsMetadata', () => {
      it('should return a list with the fields where fieldIsVisible = true', () => {
        const state = {
          metadata: {
            'Mutations': [{
              name: 'consequence',
              fieldIsVisible: true
            }, {
              name: 'details',
              fieldIsVisible: false
            }]
          },
          COLUMN_MUTATION_CDNANOTATION: ['cdnanotation'],
          COLUMN_PATIENT_IDENTIFIER: ['identifier']
        }
        const actual = getters.getVisibleFieldsMetadata(state)('Mutations')
        const expected = [{
          name: 'consequence',
          fieldIsVisible: true
        }]
        expect(expected).to.deep.equal(actual)
      })
      it('should not add the field where cdna notations are saved in mutation table', () => {
        const state = {
          metadata: {
            'Mutations': [{
              name: 'consequence',
              fieldIsVisible: false
            }, {
              name: 'cdnanotation',
              fieldIsVisible: true
            }]
          },
          COLUMN_MUTATION_CDNANOTATION: ['cdnanotation'],
          COLUMN_PATIENT_IDENTIFIER: ['identifier']
        }
        const actual = getters.getVisibleFieldsMetadata(state)('Mutations')
        const expected = []
        expect(expected).to.deep.equal(actual)
      })
      it('should not add the field where patient identifiers are saved in patient table', () => {
        const state = {
          metadata: {
            'Patients': [{
              name: 'identifier',
              fieldIsVisible: true
            }]
          },
          COLUMN_MUTATION_CDNANOTATION: ['cdnanotation'],
          COLUMN_PATIENT_IDENTIFIER: ['identifier']
        }
        const actual = getters.getVisibleFieldsMetadata(state)('Patients')
        const expected = []
        expect(expected).to.deep.equal(actual)
      })
    })
    describe('getVisibleFilters', () => {
      const state = {
        MUTATION_TABLE: 'Mutations',
        PATIENT_TABLE: 'Patients',
        filtersMutations: ['consequence', 'event'],
        filtersPatients: ['phenotype']
      }
      it('should return an object which contains the visible filters for patient and mutation table', () => {
        const actual = getters.getVisibleFilters(state)
        const expected = {
          Mutations: ['consequence', 'event'],
          Patients: ['phenotype']
        }
        expect(expected).to.deep.equal(actual)
      })
    })
    describe('getColumnNamePubMedIdentifierPatientTable', () => {
      it('should return the pubmed identifier if its available in state.COLUMN_PUBMED_ID_PATIENT_TABLE', () => {
        const state = {
          COLUMN_PUBMED_ID_PATIENT_TABLE: 'pubMed'
        }
        const actual = getters.getColumnNamePubMedIdentifierPatientTable(state)
        const expected = 'pubMed'
        expect(expected).to.equal(actual)
      })
      it('should return null when there is no pubmed identifier available in the state', () => {
        const state = {
          COLUMN_PUBMED_ID_PATIENT_TABLE: ''
        }
        const actual = getters.getColumnNamePubMedIdentifierPatientTable(state)
        const expected = null
        expect(expected).to.equal(actual)
      })
    })
  })
})
