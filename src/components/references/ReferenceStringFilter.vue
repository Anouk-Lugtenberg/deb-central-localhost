<template>
  <b-card class="mb-2 p-2" no-body>
    <div class="search-options">
      Search in columns:
      <div v-for="option in options">
        <input type="checkbox" v-model="option.checked"> {{ option.name }}
      </div>
    </div>
    <input type="text" placeholder="Search references" v-model.lazy="search">
  </b-card>
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
      filtered: false,
      options: [
        {id: 'Title', name: 'Title', checked: true},
        {id: 'abstractText', name: 'Abstract Text', checked: true}
      ]
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
      this.setSearch()
    },
    options: {
      handler: function () {
        this.setSearch()
      },
      deep: true
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
    },
    setSearch () {
      let columnsToSearch = []
      this.options.forEach(function (option) {
        if (option.checked) {
          columnsToSearch.push(option.id)
        }
      })
      this.$store.commit(SET_SEARCH_REFERENCES, [this.search, columnsToSearch])
    }
  }
}
</script>

<style scoped>
.search-options {
  font-size: 14px;
}
</style>
