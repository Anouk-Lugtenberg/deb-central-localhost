import { transformToRSQL } from '@molgenis/rsql'
import { VISIBLE_FIELDS } from '../actions'

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

export const getMetadata = (metadata, type) => {
  let options = VISIBLE_FIELDS[type]
  let listMetadata = []
  metadata.forEach(function (element) {
    let fieldVisible = false
    if (options.indexOf(element.name.toUpperCase()) > -1) {
      fieldVisible = true
    }
    /* Compounds exists of other objects, so the objects should be saved as objects from the compound in the metadata */
    if (element.fieldType.includes('COMPOUND')) {
      let listCompoundAttributes = []
      Object.keys(element.attributes).map(function (compound) {
        listCompoundAttributes.push({
          'name': element.attributes[compound]['name'],
          'label': element.attributes[compound]['label'],
          'fieldType': element.attributes[compound]['fieldType']
        })
      })
      listMetadata.push({
        'name': element.name,
        'label': element.label,
        'fieldType': element.fieldType,
        'visible': fieldVisible,
        'attributes': listCompoundAttributes
      })
      /* Mutations are saved differently for patients (and are always shown),
      so they shouldn't be saved in the metadata */
    } else if (element.name !== 'cDNAchange1' && element.name !== 'cDNAchange2') {
      listMetadata.push({
        'name': element.name,
        'label': element.label,
        'fieldType': element.fieldType,
        'visible': fieldVisible
      })
    }
  })
  return listMetadata
}
