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
//   [MUTATION_TABLE]: ['EXON', 'PATHOGENICITY'],
//   [PATIENT_TABLE]: ['POSITIVE_FAMILY_HISTORY']
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

/* The columns from the mutation table which are visible at the patients cards */
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
TODO: add visible filter option for field type enums
This constant variable can be adjusted to determine which fields are used as filters - should be in
UPPERCASE, and same as 'name' field from metadata from tables.
 */
export const VISIBLE_FILTERS = {
  [MUTATION_TABLE]: ['CONSEQUENCE', 'EVENT'],
  [PATIENT_TABLE]: ['LOCATION', 'ANCHORINGFIBRILSNUMBER']
}

/**
 * VARIABLES FIPA
 */

// /* Variables between different databases */
//
// /* API paths */
// export const MUTATIONS_API_PATH = '/api/v2/fipa_Mutations'
// export const PATIENTS_API_PATH = '/api/v2/fipa_Patients'
//
// /* Column names */
// /* Column name for Numerical Identifier from mutation (column which contains 'M100') */
// export const COLUMN_MUTATION_IDENTIFIER_NUMERICAL = 'MutationID'
//
// /* Column name where the cDNA notation is stored for mutation */
// export const COLUMN_MUTATION_CDNANOTATION = 'Variant_name_DNA_level'
//
// /* Column name where patient ID is stored for patients */
// export const COLUMN_PATIENT_ID = 'PatientID'
//
// /* Table names */
// export const MUTATION_TABLE = 'fipa_Mutations'
// export const PATIENT_TABLE = 'fipa_Patients'
//
// /* The column which links mutations to patients */
// export const LOOK_UP_ATTRIBUTE_MUTATIONS = 'MutationID'
//
// /* Column(s) where Mutations are stored per Patient */
// export const MUTATION_COLUMNS_FOR_PATIENT = ['MutationID']
//
// /* The columns from the mutation table which are visible at the patients cards - UPPERCASE */
// export const VISIBLE_COLUMNS_MUTATION_PATIENTS_CARD = ['VARIANT_NAME_DNA_LEVEL', 'VARIANT_EFFECT', 'VARIANT_CATEGORY']
//
// /*
// This constant variable can be adjusted to determine which fields from the tables are visible
// on loading the page - should be in UPPERCASE, and same as 'name' field from metadata from tables.
//  */
// export const VISIBLE_FIELDS = {
//   [MUTATION_TABLE]: ['VARIANT_NAME_DNA_LEVEL', 'VARIANT_EFFECT', 'VARIANT_CATEGORY', 'MUTATION_POSTITION'],
//   [PATIENT_TABLE]: ['CLINICAL_DIAGNOSIS', 'DETECTION_METHOD']
// }
//
// export const VISIBLE_FILTERS = {
//   [MUTATION_TABLE]: [],
//   [PATIENT_TABLE]: []
// }

