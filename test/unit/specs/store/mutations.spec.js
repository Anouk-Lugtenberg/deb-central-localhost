window.bla = "Bla bla"
import mutations from '../../../../src/store/mutations'
import { expect } from 'chai'

describe('store', () => {
  describe('mutations', () => {
    describe('SET_ERROR', () => {
      it('should set the error message in the state with the payload', () => {
        const state = {
          error: null
        }
        const expectedError = {status: '404', statusText: 'Page Not Found', url: 'https://www.pagenotfound.com'}
        mutations.__SET_ERROR__(state, expectedError)
        expect(state.error).to.deep.equal(expectedError)
      })
    // })
    // describe('SET_METADATA', () => {
    //   const state = {
    //     metadata: {}
    //   }
    //   const type = 'Patients'
    //   const exampleMetadata = [{
    //     href: "/api/v2/col7a1_Patients/meta/PatientID",
    //     fieldType: "STRING",
    //     name: "PatientID",
    //     label: "Patient ID",
    //     attributes: [ ],
    //     maxLength: 255,
    //     auto: false,
    //     nillable: false,
    //     readOnly: true,
    //     labelAttribute: true,
    //     unique: true,
    //     visible: true,
    //     lookupAttribute: true,
    //     isAggregatable: false
    //   }]
    //   it('should set the metadata with visibility FALSE in the state with the payload', () => {
    //     const options = []
    //     const filters = []
    //     const expectedMetadata = {'Patients': [{
    //         name: "PatientID",
    //         label: "Patient ID",
    //         fieldType: "STRING",
    //         visible: false
    //       }]
    //     }
    //     mutations.__SET_METADATA__(state, [exampleMetadata, type, options, filters])
    //     expect(state.metadata).to.deep.equal(expectedMetadata)
    //   })
    //   it('should set the metadata with visibility TRUE when column-name in constant options in the state with the payload', () => {
    //     const options = ['PATIENTID']
    //     const filters = []
    //     const expectedMetadata = {
    //       'Patients': [
    //         {
    //           name: 'PatientID',
    //           label: 'Patient ID',
    //           fieldType: 'STRING',
    //           visible: true
    //         }
    //       ]
    //     }
    //     mutations.__SET_METADATA__(state, [exampleMetadata, type, options, filters])
    //     expect(state.metadata).to.deep.equal(expectedMetadata)
    //   })
      // it('should set the metadata with a href link when the column-name in constant filters in the state', () => {
      //   const options = []
      //   const filters = ['']
      // })
    })
  })
})
