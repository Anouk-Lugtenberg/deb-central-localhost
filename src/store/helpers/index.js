import { transformToRSQL } from '@molgenis/rsql'
// import { flatten } from 'lodash'
import { VISIBLE_FIELDS } from '../actions'

// Example search query
// ?q=ntchange=in=(%27a%27,%20%27at%27);event=in=(%27insertion%27);*=q=159

export const createRSQLQuery = (state) => transformToRSQL({
  operator: 'AND',
  operands:
    state.search ? ['*']
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

/**
 * Helper for setting the metadata fields, there's a distinction between the different tables in the metadata.
 All metadata fields contain:
 - fieldType: what kind of field e.g. CATEGORICAL, HREF
 - label: the label of the field
 - name: the name of the field
 - visible: whether the field is visible to the user true/false
 * @param metadata a json containing the metadata
 * @param type the type (table name)
 * @param allFieldsVisible whether all fields are set to true, or only some
 * @returns {Array} containing the metadata with the four fields described above
 */
export const getMetadata = (metadata, type, allFieldsVisible) => {
  let options = VISIBLE_FIELDS[type]
  let listMetadata = []
  metadata.forEach(function (element) {
    let fieldVisible = true
    if (!allFieldsVisible && !(options.indexOf(element.name.toUpperCase()) > -1)) {
      fieldVisible = false
    }
    /* Compounds exists of other objects, so the objects should be saved as objects from the compound in the metadata */
    if (element.fieldType.includes('COMPOUND')) {
      let listCompoundAttributes = []
      Object.keys(element.attributes).map(function (compound) {
        /*
        Adds href to metadata object when nested metadata of type COMPOUND is of field CATEGORICAL.
        This is used to determine the filters for the CATEGORICAL fields.
         */
        if (element.attributes[compound]['fieldType'].includes('CATEGORICAL')) {
          listCompoundAttributes.push({
            'name': element.attributes[compound]['name'],
            'label': element.attributes[compound]['label'],
            'fieldType': element.attributes[compound]['fieldType'],
            'href': element.attributes[compound]['refEntity']['href']
          })
        } else {
          listCompoundAttributes.push({
            'name': element.attributes[compound]['name'],
            'label': element.attributes[compound]['label'],
            'fieldType': element.attributes[compound]['fieldType']
          })
        }
      })
      listMetadata.push({
        'name': element.name,
        'label': element.label,
        'fieldType': element.fieldType,
        'visible': fieldVisible,
        'attributes': listCompoundAttributes
      })
      /*
      Adds href field to metadata if field is of type CATEGORICAL
      This is used to determine filter categories
       */
    } else if (element.fieldType.includes('CATEGORICAL')) {
      listMetadata.push({
        'name': element.name,
        'label': element.label,
        'fieldType': element.fieldType,
        'visible': fieldVisible,
        'href': element['refEntity']['href']
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
