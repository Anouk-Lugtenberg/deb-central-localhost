import { createRSQLQuery } from '../../helpers'

export default {
  getPatientsByIdentifier: state => identifier => {
    return state.patients[identifier]
  },
  rsqlPatients: createRSQLQuery,
  getPatientsByPublicationIdentifier: (state) => (identifier) => {
    return state.patientsForPublicationIdentifier[identifier]
  }
}
