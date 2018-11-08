<template>
  <b-card header-tag="header" header-bg-variant="light" class="rounded-1" no-body>
    <div slot="header" class="text-center">
      <span class="title-filters">
        Filters
      </span>
    </div>
    <div v-if="$route.query.q">
      <button @click="clearAllFilters">Clear filters</button>
      <small>Active filters:</small>
      <div v-for="filterGroup in filteredGroupInformation[mutationTable]">
        <active-filters :filterGroup="filterGroup"></active-filters>
      </div>
    </div>
    <mutation-string-filter></mutation-string-filter>
    <div v-if="filteredGroupInformation[mutationTable]">
      <div v-for="filterGroupName in Object.keys(filteredGroupInformation[mutationTable])">
        <checkbox-filter-group :filterGroupName="filterGroupName" :filters="filteredGroupInformation[mutationTable][filterGroupName]"></checkbox-filter-group>
      </div>
    </div>
  </b-card>
</template>

<script>
import MutationStringFilter from './MutationStringFilter'
import CheckboxFilterGroup from '../../filters/CheckboxFilterGroup'
import ActiveFilters from '../../filters/ActiveFilters'
import { mapGetters } from 'vuex'
import { GET_FILTERED_MUTATIONS } from '../../../store/modules/mutation/actions'
import { MUTATION_TABLE } from '../../../store/config'
import { GET_FILTERS_FROM_URL, RESET_FILTERS } from '../../../store/actions'
import { SET_MUTATIONS_IS_FILTERING, SET_SEARCH_MUTATION } from '../../../store/modules/mutation/mutations'

export default {
  name: 'MutationFilterContainer',
  props: ['pageNumber'],
  data () {
    return {
      mutationTable: MUTATION_TABLE
    }
  },
  components: {
    'active-filters': ActiveFilters,
    'mutation-string-filter': MutationStringFilter,
    'checkbox-filter-group': CheckboxFilterGroup
  },
  computed: {
    ...mapGetters({
      rsqlQueryFromFilters: 'mutation/rsqlMutation',
      filteredGroupInformation: 'getFilteredGroupInformation'
    })
  },
  created () {
    if (this.$route.query.q) {
      this.$store.dispatch(GET_FILTERS_FROM_URL)
    } else {
      this.clearAllFilters()
    }
  },
  watch: {
    '$route.query.q' () {
      if (this.$route.query.q) {
        this.$store.dispatch(GET_FILTERS_FROM_URL)
      } else {
        this.$store.dispatch('mutation/' + GET_FILTERED_MUTATIONS)
      }
    },
    rsqlQueryFromFilters () {
      this.$store.commit('mutation/' + SET_MUTATIONS_IS_FILTERING, true)
      this.createRoute()
      if (this.$route.query.q) {
        this.$store.dispatch('mutation/' + GET_FILTERED_MUTATIONS)
      }
    }
  },
  methods: {
    clearAllFilters () {
      this.$store.dispatch(RESET_FILTERS)
      this.$store.commit('mutation/' + SET_SEARCH_MUTATION)
    },
    createRoute () {
      if (this.rsqlQueryFromFilters.length > 0) {
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
        query: {q: this.rsqlQueryFromFilters}
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
