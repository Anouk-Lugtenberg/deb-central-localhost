// import { INITIAL_STATE } from './state'

/* API paths */
// export const MUTATIONS_API_PATH = INITIAL_STATE.mutationsApiPath
// export const PATIENTS_API_PATH = INITIAL_STATE.patientsApiPath

/* Column names */
/* Column name for Numerical Identifier from mutation (column which contains 'M100') */
// export const COLUMN_MUTATION_IDENTIFIER_NUMERICAL = INITIAL_STATE.columnMutationIdentifierNumerical

/* Column name where the cDNA notation is stored for mutation */
// export const COLUMN_MUTATION_CDNANOTATION = INITIAL_STATE.columnCDNANotationForMutation

/* Column name where patient ID is stored for patients */
// export const COLUMN_PATIENT_ID = INITIAL_STATE.columnPatientIdentifier

/* Table names */
// export const MUTATION_TABLE = MUTATIONS_API_PATH.split('/').pop()
// export const PATIENT_TABLE = PATIENTS_API_PATH.split('/').pop()

/* The column which links mutations to patients */
// export const LOOK_UP_ATTRIBUTE_MUTATIONS = INITIAL_STATE.columnThatLinksMutationToPatient

/* Column(s) where Mutations are stored per Patient */
// export const MUTATION_COLUMNS_FOR_PATIENT = INITIAL_STATE.columnsWhereMutationsAreStoredInPatientTable

/* The columns from the mutation table which are visible at the patients cards */
// export const VISIBLE_COLUMNS_MUTATION_PATIENTS_CARD = INITIAL_STATE.visibleColumnsForMutationsOnThePatientCard
/*
This constant variable can be adjusted to determine which fields from the tables are visible
on loading the page - should be in UPPERCASE, and same as 'name' field from metadata from tables.
 */
// export const VISIBLE_FIELDS = {
// //   [MUTATION_TABLE]: INITIAL_STATE.visibleFieldsMutationTable,
// //   [PATIENT_TABLE]: INITIAL_STATE.visibleFieldsPatientTable
// }
//
// /*
// TODO: add visible filter option for field type enums
// This constant variable can be adjusted to determine which fields are used as filters - should be in
// UPPERCASE, and same as 'name' field from metadata from tables.
//  */
// export const VISIBLE_FILTERS = {
// //   [MUTATION_TABLE]: INITIAL_STATE.filtersMutationTable,
// //   [PATIENT_TABLE]: INITIAL_STATE.filtersPatientTable
// }

/**
 * VARIABLES FIPA
 */

/* Variables between different databases */

/* API paths */
export const MUTATIONS_API_PATH = '/api/v2/fipa_Mutations'
export const PATIENTS_API_PATH = '/api/v2/fipa_Patients'

/* Column names */
/* Column name for Numerical Identifier from mutation (column which contains 'M100') */
export const COLUMN_MUTATION_IDENTIFIER_NUMERICAL = 'MutationID'

/* Column name where the cDNA notation is stored for mutation */
export const COLUMN_MUTATION_CDNANOTATION = 'Variant_name_DNA_level'

/* Column name where patient ID is stored for patients */
export const COLUMN_PATIENT_ID = 'PatientID'

/* Table names */
export const MUTATION_TABLE = 'fipa_Mutations'
export const PATIENT_TABLE = 'fipa_Patients'

/* The column which links mutations to patients */
export const LOOK_UP_ATTRIBUTE_MUTATIONS = 'MutationID'

/* Column(s) where Mutations are stored per Patient */
export const MUTATION_COLUMNS_FOR_PATIENT = ['MutationID']

/* The columns from the mutation table which are visible at the patients cards - UPPERCASE */
export const VISIBLE_COLUMNS_MUTATION_PATIENTS_CARD = ['VARIANT_NAME_DNA_LEVEL', 'VARIANT_EFFECT', 'VARIANT_CATEGORY']

/*
This constant variable can be adjusted to determine which fields from the tables are visible
on loading the page - should be in UPPERCASE, and same as 'name' field from metadata from tables.
 */
export const VISIBLE_FIELDS = {
  [MUTATION_TABLE]: ['VARIANT_NAME_DNA_LEVEL', 'VARIANT_EFFECT', 'VARIANT_CATEGORY', 'MUTATION_POSTITION'],
  [PATIENT_TABLE]: ['CLINICAL_DIAGNOSIS', 'DETECTION_METHOD']
}

export const VISIBLE_FILTERS = {
  [MUTATION_TABLE]: [],
  [PATIENT_TABLE]: []
}
