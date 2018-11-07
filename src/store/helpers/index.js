import { transformToRSQL } from '@molgenis/rsql'
import { VISIBLE_FIELDS, VISIBLE_FILTERS, VISIBLE_COLUMNS_MUTATION_PATIENTS_CARD, MUTATION_COLUMNS_FOR_PATIENT } from '../config'
import flattenDeep from 'lodash/flattenDeep'

export const createRSQLQuery = (state) => transformToRSQL({
  operator: 'AND',
  operands: flattenDeep([
    state.activeFiltersCheckbox,
    state.search ? [{
      operator: 'OR',
      operands: ['*'].map(attr => ({selector: attr, comparison: '=q=', arguments: state.search}))
    }] : []
  ])
})

export const createActiveFilterQueries = (attribute, filters) => {
  let activeFilters = []
  Object.keys(filters).map(function (filter) {
    if (filters[filter].activeFilter === true) {
      activeFilters.push(filters[filter].name)
    }
  })
  return createInQuery(attribute, activeFilters)
}
/**
 * Create an RSQL 'in' query for filters
 * @example in query for event filter
 * event=in=(complex, deletion)
 */
export const createInQuery = (attribute, filters) => filters.length > 0
  ? [{selector: attribute, comparison: '=in=', arguments: filters}]
  : []

/**
 * Helper to set the filter checkboxes to true when filter is given in the URL
 * @param information contains the different filters and their options
 * @param query the query from the URL
 * @param table which table the query is for (mutation/patients)
 * @returns {*}
 */
export const setFilterGroupInformationFromURL = (information, query) => {
  Object.keys(information).forEach(function (table) {
    let queries = query.split(';')
    queries.forEach(function (singleQuery) {
      let strippedFilters = []
      let attribute = singleQuery.split('=').shift()
      let activeFilters = singleQuery.split('=').pop()
      /* Filters which contain ',' are treated differently, cause otherwise they would be split */
      let filtersBetweenQuotes = activeFilters.match(/'[a-z, ]*'/g)
      if (filtersBetweenQuotes) {
        filtersBetweenQuotes.forEach(function (filter) {
          strippedFilters.push(filter.replace(/'/g, ''))
        })
      }
      activeFilters.split(',').forEach(function (filter) {
        strippedFilters.push(filter.replace(/['()]/g, ''))
      })
      Object.keys(information[table]).forEach(function (filterGroup) {
        if (filterGroup.includes(attribute)) {
          information[table][filterGroup].forEach(function (elementFilterGroup) {
            elementFilterGroup.activeFilter = strippedFilters.includes(elementFilterGroup.name)
          })
        }
      })
    })
  })
  console.log('Returning information')
  return information
}

export const naturalSort = (arraylist) => {
  let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'})
  let sortedlist = []
  arraylist.sort(collator.compare).forEach(function (element) {
    sortedlist.push(element)
  })
  return sortedlist
}

/**
* Helpers for creating the RSQL query to find the patients per mutation
 */
export const createRSQLQueryPatientsPerMutation = (query) => transformToRSQL({
  operator: 'OR',
  operands: flattenDeep([
    query
  ])
})
export const createInQueryPatientsPerMutation = (mutationColumn, mutationIdentifier) => mutationIdentifier.length > 0
  ? [{selector: mutationColumn, comparison: '=in=', arguments: mutationIdentifier}]
  : []

/**
 * Helper for setting the metadata fields, there's a distinction between the different tables in the metadata.
 All metadata fields contain:
 - fieldType: what kind of field e.g. CATEGORICAL, HREF
 - label: the label of the field
 - name: the name of the field
 - visible: whether the field is visible to the user true/false
 Some metadata fields contain:
 - href: this is set when field is an entity with references, so this field can be used as filter
 * @param metadata a json containing the metadata
 * @param type the type (table name)
 * @param allFieldsVisible whether all fields are set to true, or only some
 * @returns {Array} containing the metadata with the four fields described above
 */
export const getMetadata = (metadata, type, allFieldsVisible) => {
  let options = VISIBLE_FIELDS[type]
  let filters = VISIBLE_FILTERS[type]
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
        Adds href to metadata object when nested metadata of type COMPOUND is in VISIBLE_FILTERS list.
        This is used to determine the filters.
         */
        if (filters.includes(element.attributes[compound]['name'].toUpperCase())) {
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
      Adds href field to metadata if field is in VISIBLE_FILTERS list
      This is used to determine filter categories
       */
    } else if (filters.includes(element.name.toUpperCase())) {
      listMetadata.push({
        'name': element.name,
        'label': element.label,
        'fieldType': element.fieldType,
        'visible': fieldVisible,
        'href': element['refEntity']['href']
      })
      /* Mutations are saved differently for patients (and are always shown),
      so they shouldn't be saved in the metadata */
    } else if (!(MUTATION_COLUMNS_FOR_PATIENT.includes(element.name))) {
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

export const getMetadataColumnsMutations = (metadata) => {
  let listMetadata = []
  metadata.forEach(function (element) {
    if (VISIBLE_COLUMNS_MUTATION_PATIENTS_CARD.includes(element.name.toUpperCase())) {
      listMetadata.push({
        'name': element.name,
        'label': element.label,
        'fieldType': element.fieldType
      })
    }
  })
  return listMetadata
}

