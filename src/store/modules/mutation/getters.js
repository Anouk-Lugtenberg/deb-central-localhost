import { createRSQLQuery } from '../../helpers'

export default {
  getMutations: state => state.mutations,
  getTotalMutations: state => state.totalMutations,
  getAllMutationIdentifiers: state => state.allMutationIdentifiers,
  getFilteredMutationIdentifiers: state => state.filteredMutationIdentifiers,
  getMutationDetails: state => state.mutationDetails,
  getPatientsPerMutation: state => state.patientsPerMutation,
  getMutationIDCDNALink: state => state.mutationIDCDNALink,
  getFilteredGroupInformation: state => state.filterGroupInformation,
  rsqlMutation: createRSQLQuery
}
