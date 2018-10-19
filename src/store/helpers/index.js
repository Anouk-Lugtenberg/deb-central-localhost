import { transformToRSQL } from '@molgenis/rsql'

export const createRSQLQuery = (state) => transformToRSQL({
  operator: 'AND',
  operands: state.search ? ['*']
    .map(attr => ({selector: attr, comparison: '=q=', arguments: state.search})) : []
})

export const naturalSort = (arraylist) => {
  let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'})
  let sortedlist = []
  arraylist.sort(collator.compare).forEach(function (element) {
    sortedlist.push(element)
  })
  return sortedlist
}
