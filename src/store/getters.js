export default {
  getMetadata: state => state.metadata,
  getMetadataAllFieldsVisible: (state) => {
    let metadataAllFieldsVisible = JSON.parse(JSON.stringify(state.metadata))
    Object.keys(metadataAllFieldsVisible).map(function (key) {
      metadataAllFieldsVisible[key].forEach(function (element) {
        element.visible = true
      })
    })
    return metadataAllFieldsVisible
  },
  getFilteredGroupInformation: state => state.filterGroupInformation,
  getMetadataColumnsMutations: state => state.metadataColumnsMutations,
  getError: state => state.error,
  getVisibleFields: (state) => {
    let visibleFields = {}
    visibleFields[state.MUTATION_TABLE] = state.visibleFieldsMutationTable
    visibleFields[state.PATIENT_TABLE] = state.visibleFieldsPatientTable
    return visibleFields
  },
  getVisibleFieldsMetadata: (state) => (table) => {
    let visibleFields = []
    for (let key in state.metadata[table]) {
      if (!state.metadata[table].hasOwnProperty(key)) continue
      console.log('name: ' + typeof state.metadata[table][key]['name'])
      console.log('column: ' + state.COLUMN_MUTATION_CDNANOTATION)
      let cdnanotation = JSON.stringify(state.COLUMN_MUTATION_CDNANOTATION)
      console.log('cdnanoation: ' + cdnanotation)
      /**
       * EEN IS EEN OBJECT, DE ANDER IS EEN STRING
       */
      if (state.metadata[table][key]['fieldIsVisible'] && (state.metadata[table][key]['name'] !== cdnanotation)) {
        visibleFields.push(state.metadata[table][key])
      }
    }
    return visibleFields
  },
  getVisibleFilters: (state) => {
    let visibleFilters = {}
    visibleFilters[state.MUTATION_TABLE] = state.filtersMutations
    visibleFilters[state.PATIENT_TABLE] = state.filtersPatients
    return visibleFilters
  },
  getColumnNamePubMedIdentifier: (state) => {
    let pubmedIdentifier = null
    if (state.COLUMN_PUBMED_ID) {
      pubmedIdentifier = state.COLUMN_PUBMED_ID
    }
    return pubmedIdentifier
  }
}
