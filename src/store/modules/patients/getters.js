export default {
  getPatientInformation: state => state.informationPatients,
  getPatients: state => state.patients,
  getAllIdentifiersPatients: state => state.allIdentifiersPatients,
  getTotalPatients: state => state.totalPatients,
  getFilteredPatientsIdentifiers: state => state.filteredPatientsIdentifiers
}
