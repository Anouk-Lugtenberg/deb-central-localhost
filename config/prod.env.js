module.exports = {
  NODE_ENV: '"production"',
  INITIAL_STATE: {
    language: 'en',
    mutationsApiPath: '/api/v2/CHD7_Mutations',
    patientsApiPath: '/api/v2/CHD7_Patients',
    visibleColumnsForMutationsOnThePatientCard: ['EXON', 'PATHOGENICITY', 'MUTATION_TYPE'],
    columnsWhereMutationsAreStoredInPatientTable: ['Mutation_ID'],
    columnThatLinksMutationToPatient: ['Mutation_ID'],
    columnPatientIdentifier: ['Molgenis_ID'],
    columnCDNANotationForMutation: ['CHD7_c'],
    columnMutationIdentifierNumerical: ['Mutation_ID'],
    visibleFieldsMutationTable: ['CHD7_C', 'CHD7_P', 'EXON', 'PATHOGENICITY'],
    visibleFieldsPatientTable: ['PHENOTYPE', 'DECEASED'],
    filtersMutationTable: ['EXON', 'PATHOGENICITY'],
    filtersPatientTable: ['POSITIVE_FAMILY_HISTORY']
  }
  // INITIAL STATE for CHD7
  // window.__INITIAL_STATE__: {
  //   language: 'en',
  //   mutationsApiPath: '/api/v2/CHD7_Mutations',
  //   patientsApiPath: '/api/v2/CHD7_Patients',
  //   visibleColumnsForMutationsOnThePatientCard: ['EXON', 'PATHOGENICITY', 'MUTATION_TYPE'],
  //   columnsWhereMutationsAreStoredInPatientTable: ['Mutation_ID'],
  //   columnThatLinksMutationToPatient: ['Mutation_ID'],
  //   columnPatientIdentifier: ['Molgenis_ID'],
  //   columnCDNANotationForMutation: ['CHD7_c'],
  //   columnMutationIdentifierNumerical: ['Mutation_ID'],
  //   visibleFieldsMutationTable: ['CHD7_C', 'CHD7_P', 'EXON', 'PATHOGENICITY'],
  //   visibleFieldsPatientTable: ['PHENOTYPE', 'DECEASED'],
  //   filtersMutationTable: ['EXON', 'PATHOGENICITY'],
  //   filtersPatientTable: ['POSITIVE_FAMILY_HISTORY']
  // }
  // INITIAL STATE for DEB
  // window.__INITIAL_STATE__ = {
  //   language: 'en',
  //   mutationsApiPath: '/api/v2/col7a1_Mutations',
  //   patientsApiPath: '/api/v2/col7a1_Patients',
  //   visibleFieldsMutationTable: ['AANOTATION', 'EXON', 'CONSEQUENCE', 'POS'],
  //   visibleFieldsPatientTable: ['PHENO', 'PUBMEDID'],
  //   filtersMutationTable: ['CONSEQUENCE', 'EVENT'],
  //   filtersPatientTable: ['LOCATION', 'ANCHORINGFIBRILSNUMBER'],
  //   visibleColumnsForMutationsOnThePatientCard: ['AANOTATION', 'EXON', 'CONSEQUENCE'],
  //   columnsWhereMutationsAreStoredInPatientTable: ['cDNAchange1', 'cDNAchange2'],
  //   columnThatLinksMutationToPatient: ['cdnanotation'],
  //   columnPatientIdentifier: ['PatientID'],
  //   columnCDNANotationForMutation: ['cdnanotation'],
  //   columnMutationIdentifierNumerical: ['ID']
  // }
}
