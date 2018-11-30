import { transformToRSQL } from '@molgenis/rsql'
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
 * @returns {*}
 */
export const setFilterGroupInformationFromURL = (information, query) => {
  Object.keys(information).forEach(function (table) {
    let queries = query.split(';')
    queries.forEach(function (singleQuery) {
      let strippedFilters = []
      let attribute = singleQuery.split('=').shift()
      /* Get the active filters from the query, and remove the brackets () */
      let activeFilters = singleQuery.split('=').pop().slice(1, -1)
      /* Only split when comma is NOT followed by a whitespace, otherwise filters which contain comma's
         are also split */
      activeFilters.split(/,(?=\S)/).forEach(function (filter) {
        strippedFilters.push(filter.replace(/[']/g, ''))
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
  return information
}

/**
 * Helper to natural sort lists
 * @param arraylist
 * @returns {Array}
 */
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
 * Sets the metadata for the fields. It uses the metadata from MOLGENIS api, but adds 'isFilter' field and uses the options
 * from this app to determine which fields are visible on load.
 * @param metadata metadata retrieved from MOLGENIS API
 * @param options lists which contains which fields are visible on load
 * @param filters lists which contains which fields should be used as filter
 * @param mutationColumns the columns where the mutations are stored in the patient table, these shouldn't be an option for the user
 * @returns {Array} an array containing the updated metadata
 */
export const getMetadata = (metadata, options, filters, mutationColumns) => {
  let listMetadata = []
  metadata.forEach(function (element) {
    /* Only add if element is not hidden field */
    if (element.visible) {
      element['fieldIsVisible'] = determineVisibleFieldsFromSettings(element.name, options)
      element['isFilter'] = determineIfElementIsFilter(element.name, filters)
      if (element.fieldType === 'COMPOUND') {
        setFiltersForFieldTypeCompound(element.attributes, filters)
      }
      /* Don't include the mutation columns for the patient table */
      if (!mutationColumns.includes(element.name)) {
        listMetadata.push(
          element
        )
      }
    }
  })
  return listMetadata
}

/**
 * Adds filters for field types compound of one level deep
 * @param compoundAttributes the attributes from the compound
 * @param filters list with filters
 */
export const setFiltersForFieldTypeCompound = (compoundAttributes, filters) => {
  compoundAttributes.forEach(function (element) {
    if (filters.includes(element.name.toUpperCase())) {
      element['isFilter'] = true
    }
  })
}

/**
 * Helper to determine which fields from the tables are visible on loading the page. These settings are given by
 * INITAL STATE, by the user. If column-name is in the settings, the field will be set to visible.
 * @param metadataElementName the element from the metadata
 * @param options the fields which should be visible on loading the page
 * @returns {boolean} true/false linked to visibility of field
 */
export const determineVisibleFieldsFromSettings = (metadataElementName, options) => {
  return options.indexOf(metadataElementName.toUpperCase()) > -1
}

/**
 * Helper to determine if the field is a filter.
 * @param metadataElementName the field
 * @param filters a list with filters
 * @returns {*} true/false whether field is in the list with filters
 */
export const determineIfElementIsFilter = (metadataElementName, filters) => {
  return filters.includes(metadataElementName.toUpperCase())
}

/**
 * Helper to determine which columns of the Mutation table are visible on the patient card (e.g. exon, consequence)
 * @param metadata the metadata
 * @param visibleColumns the columns which should be visible on the patient card from the mutation table
 * @returns {Array} an array which contains the visible columns
 */
export const getMetadataColumnsMutations = (metadata, visibleColumns) => {
  let listMetadata = []
  metadata.forEach(function (element) {
    if (visibleColumns.includes(element.name.toUpperCase())) {
      listMetadata.push(
        element
      )
    }
  })
  return listMetadata
}
