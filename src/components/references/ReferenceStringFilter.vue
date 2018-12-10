<template>
  <div>
    RSQL {{ rsql }}
    search: {{ search }}
    <input type="text" placeholder="Search references" v-model.lazy="search">
  </div>
</template>

<script>
import { SET_SEARCH_REFERENCES } from '../../store/mutations'
import { GET_FILTERED_REFERENCES } from '../../store/actions'
import { mapGetters } from 'vuex'

export default {
  name: 'ReferenceStringFilter',
  data () {
    return {
      search: '',
      filtered: false
    }
  },
  created () {
    if (this.$route.query.q) {
      this.$store.dispatch(GET_FILTERED_REFERENCES)
      this.search = this.$route.query.q.split('=').pop()
    }
  },
  watch: {
    search () {
      this.$store.commit(SET_SEARCH_REFERENCES, this.search)
    },
    rsql () {
      this.createRoute()
    },
    '$route.query.q' () {
      if (this.$route.query.q) {
        this.$store.dispatch(GET_FILTERED_REFERENCES)
      }
    }
  },
  computed: {
    ...mapGetters({
      rsql: 'getRSQLReferences'
    })
  },
  methods: {
    createRoute () {
      if (this.rsql) {
        this.createRouteWithQuery()
      } else {
        this.createRouteWithoutQuery()
      }
    },
    createRouteWithQuery () {
      this.$router.push({
        name: 'References',
        query: {q: this.rsql}
      })
    },
    createRouteWithoutQuery () {
      this.$router.push({
        name: 'References'
      })
    }
  }
}
</script>

<style scoped>

</style>
