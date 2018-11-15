export default {
  getMetadata: state => state.metadata,
  getMetadataAllFieldsVisible: state => state.metadataAllFieldsVisible,
  getFilteredGroupInformation: state => state.filterGroupInformation,
  getMetadataColumnsMutations: state => state.metadataColumnsMutations,
  getError: state => state.error,
  getVisibleFields: (state) => {
    let visibleFields = {}
    visibleFields[state.MUTATION_TABLE] = state.visibleFieldsMutationTable
    visibleFields[state.PATIENT_TABLE] = state.visibleFieldsPatientTable
    return visibleFields
  },
  getVisibleFilters: (state) => {
    let visibleFilters = {}
    visibleFilters[state.MUTATION_TABLE] = state.filtersMutations
    visibleFilters[state.PATIENT_TABLE] = state.filtersPatients
    return visibleFilters
  }
}
