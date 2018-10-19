<template>
  <div>
    Query: {{ this.$route.query }}
    RSQL: {{ rsql }}
    Page number: {{ pageNumber }}
    <string-filter></string-filter>
  </div>
</template>

<script>
import StringFilter from './StringFilter'
import { mapGetters } from 'vuex'
import { GET_FILTERED_MUTATIONS } from '../../../store/modules/mutation/actions'

export default {
  name: 'FilterContainer',
  props: ['pageNumber'],
  components: {
    'string-filter': StringFilter
  },
  computed: {
    ...mapGetters(['rsql'])
  },
  watch: {
    pageNumber () {
      this.createRoute()
    },
    rsql () {
      this.createRoute()
      this.getMutationIdentifiers()
    }
  },
  methods: {
    getMutationIdentifiers () {
      this.$store.dispatch('mutation/' + GET_FILTERED_MUTATIONS, this.rsql)
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
