<template>
  <div>
    RSQL: {{ rsqlQuery }}
    <mutation-string-filter :rsqlQuery="rsqlQuery"></mutation-string-filter>
    <mutation-checkbox-filters></mutation-checkbox-filters>
  </div>
</template>

<script>
import MutationStringFilter from './MutationStringFilter'
import MutationCheckboxFilters from './MutationCheckboxFilters'
import { mapGetters } from 'vuex'
import { GET_FILTERED_MUTATIONS } from '../../../store/modules/mutation/actions'
import { SET_SEARCH_MUTATION } from '../../../store/modules/mutation/mutations'

export default {
  name: 'MutationFilterContainer',
  props: ['pageNumber'],
  data () {
    return {
      rsqlQuery: ''
    }
  },
  components: {
    'mutation-string-filter': MutationStringFilter,
    'mutation-checkbox-filters': MutationCheckboxFilters
  },
  computed: {
    ...mapGetters({
      rsql: 'mutation/rsqlMutation',
      activeFilters: 'mutation/getActiveFiltersCheckbox'
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
</style>
