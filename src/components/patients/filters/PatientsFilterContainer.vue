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
import { mapGetters } from 'vuex'
import { GET_FILTERED_PATIENTS } from '../../../store/modules/patients/actions'
import { PATIENT_TABLE } from '../../../store/config'
import { GET_FILTERS_FROM_URL, RESET_FILTERS } from '../../../store/actions'
import { SET_SEARCH_PATIENTS, SET_PATIENTS_IS_FILTERING } from '../../../store/modules/patients/mutations'

export default {
  name: 'PatientsFilterContainer',
  props: ['pageNumber'],
  data () {
    return {
      patientTable: PATIENT_TABLE
    }
  },
  components: {
    'active-filters': ActiveFilters,
    'patients-string-filter': PatientsStringFilter,
    'checkbox-filter-group': CheckboxFilterGroup
  },
  computed: {
    ...mapGetters({
      rsqlQueryFromFilters: 'patients/rsqlPatients',
      filteredGroupInformation: 'getFilteredGroupInformation'
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
        this.$store.dispatch('patients/' + GET_FILTERED_PATIENTS)
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
  }
</style>
