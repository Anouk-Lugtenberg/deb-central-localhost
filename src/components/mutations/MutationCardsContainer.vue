<template>
  <div>
    <!--<genome-browser></genome-browser>-->
    <div v-if="mutationsFiltersActive">
      <mutation-card-paginator :mutationIdentifiers="filteredMutationIdentifiers" :visibleFields="visibleFields"></mutation-card-paginator>
    </div>
    <div v-else-if="allIdentifiersMutation.length !== 0">
      <mutation-card-paginator :mutationIdentifiers="allIdentifiersMutation" :visibleFields="visibleFields"></mutation-card-paginator>
    </div>
    <div v-else>
      Loading mutations...
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MutationCardPaginator from './MutationCardsPaginator'
import { MUTATION_TABLE } from '../../store/config'
import GenomeBrowser from '../genomeBrowser/GenomeBrowser'

export default {
  name: 'MutationCardsContainer',
  components: {
    GenomeBrowser,
    'mutation-card-paginator': MutationCardPaginator
  },
  data () {
    return {
      mutationTable: MUTATION_TABLE
    }
  },
  computed: {
    ...mapGetters({
      allIdentifiersMutation: 'mutation/getAllMutationIdentifiers',
      filteredMutationIdentifiers: 'mutation/getFilteredMutationIdentifiers',
      mutationsFiltersActive: 'mutation/getMutationsFiltersActive',
      metadata: 'getMetadata'
    }),
    /* This is created instead of using the visible fields property from the metadata, because otherwise the spots from the metadata fields are
    reserved, and this leaves blank spots on the cards.
     */
    visibleFields: function () {
      let mutationTable = this.mutationTable
      let visibleFields = []
      for (let key in this.metadata[mutationTable]) {
        if (!this.metadata[mutationTable].hasOwnProperty(key)) continue
        if (this.metadata[mutationTable][key]['visible'] && this.metadata[mutationTable][key]['name'] !== 'ID') {
          visibleFields.push(this.metadata[mutationTable][key])
        }
      }
      return visibleFields
    }
  }
}
</script>

<style scoped>

</style>
