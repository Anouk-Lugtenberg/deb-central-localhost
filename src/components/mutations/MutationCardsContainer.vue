<template>
  <div>
    <div v-if="filteredMutationIdentifiers.length > 0">
      <mutation-card-paginator :mutationIdentifiers="filteredMutationIdentifiers"></mutation-card-paginator>
    </div>
    <div v-else-if="allIdentifiersMutation.length !== 0">
      <mutation-card-paginator :mutationIdentifiers="allIdentifiersMutation"></mutation-card-paginator>
    </div>
    <div v-else>
      Loading mutations...
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MutationCardPaginator from './MutationCardsPaginator'

export default {
  name: 'MutationCardsContainer',
  components: {
    'mutation-card-paginator': MutationCardPaginator
  },
  computed: {
    ...mapGetters({
      allIdentifiersMutation: 'mutation/getAllMutationIdentifiers',
      filteredMutationIdentifiers: 'mutation/getFilteredMutationIdentifiers'
    })
  }
}
</script>

<style scoped>

</style>
