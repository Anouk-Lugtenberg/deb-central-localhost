/* Variables between different databases */
/* API paths */
export const MUTATIONS_API_PATH = '/api/v2/col7a1_Mutations'
export const PATIENTS_API_PATH = '/api/v2/col7a1_Patients'

export const COLUMN_MUTATION_IDENTIFIER_NUMERICAL = 'ID'
export const COLUMN_MUTATION_ID = 'cdnanotation'
export const COLUMN_PATIENT_ID = 'PatientID'

/* Table names */
export const MUTATION_TABLE = 'col7a1_Mutations'
export const PATIENT_TABLE = 'col7a1_Patients'

/* The column which links mutations to patients */
export const LOOK_UP_ATTRIBUTE_MUTATIONS = 'cdnanotation'

/*
This constant variable can be adjusted to determine which fields from the tables are visible
on loading the page - should be in UPPERCASE, and same as 'name' field from metadata from tables.
 */
export const VISIBLE_FIELDS = {
  [MUTATION_TABLE]: ['AANOTATION', 'EXON', 'CONSEQUENCE', 'POS'],
  [PATIENT_TABLE]: ['PHENO', 'PUBMEDID']
}

export const VISIBLE_FILTERS = {
  [MUTATION_TABLE]: ['CONSEQUENCE', 'EXON'],
  [PATIENT_TABLE]: ['LOCATION']
}
