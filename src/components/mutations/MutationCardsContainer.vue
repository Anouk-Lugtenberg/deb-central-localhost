<template>
  <div>
    <div v-if="metadata[mutationTable]">
      <div v-if="$route.query.q">
        <mutation-card-paginator :mutationIdentifiers="filteredMutationIdentifiers"
                                 :visibleFields="getVisibleFieldsMetadata(mutationTable)"
                                 :filtered="true"></mutation-card-paginator>
      </div>
      <div v-else>
        <mutation-card-paginator :mutationIdentifiers="allIdentifiersMutation"
                                 :visibleFields="getVisibleFieldsMetadata(mutationTable)"></mutation-card-paginator>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MutationCardPaginator from './MutationCardsPaginator'
import GenomeBrowser from '../genomeBrowser/GenomeBrowser'

export default {
  name: 'MutationCardsContainer',
  components: {
    GenomeBrowser,
    'mutation-card-paginator': MutationCardPaginator
  },
  computed: {
    ...mapGetters({
      allIdentifiersMutation: 'mutation/getAllMutationIdentifiers',
      filteredMutationIdentifiers: 'mutation/getFilteredMutationIdentifiers',
      metadata: 'getMetadata',
      getVisibleFieldsMetadata: 'getVisibleFieldsMetadata'
    }),
    ...mapState({
      mutationTable: 'MUTATION_TABLE'
    })
  }
}
</script>
