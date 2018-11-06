<template>
  <b-card header-tag="header" header-bg-variant="light" class="rounded-1" no-body>
    <div slot="header" class="text-center">
      <span class="title-filters">
        Filters
      </span>
    </div>
    <div v-for="filterGroup in filteredGroupInformation[mutationTable]">
      <ul class="list-inline">
        <template v-for="filter in filterGroup">
          <li v-if="filter.activeFilter" class="list-inline-item active-filter" @click="filter.activeFilter = false">
            <small>{{ filter.name }}</small>
            <i title="remove this filter" class="fa fa-times remove-filter-btn"></i>
          </li>
        </template>
      </ul>
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
import { mapGetters } from 'vuex'
import { GET_FILTERED_MUTATIONS } from '../../../store/modules/mutation/actions'
import { MUTATION_TABLE } from '../../../store/config'

export default {
  name: 'MutationFilterContainer',
  props: ['pageNumber'],
  data () {
    return {
      mutationTable: MUTATION_TABLE
    }
  },
  components: {
    'mutation-string-filter': MutationStringFilter,
    'checkbox-filter-group': CheckboxFilterGroup
  },
  computed: {
    ...mapGetters({
      rsqlQueryFromFilters: 'mutation/rsqlMutation',
      activeFilters: 'mutation/getActiveFiltersCheckbox',
      mutationsFiltersActive: 'mutation/getMutationsFiltersActive',
      filteredGroupInformation: 'getFilteredGroupInformation',
      stringSearch: 'mutation/getStringSearch'
    })
  },
  created () {
    this.$store.dispatch('mutation/' + GET_FILTERED_MUTATIONS)
  },
  watch: {
    activeFilters () {
      this.createRoute()
    },
    stringSearch () {
      this.createRoute()
    },
    '$route.query.q' () {
      this.$store.dispatch('mutation/' + GET_FILTERED_MUTATIONS)
    }
  },
  methods: {
    createRoute () {
      if (this.rsqlQueryFromFilters.length > 0) {
        this.createRouteWithQuery()
      } else {
        this.createRouteWithoutQuery()
      }
      this.$store.dispatch('mutation/' + GET_FILTERED_MUTATIONS)
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
.active-filter {
  padding: 0.1em 0.3em 0.3em;
  border: solid 1px;
  margin-bottom: 0.2em;
}

.active-filter:hover {
  cursor: pointer;
  color: red;
}
</style>
