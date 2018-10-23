<template>
  <div>
    Query: {{ this.$route.query }}
    RSQL: {{ rsql }}
    Page number: {{ pageNumber }}
    <mutation-string-filter></mutation-string-filter>
  </div>
</template>

<script>
import MutationStringFilter from './MutationStringFilter'
import { mapGetters } from 'vuex'
import { GET_FILTERED_MUTATIONS } from '../../../store/modules/mutation/actions'

export default {
  name: 'MutationFilterContainer',
  props: ['pageNumber'],
  components: {
    'mutation-string-filter': MutationStringFilter
  },
  computed: {
    ...mapGetters(['rsql'])
  },
  /* Checks if search query is available in URL on creation, if yes -> use this Query to filter mutations */
  created () {
    if (typeof this.$route.query.q !== 'undefined') {
      let URLrsql = this.$route.query.q
      this.getMutationIdentifiers(URLrsql)
    }
  },
  watch: {
    pageNumber () {
      this.createRoute()
    },
    rsql () {
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
