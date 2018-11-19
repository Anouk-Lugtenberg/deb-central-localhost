import mutations from '../../../../src/store/mutations'
import { expect } from 'chai'

describe('store', () => {
  describe('mutations', () => {
    console.log('MUTATIONS')
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
      const exampleMetadata = [{
        href: '/api/v2/col7a1_Mutations/meta/consequence',
        fieldType: 'MREF',
        name: 'consequence',
        label: 'Consequence',
        attributes: [],
        refEntity: {
          href: '/api/v2/col7a1_consequence2',
          hrefCollection: '/api/v2/col7a1_consequence2',
          name: 'col7a1_consequence2',
          label: 'consequence',
          attributes: [
            {
              href: '/api/v2/col7a1_consequence2/meta/consequence',
              fieldType: 'STRING',
              name: 'consequence',
              label: 'Consequence',
              attributes: []
            },
            {
              href: '/api/v2/col7a1_consequence2/meta/label',
              fieldType: 'STRING',
              name: 'label',
              label: 'Label',
              attributes: []
            }
          ]
        }
      }]
      it('should set the column with name "Consequence" with visibility FALSE in the state -> metadata', () => {
        const expectedMetadata = {
          'Mutations': [{
            name: 'consequence',
            label: 'Consequence',
            fieldType: 'MREF',
            visible: false
          }]
        }
        mutations.__SET_METADATA__(state, [exampleMetadata, type, [], [], []])
        expect(state.metadata).to.deep.equal(expectedMetadata)
      })
      it('should set the column with name "Consequence" with visibility TRUE in the state -> metadata', () => {
        const expectedMetadata = {
          'Mutations': [
            {
              name: 'consequence',
              label: 'Consequence',
              fieldType: 'MREF',
              visible: true
            }
          ]
        }
        mutations.__SET_METADATA__(state, [exampleMetadata, type, ['CONSEQUENCE'], [], []])
        expect(state.metadata).to.deep.equal(expectedMetadata)
      })
      it('should set the column "Consequence" with a href link when the columns name is set in the constant filters', () => {
        const expectedMetadata = {
          'Mutations': [
            {
              name: 'consequence',
              label: 'Consequence',
              fieldType: 'MREF',
              visible: false,
              href: '/api/v2/col7a1_consequence2'
            }
          ]
        }
        mutations.__SET_METADATA__(state, [exampleMetadata, type, [], ['CONSEQUENCE'], []])
        expect(state.metadata).to.deep.equal(expectedMetadata)
      })
      it('should set deeper nested information for fields with type "COMPOUND"', () => {
        const exampleMetadata = [{
          fieldType: 'COMPOUND',
          name: 'example',
          label: 'Example',
          attributes: [
            {
              fieldType: 'STRING',
              name: 'firstCompound',
              label: 'FirstCompound'
            },
            {
              fieldType: 'STRING',
              name: 'secondCompoundObject',
              label: 'SecondCompoundObject'
            }
          ]
        }]
        const expectedMetadata = {
          'Mutations': [
            {
              fieldType: 'COMPOUND',
              label: 'Example',
              name: 'example',
              visible: false,
              attributes: [
                {
                  fieldType: 'STRING',
                  label: 'FirstCompound',
                  name: 'firstCompound'
                },
                {
                  fieldType: 'STRING',
                  label: 'SecondCompoundObject',
                  name: 'secondCompoundObject'
                }
              ]
            }
          ]
        }
        mutations.__SET_METADATA__(state, [exampleMetadata, type, [], [], []])
        expect(state.metadata).to.deep.equal(expectedMetadata)
      })
    })
    describe('SET_METADATA_ALL_FIELDS_VISIBLE', () => {
      const state = {
        metadataAllFieldsVisible: {}
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
      it('should set all the columns to visible', () => {
        const expectedMetadata = {
          'Mutations': [
            {
              fieldType: 'DECIMAL',
              label: 'FirstExample',
              name: 'firstExample',
              visible: true
            },
            {
              fieldType: 'STRING',
              label: 'SecondExample',
              name: 'secondExample',
              visible: true
            }]
        }
        mutations.__SET_METADATA_ALL_FIELDS_VISIBLE__(state, [exampleMetadata, type, [], [], []])
        expect(state.metadataAllFieldsVisible).to.deep.equal(expectedMetadata)
      })
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
  })
})
