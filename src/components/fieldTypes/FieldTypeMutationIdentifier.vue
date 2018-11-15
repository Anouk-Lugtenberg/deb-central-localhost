<template>
    <span>
      <router-link :to="{name: 'Mutation', params: {id: mutation[mutationIdentifierNumerical]}}">{{ mutationIdentifier }}</router-link>
    </span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FieldTypeMutationIdentifier',
  props: ['mutationIdentifier', 'mutation'],
  /*
  Numerical identifier is used, since the router-link can't handle identifiers which contain a dot
   */
  computed: {
    ...mapState({
      mutationIdentifierNumerical: 'COLUMN_MUTATION_IDENTIFIER_NUMERICAL'
    })
  }
}
</script>

<style scoped>

</style>
