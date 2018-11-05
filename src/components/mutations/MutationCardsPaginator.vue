<template>
  <div>
    <b-row class="top-row-container">
      <b-col sm="3">
      </b-col>
      <b-col sm="9">
        <b-pagination-nav :use-router="true" size="md" :link-gen="linkGenerator" align="center"
                          :number-of-pages="totalPages" v-model="currentPage">
        </b-pagination-nav>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="3">
        <div v-if="filteredGroupInformation.hasOwnProperty(mutationTable)">
          <div v-if="Object.keys(filteredGroupInformation[mutationTable]).length === visibleFiltersMutations.length">
            <mutation-filter-container :pageNumber="currentPage"></mutation-filter-container>
          </div>
        </div>
      </b-col>
      <b-col sm="9">
        {{ filteredGroupInformation }}
        <div v-if="mutationIdentifiers.length > 0">
          <div v-for="(identifier, index) in mutationIdentifiers.slice(pageSize * (currentPage-1), pageSize * currentPage)" :key="index">
            <mutation-card :mutationIdentifier="identifier"
                           :mutation="mutations[identifier]"
                           :visibleFields="visibleFields"></mutation-card>
          </div>
        </div>
        <div v-else>
          <b-card class="no-mutations-found">
            No mutations found with these filters
          </b-card>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="3">
      </b-col>
      <b-col sm="9">
        <b-pagination-nav :use-router="true" size="md" :link-gen="linkGenerator" align="center"
                          :number-of-pages="totalPages" v-model="currentPage">
        </b-pagination-nav>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MutationCard from './MutationCard'
import MutationFilterContainer from './filters/MutationFilterContainer'
import GenomeBrowser from './../genomeBrowser/GenomeBrowser'
import { GET_FILTERED_GROUP_INFORMATION } from '../../store/actions'
import { MUTATION_TABLE, VISIBLE_FILTERS } from '../../store/config'

export default {
  name: 'MutationCardsPaginator',
  props: ['mutationIdentifiers', 'visibleFields'],
  components: {
    'mutation-card': MutationCard,
    'mutation-filter-container': MutationFilterContainer,
    'genome-browser': GenomeBrowser
  },
  data () {
    return {
      totalPages: Math.ceil(this.mutationIdentifiers.length / 20),
      currentPage: 1,
      pageSize: 20,
      mutationTable: MUTATION_TABLE,
      visibleFiltersMutations: VISIBLE_FILTERS[MUTATION_TABLE]
    }
  },
  computed: {
    ...mapGetters({
      mutations: 'mutation/getMutations',
      filteredGroupInformation: 'getFilteredGroupInformation'
    })
  },
  watch: {
    '$route.params.pageNumURL': function () {
      if (!this.$route.params.pageNumURL) {
        this.$route.params.pageNumURL = 1
      }
      this.validatePageNum(this.$route.params.pageNumURL)
      this.currentPage = parseInt(this.$route.params.pageNumURL)
    },
    mutationIdentifiers () {
      this.totalPages = Math.ceil(this.mutationIdentifiers.length / 20)
    }
  },
  created () {
    if (typeof this.$route.params.pageNumURL !== 'undefined') {
      this.currentPage = parseInt(this.$route.params.pageNumURL)
    }
    /* Filtered group information is only set on first load, so it doesn't get overwritten */
    if (typeof this.filteredGroupInformation[this.mutationTable] === 'undefined') {
      this.$store.dispatch(GET_FILTERED_GROUP_INFORMATION, MUTATION_TABLE)
    }
  },
  methods: {
    linkGenerator (pageNum) {
      return {
        path: '/Mutations/page/' + pageNum
      }
    },
    validatePageNum (pageNum) {
      if (this.totalPages > 0) {
        if (pageNum > this.totalPages) {
          this.$router.push('/Mutations/page/1')
          this.$router.push('/404')
        }
      }
    }
  }
}
</script>

<style scoped>
.top-row-container {
  margin-top: 1rem;
}
.no-mutations-found {
  color: #dc3545;
  text-align: center;
}
</style>
