<template>
  <div>
    <b-container>
      <div v-if="identifiers.length > 0">
        <div v-for="mutationIdentifier in identifiers" :key="mutationIdentifier">
          <div v-if="mutations[mutationIdentifier] && Object.keys(metadataAllFieldsVisible).length > 0">
            <b-row>
              <b-col cols="12">
                <genome-browser :position="mutations[mutationIdentifier][columnMutationPosition]" :filterMutationsOnVisibility="filterMutationsOnVisibility"></genome-browser>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3">
                <b-card no-body>
                 <b-row class="small-text mt-2">
                   <b-col cols="3" class="ml-3">
                     <toggle-button :value="false" color="#3e81b5" :labels="true" v-model="filterMutationsOnVisibility">
                    </toggle-button>
                   </b-col>
                   <b-col cols="8">
                     Filter mutations on visibility in Genome Browser
                   </b-col>
                  </b-row>
                </b-card>
                <div v-if="filterMutationsOnVisibility">
                  <data-item-selector :table="mutationTable"></data-item-selector>
                </div>
              </b-col>
              <b-col cols="9" v-if="!filterMutationsOnVisibility">
                <mutation-card :mutationIdentifier="mutationIdentifier"
                               :mutation="mutations[mutationIdentifier]"
                               :visibleFields="metadataAllFieldsVisible[mutationTable]"
                               :expanded="true">
                </mutation-card>
              </b-col>
              <b-col cols="9" v-else>
                <div v-if="mutationsBetweenPosition.length > 0">
                  <div v-if="mutationsBetweenPosition.length > 20">
                    <b-pagination-nav base-url="#" size="md" align="center"
                                      :number-of-pages="mutationsBetweenPosition.length / pageSize" v-model="currentPage">
                    </b-pagination-nav>
                  </div>
                  <div v-for="mutationIdentifier in mutationsBetweenPosition.slice(pageSize * (currentPage-1), pageSize * currentPage)">
                    <mutation-card :mutationIdentifier="mutationIdentifier"
                                   :mutation="mutations[mutationIdentifier]"
                                   :visibleFields="getVisibleFieldsMetadata(mutationTable)"
                                   :expanded="false">
                    </mutation-card>
                  </div>
                </div>
                <div v-else>
                  <b-card class="no-mutations-found">
                    No mutations on this position
                  </b-card>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MutationCard from './../mutations/MutationCard'
import GenomeBrowser from './../genomeBrowser/GenomeBrowser'
import DataItemSelector from './../settings/DataItemSelector'
import ToggleButton from 'vue-js-toggle-button/src/Button'
import { SET_BOOLEAN_COMPACT_VIEW_MUTATIONS } from '../../store/modules/mutation/mutations'

export default {
  name: 'MutationModel',
  props: ['id'],
  components: {
    'data-item-selector': DataItemSelector,
    'mutation-card': MutationCard,
    'genome-browser': GenomeBrowser,
    'toggle-button': ToggleButton
  },
  data () {
    return {
      numericalIdentifiers: new Set(),
      identifiers: [],
      newMutation: '',
      errorMutationNotFound: false,
      filterMutationsOnVisibility: false,
      currentPage: 1,
      pageSize: 20
    }
  },
  created () {
    this.$store.commit('mutation/' + SET_BOOLEAN_COMPACT_VIEW_MUTATIONS, false)
    this.updateIdentifiers()
    this.getMutationIdentifiers()
  },
  computed: {
    ...mapGetters({
      metadataAllFieldsVisible: 'getMetadataAllFieldsVisible',
      mutations: 'mutation/getMutations',
      mutationsBetweenPosition: 'mutation/getMutationsBetweenPositionStartAndEnd',
      getVisibleFieldsMetadata: 'getVisibleFieldsMetadata'
    }),
    ...mapState({
      columnMutationIdentifierNumerical: 'COLUMN_MUTATION_IDENTIFIER_NUMERICAL',
      mutationTable: 'MUTATION_TABLE',
      columnMutationPosition: 'COLUMN_MUTATION_POSITION'
    })
  },
  watch: {
    id: function () {
      this.updateIdentifiers()
      this.getMutationIdentifiers()
    },
    mutations: function () {
      this.updateIdentifiers()
      this.getMutationIdentifiers()
    }
  },
  methods: {
    updateIdentifiers () {
      this.numericalIdentifiers = new Set()
      if (this.id.substring('&')) {
        let singleNumericalIdentifier = this.id.split('&')
        for (let item in singleNumericalIdentifier) {
          this.numericalIdentifiers.add(singleNumericalIdentifier[item])
        }
      } else {
        this.numericalIdentifiers = this.id
      }
    },
    /*
    CDNA notation is retrieved, bases on numerical identifier from mutation.
    This is done, because the router doesn't deal well with URLs containing a dot, and dots are found in CDNA notation.
     */
    getMutationIdentifiers () {
      this.identifiers = []
      for (let identifier in this.mutations) {
        if (!this.mutations.hasOwnProperty(identifier)) continue
        let mutationIdentifier = this.mutations[identifier][this.columnMutationIdentifierNumerical]
        if (this.numericalIdentifiers.has(mutationIdentifier)) {
          this.identifiers.push(identifier)
        }
      }
    }
  }
}
</script>
<style scoped>
  .small-text {
    font-size: 14px;
  }
  .no-mutations-found {
    color: #dc3545;
    text-align: center;
  }
</style>
