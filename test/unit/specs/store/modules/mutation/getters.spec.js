import { expect } from 'chai'
import getters from '../../../../../../src/store/modules/mutation/getters'

describe('store', () => {
  describe('modules', () => {
    describe('mutation', () => {
      describe('getters', () => {
        describe('rsqlMutation', () => {
          it('should return a RSQL query based on state', () => {
            const state = {
              search: 'exon',
              activeFiltersCheckbox: [[{selector: 'consequence', comparison: '=in=', arguments: ['consequence2']}]]
            }
            const actualRSQL = getters.rsqlMutation(state)
            const expectedRSQL = 'consequence=in=(consequence2);*=q=exon'

            expect(expectedRSQL).to.equal(actualRSQL)
          })
        })
      })
    })
  })
})
