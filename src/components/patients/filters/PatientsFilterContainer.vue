<template>
  <b-card header-tag="header" header-bg-variant="light" class="rounded-1" no-body>
    <div slot="header" class="text-center">
      <span class="title-filters">
        Filters
      </span>
    </div>
    <patients-string-filter :rsqlQuery="rsqlQuery"></patients-string-filter>
    <checkbox-filters :table="patientTable"></checkbox-filters>
  </b-card>
</template>

<script>
import PatientsStringFilter from './PatientsStringFilter'
import CheckboxFilters from './../../filters/CheckboxFilters'
import { mapGetters } from 'vuex'
import { GET_FILTERED_PATIENTS } from '../../../store/modules/patients/actions'
import { SET_SEARCH_PATIENTS } from '../../../store/modules/patients/mutations'
import { PATIENT_TABLE } from '../../../store/config'

export default {
  name: 'PatientsFilterContainer',
  props: ['pageNumber'],
  data () {
    return {
      rsqlQuery: '',
      patientTable: PATIENT_TABLE
    }
  },
  components: {
    'patients-string-filter': PatientsStringFilter,
    'checkbox-filters': CheckboxFilters
  },
  computed: {
    ...mapGetters({
      rsql: 'patients/rsqlPatients'
    })
  },
  /* Checks if search query is available in URL on creation, if yes -> use this Query to filter patients */
  created () {
    if (typeof this.$route.query.q !== 'undefined') {
      let URLrsql = this.$route.query.q
      this.rsqlQuery = URLrsql.split('=').pop()
      this.getPatientIdentifiers(URLrsql)
      /* Resets the filters if there's no query available in the URL */
    } else {
      this.$store.commit('patients/' + SET_SEARCH_PATIENTS, '')
    }
  },
  watch: {
    pageNumber () {
      this.createRoute()
    },
    rsql () {
      this.rsqlQuery = this.rsql
      this.createRoute()
      this.getPatientIdentifiers(this.rsql)
    }
  },
  methods: {
    getPatientIdentifiers (rsql) {
      this.$store.dispatch('patients/' + GET_FILTERED_PATIENTS, rsql)
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
        name: 'PatientsContainer',
        params: {
          pageNumURL: this.pageNumber
        },
        query: {q: this.rsql}
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
