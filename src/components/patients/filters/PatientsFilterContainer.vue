<template>
  <b-card header-tag="header" header-bg-variant="light" class="rounded-1" no-body>
    <div slot="header" class="text-center">
      <span class="title-filters">
        Filters
      </span>
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
import { mapGetters } from 'vuex'
import { GET_FILTERED_PATIENTS } from '../../../store/modules/patients/actions'
import { PATIENT_TABLE } from '../../../store/config'

export default {
  name: 'PatientsFilterContainer',
  props: ['pageNumber'],
  data () {
    return {
      patientTable: PATIENT_TABLE
    }
  },
  components: {
    'patients-string-filter': PatientsStringFilter,
    'checkbox-filter-group': CheckboxFilterGroup
  },
  computed: {
    ...mapGetters({
      rsqlQueryFromFilters: 'patients/rsqlPatients',
      activeFilters: 'patients/getActiveFiltersCheckbox',
      patientsFiltersActive: 'patients/getPatientsFilterActive',
      filteredGroupInformation: 'getFilteredGroupInformation',
      stringSearch: 'patients/getStringSearch'
    })
  },
  /* Checks if search query is available in URL on creation, if yes -> use this Query to filter patients */
  created () {
    this.$store.dispatch('patients/' + GET_FILTERED_PATIENTS)
  },
  watch: {
    activeFilters () {
      this.createRoute()
    },
    stringSearch () {
      this.createRoute()
    },
    '$route.query.q' () {
      this.$store.dispatch('patients/' + GET_FILTERED_PATIENTS)
    }
  },
  methods: {
    createRoute () {
      if (this.rsqlQueryFromFilters.length > 0) {
        this.createRouteWithQuery()
      } else {
        this.createRouteWithoutQuery()
      }
      this.$store.dispatch('patients/' + GET_FILTERED_PATIENTS)
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
