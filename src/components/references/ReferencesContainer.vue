<template>
  <b-container>
    <b-row class="pt-3">
      <b-col cols="3">
        <reference-string-filter></reference-string-filter>
        <b-card>
          <div v-for="reference in references">
            {{ reference[columnPubmed] }}
          </div>
        </b-card>
      </b-col>
      <b-col cols="9">
        <div v-if="$route.query.q">
          <div v-if="filteredReferences.length > 0">
            <div class="amount-references-found">
              {{ filteredReferences.length }} publication(s)
            </div>
            <div v-for="referenceIdentifier in filteredReferences" class="pb-2">
              <reference-card v-if="references[referenceIdentifier]" :reference="references[referenceIdentifier]" :id="referenceIdentifier"></reference-card>
            </div>
          </div>
          <b-card v-else class="no-references-found">
            No references found
          </b-card>
        </div>
        <div v-else>
          <div v-if="Object.keys(references).length > 0">
            <div v-for="reference in references" class="pb-2">
              <reference-card :reference="reference" :id=reference[columnPubmed]></reference-card>
          </div>
        </div>
      </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { GET_ALL_REFERENCES } from '../../store/actions'
import { mapGetters, mapState } from 'vuex'
import ReferenceCard from './ReferenceCard'
import ReferenceStringFilter from './ReferenceStringFilter'

export default {
  name: 'ReferencesContainer',
  components: {
    'reference-card': ReferenceCard,
    'reference-string-filter': ReferenceStringFilter
  },
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters({
      references: 'getAllReferences',
      filteredReferences: 'getFilteredReferences'
    }),
    ...mapState({
      columnPubmed: 'COLUMN_PUBMED_ID_REFERENCE_TABLE'
    })
  },
  created () {
    this.$store.dispatch(GET_ALL_REFERENCES)
  }
}
</script>

<style scoped>
  .no-references-found {
    color: #dc3545;
    text-align: center;
  }
  .amount-references-found {
    text-align: center;
    font-weight: bold;
  }
</style>
