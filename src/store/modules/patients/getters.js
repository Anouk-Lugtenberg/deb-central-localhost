import { createRSQLQuery } from '../../helpers'

export default {
  getPatientInformation: state => state.informationPatients,
  getPatients: state => state.patients,
  getPatientsByIdentifier: state => identifier => {
    return state.patients[identifier]
  },
  getAllIdentifiersPatients: state => state.allIdentifiersPatients,
  getTotalPatients: state => state.totalPatients,
  getFilteredPatientsIdentifiers: state => state.filteredPatientsIdentifiers,
  rsqlPatients: createRSQLQuery,
  getStringSearch: state => state.stringSearch,
  getPatientsFilterActive: state => state.patientsFilterActive,
  getActiveFiltersCheckbox: state => state.activeFiltersCheckbox,
  getPatientsIsFiltering: state => state.patientsIsFiltering,
  getPatientsByPublicationIdentifier: (state) => (identifier) => {
    return state.patientsForPublicationIdentifier[identifier]
  }
}
