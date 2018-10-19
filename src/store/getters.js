import { createRSQLQuery } from './helpers'

export default {
  getMetadata: state => state.metadata,
  rsql: createRSQLQuery
}
