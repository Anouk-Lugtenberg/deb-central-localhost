<template>
  <div>
    <!--<genome-browser></genome-browser>-->
    <div v-if="metadata[mutationTable]">
      <div v-if="$route.query.q">
        <mutation-card-paginator :mutationIdentifiers="filteredMutationIdentifiers"
                                 :visibleFields="visibleFields"
                                 :filtered="true"></mutation-card-paginator>
      </div>
      <div v-else>
        <mutation-card-paginator :mutationIdentifiers="allIdentifiersMutation"
                                 :visibleFields="visibleFields"></mutation-card-paginator>
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
      metadata: 'getMetadata'
    }),
    ...mapState({
      mutationTable: 'MUTATION_TABLE',
      cDNANotation: 'COLUMN_MUTATION_CDNANOTATION'
    }),
    /* This is created instead of using the visible fields property from the metadata, because otherwise the spots from the metadata fields are
    reserved, and this leaves blank spots on the cards.
     */
    visibleFields: function () {
      let mutationTable = this.mutationTable
      let visibleFields = []
      for (let key in this.metadata[mutationTable]) {
        if (!this.metadata[mutationTable].hasOwnProperty(key)) continue
        if (this.metadata[mutationTable][key]['visible'] && this.metadata[mutationTable][key]['name'] !== this.cDNANotation) {
          visibleFields.push(this.metadata[mutationTable][key])
        }
      }
      return visibleFields
    }
  }
}
</script>
