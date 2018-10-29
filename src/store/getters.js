import { createRSQLQuery } from './helpers'

export default {
  getMetadata: state => state.metadata,
  getMetadataAllFieldsVisible: state => state.metadataAllFieldsVisible,
  rsql: createRSQLQuery
}
