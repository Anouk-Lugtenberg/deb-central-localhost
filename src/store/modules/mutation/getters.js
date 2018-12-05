import { createRSQLQuery } from '../../helpers'

export default {
  getMutations: state => state.mutations,
  getTotalMutations: state => state.totalMutations,
  getAllMutationIdentifiers: state => state.allMutationIdentifiers,
  getFilteredMutationIdentifiers: state => state.filteredMutationIdentifiers,
  getMutationDetails: state => state.mutationDetails,
  getPatientsPerMutation: state => state.patientsPerMutation,
  getMutationIDCDNALink: state => state.mutationIDCDNALink,
  getMutationsFiltersActive: state => state.mutationsFiltersActive,
  getStringSearch: state => state.stringSearch,
  getActiveFiltersCheckbox: state => state.activeFiltersCheckbox,
  getMutationsIsFiltering: state => state.mutationsIsFiltering,
  rsqlMutation: createRSQLQuery,
  getMutationsBetweenPositionStartAndEnd: state => state.mutationsBetweenPositionStartAndEnd
}
