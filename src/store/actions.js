import api from '@molgenis/molgenis-api-client'
import {
  SET_METADATA
} from './mutations'

/* ACTION CONSTANTS */
export const GET_METADATA = '__GET_METADATA__'

/* Variables between different databases */
/* API paths */
export const MUTATIONS_API_PATH = '/api/v2/col7a1_Mutations'
export const PATIENTS_API_PATH = '/api/v2/col7a1_Patients'

/* Table names */
export const MUTATION_TABLE = 'col7a1_Mutations'
export const PATIENT_TABLE = 'col7a1_Patients'

/* The column which links mutations to patients */
export const LOOK_UP_ATTRIBUTE_MUTATIONS = 'cdnanotation'

/* Tables DEB central */
const TABLES = [MUTATION_TABLE, PATIENT_TABLE]

/*
This constant variable can be adjusted to determine which fields from the tables are visible
on loading the page - should be in UPPERCASE, and same as 'name' field from metadata from tables.
 */
export const VISIBLE_FIELDS = {
  [MUTATION_TABLE]: ['AANOTATION', 'EXON', 'CONSEQUENCE', 'POS'],
  [PATIENT_TABLE]: ['PHENO', 'PUBMEDID']
}

export const COLUMN_MUTATION_IDENTIFIER_NUMERICAL = 'ID'
export const COLUMN_MUTATION_ID = 'cdnanotation'
export const COLUMN_PATIENT_ID = 'PatientID'

export default {
  [GET_METADATA] (context) {
    for (let i = 0; i < TABLES.length; i++) {
      api.get('/api/v2/' + TABLES[i] + '?start=0&num=10')
        .then(response => response.json())
        .then(response => {
          context.commit(SET_METADATA, [response.meta.attributes, TABLES[i]])
        })
    }
  }
}
