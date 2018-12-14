import mutations from '../../../../src/store/mutations'
import { expect } from 'chai'

describe('store', () => {
  describe('mutations', () => {
    const type = 'Mutations'
    describe('SET_ERROR', () => {
      it('should set the error message in the state with the payload', () => {
        const state = {
          error: null
        }
        const expectedError = {status: '404', statusText: 'Page Not Found', url: 'https://www.pagenotfound.com'}
        mutations.__SET_ERROR__(state, expectedError)
        expect(state.error).to.deep.equal(expectedError)
      })
    })
    describe('SET_METADATA', () => {
      const state = {
        metadata: {}
      }
      const simpleExampleMetadata = [{
        href: 'test/href',
        fieldType: 'MREF',
        name: 'consequence',
        label: 'Consequence',
        visible: true
      }]
      const exampleMetadataWithCompound = [{
        href: 'test/href',
        fieldType: 'COMPOUND',
        name: 'MutationDetails',
        label: 'Mutation Details',
        attributes: [{
          href: 'test/href',
          fieldType: 'CATEGORICAL',
          name: 'event',
          visible: true
        }],
        visible: true
      }]
      it('should add the attribute to the metadata if field is not hidden ("key visible = true" in metadata get from API call)', () => {
        const expectedMetadata = {
          'Mutations': [{
            href: 'test/href',
            fieldType: 'MREF',
            name: 'consequence',
            label: 'Consequence',
            visible: true,
            fieldIsVisible: false,
            isFilter: false
          }]
        }
        mutations.__SET_METADATA__(state, [simpleExampleMetadata, type, [], [], []])
        expect(state.metadata).to.deep.equal(expectedMetadata)
      })
      it('should NOT add the attribute to the metadata if the field is hidden ("key visible = false" in metadata from API call', () => {
        const exampleMetadata = [{
          href: 'test/href',
          fieldType: 'MREF',
          name: 'consequence',
          label: 'Consequence',
          visible: false
        }]
        const expectedMetadata = {
          'Mutations': []
        }
        mutations.__SET_METADATA__(state, [exampleMetadata, type, [], [], []])
        expect(state.metadata).to.deep.equal(expectedMetadata)
      })
      it('should set the key: "fieldIsVisible" with value "true" if column name (in uppercase) is in options', () => {
        const options = ['CONSEQUENCE']
        const expectedMetadata = {
          'Mutations': [{
            href: 'test/href',
            fieldType: 'MREF',
            name: 'consequence',
            label: 'Consequence',
            visible: true,
            fieldIsVisible: true,
            isFilter: false
          }]
        }
        mutations.__SET_METADATA__(state, [simpleExampleMetadata, type, options, [], []])
        expect(state.metadata).to.deep.equal(expectedMetadata)
      })
      it('should set the key: "fieldIsVisible" with value "false" if column name is NOT in options', () => {
        const options = ['']
        const expectedMetadata = {
          'Mutations': [{
            href: 'test/href',
            fieldType: 'MREF',
            name: 'consequence',
            label: 'Consequence',
            visible: true,
            fieldIsVisible: false,
            isFilter: false
          }]
        }
        mutations.__SET_METADATA__(state, [simpleExampleMetadata, type, options, [], []])
        expect(state.metadata).to.deep.equal(expectedMetadata)
      })
      it('should set the key: "isFilter" with value "true" if column name (in uppercase) is in filters', () => {
        const filters = ['CONSEQUENCE']
        const expectedMetadata = {
          'Mutations': [{
            href: 'test/href',
            fieldType: 'MREF',
            name: 'consequence',
            label: 'Consequence',
            visible: true,
            fieldIsVisible: false,
            isFilter: true
          }]
        }
        mutations.__SET_METADATA__(state, [simpleExampleMetadata, type, [], filters, []])
        expect(state.metadata).to.deep.equal(expectedMetadata)
      })
      it('should set the key: "isFilter" with value "false" if column name is NOT in filters', () => {
        const filters = []
        const expectedMetadata = {
          'Mutations': [{
            href: 'test/href',
            fieldType: 'MREF',
            name: 'consequence',
            label: 'Consequence',
            visible: true,
            fieldIsVisible: false,
            isFilter: false
          }]
        }
        mutations.__SET_METADATA__(state, [simpleExampleMetadata, type, [], filters, []])
        expect(state.metadata).to.deep.equal(expectedMetadata)
      })
      it('should set the key: "isFilter" with value "true" if field is deeper nested in field of type compound and if column name is in filters', () => {
        const filters = ['EVENT']
        const expectedMetadata = {
          'Mutations': [{
            href: 'test/href',
            fieldType: 'COMPOUND',
            name: 'MutationDetails',
            label: 'Mutation Details',
            attributes: [{
              href: 'test/href',
              fieldType: 'CATEGORICAL',
              name: 'event',
              visible: true,
              isFilter: true
            }],
            visible: true,
            fieldIsVisible: false,
            isFilter: false
          }]
        }
        mutations.__SET_METADATA__(state, [exampleMetadataWithCompound, type, [], filters, []])
        expect(state.metadata).to.deep.equal(expectedMetadata)
      })
      it('should exclude the fields which are given in "mutationColumnsToExcludeFromMetadata" from the metadata', () => {
        const mutationColumnsToExcludeFromMetadata = ['consequence']
        const expectedMetadata = {
          'Mutations': []
        }
        mutations.__SET_METADATA__(state, [simpleExampleMetadata, type, [], [], mutationColumnsToExcludeFromMetadata])
        expect(state.metadata).to.deep.equal(expectedMetadata)
      })
      describe('SET_LIST_METADATA_COLUMNS_MUTATIONS', () => {
        const state = {
          metadataColumnsMutations: {}
        }
        const exampleMetadata = [
          {
            fieldType: 'DECIMAL',
            name: 'firstExample',
            label: 'FirstExample'
          },
          {
            fieldType: 'STRING',
            name: 'secondExample',
            label: 'SecondExample'
          }
        ]
        it('should add columns, which are given in a list, as objects to the state', () => {
          const visibleColumns = ['FIRSTEXAMPLE']
          const expectedVisibleColumns = {
            'Mutations': [
              {
                fieldType: 'DECIMAL',
                label: 'FirstExample',
                name: 'firstExample'

              }
            ]
          }
          mutations.__SET_LIST_METADATA_COLUMNS_MUTATIONS__(state, [exampleMetadata, type, visibleColumns])
          expect(state.metadataColumnsMutations).to.deep.equal(expectedVisibleColumns)
        })
        it('should not add any columns to the state when the list is empty', () => {
          const visibleColumns = []
          const expectedVisibleColumns = {
            'Mutations': []
          }
          mutations.__SET_LIST_METADATA_COLUMNS_MUTATIONS__(state, [exampleMetadata, type, visibleColumns])
          expect(state.metadataColumnsMutations).to.deep.equal(expectedVisibleColumns)
        })
      })
      describe('SET_TABLE_FOR_FILTER_GROUP_INFORMATION', () => {
        const state = {
          filterGroupInformation: {}
        }
        it('should add the table as key to the state', () => {
          const expectedFilterGroupInformation = {
            'Mutations': {}
          }
          mutations.__SET_TABLE_FOR_FILTER_GROUP_INFORMATION__(state, type)
          expect(state.filterGroupInformation).to.deep.equal(expectedFilterGroupInformation)
        })
      })
      describe('SET_FILTER_GROUP_INFORMATION', () => {
        const state = {
          filterGroupInformation: {'Mutations': {}}
        }
        it('should add the filter group to the state', () => {
          const exampleData = {
            meta: {
              attributes: [{
                name: 'example'
              }]
            },
            items: [{
              _href: 'api/v2/table/exampleItem',
              example: 'Item'
            }, {
              _href: 'api/v2/table/exampleItem2',
              example: 'Item2'
            }]
          }
          const expectedFilterGroupInformation = {
            'Mutations': {
              example: [{
                activeFilter: false,
                name: 'Item'
              }, {
                activeFilter: false,
                name: 'Item2'
              }]
            }
          }
          mutations.__SET_FILTER_GROUP_INFORMATION__(state, [type, 'example', exampleData])
          expect(state.filterGroupInformation).to.deep.equal(expectedFilterGroupInformation)
        })
        it('should add the label as extra information if label is present in information', () => {
          const exampleData = {
            meta: {
              attributes: [{
                name: 'example'
              }]
            },
            items: [{
              _href: '/api/v2/table/exampleItem',
              example: 'Item',
              label: 'LabelForItem'
            }, {
              _href: '/api/v2/table/exampleItem2',
              example: 'Item2',
              label: 'LabelForItem2'
            }]
          }
          const expectedFilterGroupInformation = {
            'Mutations': {
              example: [{
                activeFilter: false,
                label: 'LabelForItem',
                name: 'Item'
              }, {
                activeFilter: false,
                label: 'LabelForItem2',
                name: 'Item2'
              }]
            }
          }
          mutations.__SET_FILTER_GROUP_INFORMATION__(state, [type, 'example', exampleData])
          expect(state.filterGroupInformation).to.deep.equal(expectedFilterGroupInformation)
        })
      })
      describe('SET_FILTER_GROUP_INFORMATION_ENUM', () => {
        const state = {
          filterGroupInformation: {'Mutations': {}}
        }
        it('should add the field with type "ENUM" with their enumOptions as categories to the filter group information', () => {
          const exampleData = {
            href: 'test/href',
            fieldType: 'ENUM',
            name: 'Example',
            enumOptions: ['unknown', 'yes']
          }
          const expectedFilterGroupInformation = {
            'Mutations': {
              Example: [{
                activeFilter: false,
                name: 'unknown'
              }, {
                activeFilter: false,
                name: 'yes'
              }]
            }
          }
          mutations.__SET_FILTER_GROUP_INFORMATION_ENUM__(state, [type, 'Example', exampleData])
          expect(state.filterGroupInformation).to.deep.equal(expectedFilterGroupInformation)
        })
      })
      describe('SET_ALL_REFERENCES', () => {
        const state = {
          allReferences: {},
          COLUMN_PUBMED_ID_REFERENCE_TABLE: 'Pubmed'
        }
        it('should add the references to a list, with as key: pubmed identifier and as value the information about the reference', () => {
          const exampleReference = [{
            Title: 'example publication',
            Authors: 'Author1;Author2',
            Pubmed: '10084302'
          }]
          const expectedReferences = {
            '10084302': {
              Title: 'example publication',
              Authors: 'Author1;Author2',
              Pubmed: '10084302'
            }
          }
          mutations.__SET_ALL_REFERENCES__(state, exampleReference)
          expect(state.allReferences).to.deep.equal(expectedReferences)
        })
      })
      describe('SET_REFERENCE_METADATA', () => {
        const state = {
          referenceMetadata: {}
        }
        it('should store the metadata for the references in referenceMetadata', () => {
          const exampleMetadata = {
            href: 'test/href',
            attributes: [{
              href: 'test/href',
              fieldType: 'TEXT',
              name: 'Title'
            }, {
              href: 'test/href',
              fieldType: 'STRING',
              name: 'Journal'
            }]
          }
          const expectedMetadata = {
            href: 'test/href',
            attributes: [{
              href: 'test/href',
              fieldType: 'TEXT',
              name: 'Title'
            }, {
              href: 'test/href',
              fieldType: 'STRING',
              name: 'Journal'
            }]
          }
          mutations.__SET_REFERENCE_METADATA__(state, exampleMetadata)
          expect(state.referenceMetadata).to.deep.equal(expectedMetadata)
        })
      })
      describe('SET_SEARCH_REFERENCES', () => {
        const state = {
          referencesFiltering: false,
          searchReferences: '',
          columnsToSearchReferences: []
        }
        it('should set "referencesFiltering" to true if search contains characters', () => {
          const search = 'searchString'
          mutations.__SET_SEARCH_REFERENCES__(state, [search, []])
          expect(state.referencesFiltering).to.equal(true)
        })
        it('should set "referencesFiltering" to false if search doesnt contain any characters', () => {
          const search = ''
          mutations.__SET_SEARCH_REFERENCES__(state, [search, []])
          expect(state.referencesFiltering).to.equal(false)
        })
        it('should set "searchReferences" to contain the search string', () => {
          const search = 'searchString'
          mutations.__SET_SEARCH_REFERENCES__(state, [search, []])
          expect(state.searchReferences).to.equal(search)
        })
        it('should add the columns in columnsToSearh to columnsToSearchReferences', () => {
          const columnsToSearch = ['column1', 'column2']
          mutations.__SET_SEARCH_REFERENCES__(state, ['', columnsToSearch])
          expect(state.columnsToSearchReferences).to.equal(columnsToSearch)
        })
      })
    })
  })
})
