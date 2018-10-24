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
        <mutation-filter-container :pageNumber="currentPage"></mutation-filter-container>
      </b-col>
      <b-col sm="9">
        <div v-for="identifier in mutationIdentifiers.slice(pageSize * (currentPage-1), pageSize * currentPage)" :key="identifier">
          <mutation-card :mutationIdentifier="identifier"
                         :mutation="mutations[identifier]"
                         :visibleFields="visibleFields"></mutation-card>
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

export default {
  name: 'MutationCardsPaginator',
  props: ['mutationIdentifiers', 'visibleFields'],
  components: {
    'mutation-card': MutationCard,
    'mutation-filter-container': MutationFilterContainer
  },
  data () {
    return {
      totalPages: Math.ceil(this.mutationIdentifiers.length / 20),
      currentPage: 1,
      pageSize: 20
    }
  },
  computed: {
    ...mapGetters({
      mutations: 'mutation/getMutations'
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
</style>
