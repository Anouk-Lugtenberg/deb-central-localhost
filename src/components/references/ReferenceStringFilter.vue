<template>
  <b-card class="mb-2 p-2" no-body>
    <div v-if="$route.query.q">
      <button class="btn btn-secondary btn-sm" @click="createRouteWithoutQuery">Clear search</button><br/>
    </div>
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
import { SET_SEARCH_REFERENCES, RESET_FILTERED_REFERENCES } from '../../store/mutations'
import { GET_FILTERED_REFERENCES } from '../../store/actions'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ReferenceStringFilter',
  data () {
    return {
      search: '',
      filtered: false,
      options: []
    }
  },
  created () {
    this.createOptions()
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
      } else {
        this.$store.commit(RESET_FILTERED_REFERENCES)
      }
    }
  },
  computed: {
    ...mapState({
      searchableColumnsPubMed: 'SEARCHABLE_COLUMNS_PUBMED'
    }),
    ...mapGetters({
      rsql: 'getRSQLReferences'
    })
  },
  methods: {
    createOptions () {
      if (Object.keys(this.$route.query).length > 0) {
        this.searchableColumnsPubMed.forEach((column) => {
          let checked = false
          let name = column.replace(/([A-Z])/g, ' $1').trim()
          if (this.$route.query.q.includes(column)) {
            checked = true
          }
          this.options.push({'id': column, 'name': name.charAt(0).toUpperCase() + name.slice(1), 'checked': checked})
        })
      } else {
        this.searchableColumnsPubMed.forEach((column) => {
          let name = column.replace(/([A-Z])/g, ' $1').trim()
          this.options.push({'id': column, 'name': name.charAt(0).toUpperCase() + name.slice(1), 'checked': true})
        })
      }
    },
    createRoute () {
      if (this.rsql) {
        this.createRouteWithQuery()
      } else {
        this.createRouteWithoutQuery()
      }
    },
    createRouteWithQuery () {
      this.$router.push({
        name: 'ReferencesContainer',
        query: {q: this.rsql}
      })
    },
    createRouteWithoutQuery () {
      this.$router.push({
        name: 'ReferencesContainer'
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
