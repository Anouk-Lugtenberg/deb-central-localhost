<template>
  <div>
    <div v-if="filteredMutationIdentifiers.length > 0">
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
import { MUTATION_TABLE } from '../../store/actions'

export default {
  name: 'MutationCardsContainer',
  components: {
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
      metadata: 'getMetadata'
    }),
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
