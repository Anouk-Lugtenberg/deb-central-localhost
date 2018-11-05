/**
 * VARIABLES CHD7 DATABASE
 */
// /* API paths */
// export const MUTATIONS_API_PATH = '/api/v2/CHD7_Mutations'
// export const PATIENTS_API_PATH = '/api/v2/CHD7_Patients'
//
// /* Column names */
// /* Column name for Numerical Identifier from mutation (column which contains 'M100') */
// export const COLUMN_MUTATION_IDENTIFIER_NUMERICAL = 'Mutation_ID'
//
// /* Column name where the cDNA notation is stored for mutation */
// export const COLUMN_MUTATION_CDNANOTATION = 'CHD7_c'
//
// /* Column name where patient ID is stored for patients */
// export const COLUMN_PATIENT_ID = 'Molgenis_ID'
//
// /* Table names */
// export const MUTATION_TABLE = 'CHD7_Mutations'
// export const PATIENT_TABLE = 'CHD7_Patients'
//
// /* The column which links mutations to patients */
// export const LOOK_UP_ATTRIBUTE_MUTATIONS = 'Mutation_ID'
//
// /* Column(s) where Mutations are stored per Patient */
// export const MUTATION_COLUMNS_FOR_PATIENT = ['Mutation_ID']
//
// export const VISIBLE_COLUMNS_MUTATION_PATIENTS_CARD = ['EXON', 'PATHOGENICITY', 'MUTATION_TYPE']
//
// export const VISIBLE_FIELDS = {
//   [MUTATION_TABLE]: ['CHD7_C', 'CHD7_P', 'EXON', 'PATHOGENICITY'],
//   [PATIENT_TABLE]: ['PHENOTYPE', 'DECEASED']
// }
//
// export const VISIBLE_FILTERS = {
//   [MUTATION_TABLE]: [],
//   [PATIENT_TABLE]: []
// }
/**
 * VARIABLES DEB-CENTRAL
 */
/* Variables between different databases */

/* API paths */
export const MUTATIONS_API_PATH = '/api/v2/col7a1_Mutations'
export const PATIENTS_API_PATH = '/api/v2/col7a1_Patients'

/* Column names */
/* Column name for Numerical Identifier from mutation (column which contains 'M100') */
export const COLUMN_MUTATION_IDENTIFIER_NUMERICAL = 'ID'

/* Column name where the cDNA notation is stored for mutation */
export const COLUMN_MUTATION_CDNANOTATION = 'cdnanotation'

/* Column name where patient ID is stored for patients */
export const COLUMN_PATIENT_ID = 'PatientID'

/* Table names */
export const MUTATION_TABLE = 'col7a1_Mutations'
export const PATIENT_TABLE = 'col7a1_Patients'

/* The column which links mutations to patients */
export const LOOK_UP_ATTRIBUTE_MUTATIONS = 'cdnanotation'

/* Column(s) where Mutations are stored per Patient */
export const MUTATION_COLUMNS_FOR_PATIENT = ['cDNAchange1', 'cDNAchange2']

export const VISIBLE_COLUMNS_MUTATION_PATIENTS_CARD = ['AANOTATION', 'EXON', 'CONSEQUENCE']
/*
This constant variable can be adjusted to determine which fields from the tables are visible
on loading the page - should be in UPPERCASE, and same as 'name' field from metadata from tables.
 */
export const VISIBLE_FIELDS = {
  [MUTATION_TABLE]: ['AANOTATION', 'EXON', 'CONSEQUENCE', 'POS'],
  [PATIENT_TABLE]: ['PHENO', 'PUBMEDID']
}

/*
This constant variable can be adjusted to determine which fields are used as filters - should be in
UPPERCASE, and same as 'name' field from metadata from tables.
 */
export const VISIBLE_FILTERS = {
  [MUTATION_TABLE]: ['CONSEQUENCE', 'EXON'],
  [PATIENT_TABLE]: ['LOCATION', 'ANCHORINGFIBRILSNUMBER']
}
