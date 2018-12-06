<template>
    <span class="link">
      <router-link :to="{name: 'Mutation', params: {id: mutation[mutationIdentifierNumerical]}}">
        <font-awesome-icon icon="search" class="fa-icon"></font-awesome-icon>
        {{ mutationIdentifier }}
      </router-link>
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
  .fa-icon {
    border-radius: 5px;
    padding: 2px;
    background-color: #2a97be;
    color: white;
    font-size: 22px;
  }
  .fa-icon:hover {
    cursor: pointer;
    background-color: #1380b5;
  }
</style>
