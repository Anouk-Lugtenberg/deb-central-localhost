<template>
  <b-container>
    <b-row class="pt-3">
      <b-col cols="3">
        <b-card no-body class="p-2 references-per-page mb-2">
          References per page
          <b-form-select v-model="pageSize" :options="optionsPageSize" size="sm" :plain="true"></b-form-select>
        </b-card>
      </b-col>
      <b-col cols="9">
        <b-pagination-nav v-if="totalPages > 0" :use-router="true" size="md" align="center" :link-gen="linkGenerator"
                          :number-of-pages="totalPages" v-model="currentPage">
        </b-pagination-nav>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="3">
        <reference-string-filter></reference-string-filter>
      </b-col>
      <b-col cols="9">
        <div v-if="Object.keys(references).length > 0">
          <div v-if="$route.query.q">
          <moon-loader v-if="referencesFiltering" :textForLoader="'Filtering'"></moon-loader>
          <div v-else-if="filteredReferences.length > 0">
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
          <div v-for="referenceIdentifier in Object.keys(references).slice(pageSize * (currentPage-1), pageSize * currentPage)" class="pb-2">
            <reference-card :reference="references[referenceIdentifier]" :id=referenceIdentifier></reference-card>
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
import MoonLoader from './../loader/MoonLoader'

export default {
  name: 'ReferencesContainer',
  components: {
    'reference-card': ReferenceCard,
    'reference-string-filter': ReferenceStringFilter,
    'moon-loader': MoonLoader
  },
  data () {
    return {
      currentPage: 1,
      totalPages: 0,
      pageSize: 20,
      optionsPageSize: [
        {value: 20, text: '20'},
        {value: 50, text: '50'},
        {value: 75, text: '75'},
        {value: 100, text: '100'}
      ]
    }
  },
  computed: {
    ...mapGetters({
      references: 'getAllReferences',
      filteredReferences: 'getFilteredReferences'
    }),
    ...mapState({
      columnPubmed: 'COLUMN_PUBMED_ID_REFERENCE_TABLE',
      referencesFiltering: 'referencesFiltering'
    })
  },
  watch: {
    filteredReferences () {
      this.setTotalPages()
    },
    references () {
      this.setTotalPages()
    },
    pageSize () {
      this.setTotalPages()
    }
  },
  methods: {
    linkGenerator (pageNum) {
      if (typeof this.$route.query.q !== 'undefined') {
        return {
          name: 'ReferencesContainer',
          params: {
            pageNumURL: pageNum
          },
          query: {q: this.$route.query.q}
        }
      } else {
        return {
          path: '/References/page/' + pageNum
        }
      }
    },
    setTotalPages () {
      console.log('Setting total pages')
      if (this.filteredReferences.length > 0) {
        this.totalPages = Math.ceil(this.filteredReferences.length / this.pageSize)
      } else {
        this.totalPages = Math.ceil(Object.keys(this.references).length / this.pageSize)
      }
    }
  },
  created () {
    if (Object.keys(this.references).length === 0) {
      this.$store.dispatch(GET_ALL_REFERENCES)
    }
    this.setTotalPages()
    if (typeof this.$route.params.pageNumURL !== 'undefined') {
      this.currentPage = parseInt(this.$route.params.pageNumURL)
    }
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
  .references-per-page {
    font-size: 14px;
    background-color: #fafafa;
  }
</style>
