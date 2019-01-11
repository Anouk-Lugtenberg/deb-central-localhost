import { createRSQLQuery } from '../../helpers'

export default {
  rsqlMutation: state => createRSQLQuery(state)
}
