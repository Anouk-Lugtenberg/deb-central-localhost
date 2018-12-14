export const INITIAL_STATE = window.__INITIAL_STATE__ || {}

export default {
  metadata: {},
  metadataAllFieldsVisible: {},
  filterGroupInformation: {},
  metadataColumnsMutations: {},
  allReferences: {},
  filteredReferences: [],
  referenceMetadata: {},
  error: null,
  searchReferences: '',
  columnsToSearchReferences: [],
  referencesFiltering: false,

  // These values are retrieved from window.__INITIAL_STATE__ because MOLGENIS works with this in their App set-up.
  // Because of the use of these values multiple mutation-patient databases which all have these values in their database
  // can use this app. The settings can be set in the config.json which is loaded to MOLGENIS together with the app.
  /* API paths e.g. /api/v2/col7a1_Mutations */
  PUBLICATIONS_API_PATH: INITIAL_STATE.publicationsApiPath,
  MUTATIONS_API_PATH: INITIAL_STATE.mutationsApiPath,
  PATIENTS_API_PATH: INITIAL_STATE.patientsApiPath,

  /* Table names e.g. col7a1_Mutations */
  MUTATION_TABLE: INITIAL_STATE.mutationsApiPath.split('/').pop(),
  PATIENT_TABLE: INITIAL_STATE.patientsApiPath.split('/').pop(),

  /* Column names */
  /* The column name where the PubMed is found for the Patient table, should be left empty ('') when there's no PubMed available in the data set */
  COLUMN_PUBMED_ID_PATIENT_TABLE: INITIAL_STATE.columnPubMedIdentifierPatientTable,
  /* PubMed identifier in Reference table */
  COLUMN_PUBMED_ID_REFERENCE_TABLE: INITIAL_STATE.columnPubMedIdentifierReferenceTable,

  /* Column name for Numerical Identifier from mutation (column which contains 'M100') */
  COLUMN_MUTATION_IDENTIFIER_NUMERICAL: INITIAL_STATE.columnMutationIdentifierNumerical,

  /* Column name where the cDNA notation is stored for mutation */
  COLUMN_MUTATION_CDNANOTATION: INITIAL_STATE.columnCDNANotationForMutation,

  /* Column name where patient ID is stored for patients */
  COLUMN_PATIENT_IDENTIFIER: INITIAL_STATE.columnPatientIdentifier,

  /* Column name where position is stored for mutation */
  COLUMN_MUTATION_POSITION: INITIAL_STATE.columnMutationPosition,

  /* Column(s) where Mutations are stored per Patient */
  MUTATION_COLUMNS_FOR_PATIENT: INITIAL_STATE.columnsWhereMutationsAreStoredInPatientTable,

  /* The columns from the mutation table which are visible at the patients cards */
  VISIBLE_COLUMNS_MUTATION_PATIENTS_CARD: INITIAL_STATE.visibleColumnsForMutationsOnThePatientCard.map(function (element) {
    return element.toUpperCase()
  }),

  /*
  This constant variable can be adjusted to determine which fields from the tables are visible
  on loading the page - should be in UPPERCASE, and same as 'name' field from metadata from tables.
 */
  visibleFieldsMutationTable: INITIAL_STATE.visibleFieldsMutationTable.map(function (element) {
    return element.toUpperCase()
  }),
  visibleFieldsPatientTable: INITIAL_STATE.visibleFieldsPatientTable.map(function (element) {
    return element.toUpperCase()
  }),

  /*
  This constant variable can be adjusted to determine which fields are used as filters - should be in
  UPPERCASE, and same as 'name' field from metadata from tables.
 */
  filtersMutations: INITIAL_STATE.filtersMutationTable.map(function (element) {
    return element.toUpperCase()
  }),
  filtersPatients: INITIAL_STATE.filtersPatientTable.map(function (element) {
    return element.toUpperCase()
  })
}
