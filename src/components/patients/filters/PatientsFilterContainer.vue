<template>
  <b-card header-tag="header" header-bg-variant="light" class="rounded-1 filter-container" no-body>
    <span class="title-filters card-text text-center">
      Filters
    </span>
    <div v-if="$route.query.q" class="ml-2 mr-2 mt-2">
      <button class="btn btn-secondary btn-sm" @click="clearAllFilters">Clear all filters</button><br/>
      <small>Active filters:</small>
      <div v-for="filterGroup in filteredGroupInformation[patientTable]">
        <active-filters :filterGroup="filterGroup"></active-filters>
      </div>
    </div>
    <patients-string-filter></patients-string-filter>
    <div v-if="filteredGroupInformation[patientTable]">
      <div v-for="filterGroupName in Object.keys(filteredGroupInformation[patientTable])">
        <checkbox-filter-group :filterGroupName="filterGroupName" :filters="filteredGroupInformation[patientTable][filterGroupName]"></checkbox-filter-group>
      </div>
    </div>
  </b-card>
</template>

<script>
import PatientsStringFilter from './PatientsStringFilter'
import CheckboxFilterGroup from './../../filters/CheckboxFilterGroup'
import ActiveFilters from './../../filters/ActiveFilters'
import { mapGetters, mapState } from 'vuex'
import { GET_FILTERED_PATIENTS } from '../../../store/modules/patients/actions'
import { GET_FILTERS_FROM_URL, RESET_FILTERS } from '../../../store/actions'
import { SET_SEARCH_PATIENTS, SET_PATIENTS_IS_FILTERING } from '../../../store/modules/patients/mutations'

export default {
  name: 'PatientsFilterContainer',
  props: ['pageNumber'],
  components: {
    'active-filters': ActiveFilters,
    'patients-string-filter': PatientsStringFilter,
    'checkbox-filter-group': CheckboxFilterGroup
  },
  computed: {
    ...mapGetters({
      rsqlQueryFromFilters: 'patients/rsqlPatients',
      filteredGroupInformation: 'getFilteredGroupInformation'
    }),
    ...mapState({
      patientTable: 'PATIENT_TABLE'
    })
  },
  /* Checks if search query is available in URL on creation, if yes -> use this Query to filter patients */
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
        this.clearAllFilters()
      }
    },
    rsqlQueryFromFilters () {
      this.$store.commit('patients/' + SET_PATIENTS_IS_FILTERING, true)
      this.createRoute()
      if (this.$route.query.q) {
        this.$store.dispatch('patients/' + GET_FILTERED_PATIENTS)
      }
    }
  },
  methods: {
    clearAllFilters () {
      this.$store.dispatch(RESET_FILTERS)
      this.$store.commit('patients/' + SET_SEARCH_PATIENTS)
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
        name: 'PatientsContainer',
        params: {
          pageNumURL: this.pageNumber
        },
        query: {q: this.rsqlQueryFromFilters}
      })
    },
    createRouteWithoutQuery () {
      this.$router.push({
        name: 'PatientsContainer',
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
    background-color: #dee6ed;
  }
  .filter-container {
    background-color: #fafafa;
  }
</style>
