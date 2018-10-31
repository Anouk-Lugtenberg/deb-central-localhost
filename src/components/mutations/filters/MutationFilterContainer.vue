<template>
  <b-card header-tag="header" header-bg-variant="light" class="rounded-1" no-body>
    <div slot="header" class="text-center">
      <span class="title-filters">
        Filters
      </span>
    </div>
    <mutation-string-filter :rsqlQuery="rsqlQuery"></mutation-string-filter>
    <checkbox-filters :table="mutationTable"></checkbox-filters>
  </b-card>
</template>

<script>
import MutationStringFilter from './MutationStringFilter'
import CheckboxFilters from '../../filters/CheckboxFilters'
import { mapGetters } from 'vuex'
import { GET_FILTERED_MUTATIONS } from '../../../store/modules/mutation/actions'
import { SET_SEARCH_MUTATION } from '../../../store/modules/mutation/mutations'
import { MUTATION_TABLE } from '../../../store/config'

export default {
  name: 'MutationFilterContainer',
  props: ['pageNumber'],
  data () {
    return {
      rsqlQuery: '',
      mutationTable: MUTATION_TABLE
    }
  },
  components: {
    'mutation-string-filter': MutationStringFilter,
    'checkbox-filters': CheckboxFilters
  },
  computed: {
    ...mapGetters({
      rsql: 'mutation/rsqlMutation',
      activeFilters: 'mutation/getActiveFiltersCheckbox',
      mutationsFiltersActive: 'mutation/getMutationsFiltersActive'
    })
  },
  /* Checks if search query is available in URL on creation, if yes -> use this Query to filter mutations */
  created () {
    if (typeof this.$route.query.q !== 'undefined') {
      let URLrsql = this.$route.query.q
      this.rsqlQuery = URLrsql.split('=').pop()
      this.getMutationIdentifiers(URLrsql)
      /* Resets the filters if there's no query available in the URL */
    } else {
      this.$store.commit('mutation/' + SET_SEARCH_MUTATION, '')
    }
  },
  watch: {
    pageNumber () {
      this.createRoute()
    },
    rsql () {
      this.rsqlQuery = this.rsql
      this.createRoute()
      this.getMutationIdentifiers(this.rsql)
    }
  },
  methods: {
    getMutationIdentifiers (rsql) {
      this.$store.dispatch('mutation/' + GET_FILTERED_MUTATIONS, rsql)
    },
    createRoute () {
      if (this.rsql.length > 0) {
        this.createRouteWithQuery()
      } else {
        this.createRouteWithoutQuery()
      }
    },
    createRouteWithQuery () {
      this.$router.push({
        name: 'MutationsContainer',
        params: {
          pageNumURL: this.pageNumber
        },
        query: {q: this.rsql}
      })
    },
    createRouteWithoutQuery () {
      this.$router.push({
        name: 'MutationsContainer',
        params: {
          pageNumURL: this.pageNumber
        }
      })
    }
  }
}
</script>

<style scoped>
.title-filters {
  font-size: 20px;
  font-weight: bold;
  color: #4497be;
}
</style>
