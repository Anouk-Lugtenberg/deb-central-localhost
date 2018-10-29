<template>
    <span>
      <router-link :to="{name: 'Mutation', params: {id: mutationIdentifierNumerical}}">{{ mutationIdentifier }}</router-link>
    </span>
</template>

<script>
import { COLUMN_MUTATION_IDENTIFIER_NUMERICAL } from '../../store/actions'

export default {
  name: 'FieldTypeMutationIdentifier',
  props: ['mutationIdentifier', 'mutation'],
  /*
  Numerical identifier is used, since the router-link can't handle identifiers which contain a dot
   */
  data () {
    return {
      mutationIdentifierNumerical: this.mutation[COLUMN_MUTATION_IDENTIFIER_NUMERICAL]
    }
  }
}
</script>

<style scoped>

</style>
