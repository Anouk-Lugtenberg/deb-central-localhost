<template>
  <div>
    <b-row class="top-row-container">
      <b-col sm="3">
      </b-col>
      <b-col sm="9">
    <b-pagination-nav :use-router="true" size="md" :link-gen="linkGenerator" align="center"
                      :number-of-pages="totalPages" v-model="currentPage">
    </b-pagination-nav>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="3">
        <div v-if="filteredGroupInformation.hasOwnProperty(patientTable)">
          <div v-if="Object.keys(filteredGroupInformation[patientTable]).length === visibleFiltersPatients.length">
            <patients-filter-container :pageNumber="currentPage"></patients-filter-container>
          </div>
        </div>
      </b-col>
      <b-col sm="9">
        <div v-if="filtersActive">
        </div>
        <div v-if="patientIdentifiers.length > 0">
          <div v-for="identifier in patientIdentifiers.slice(pageSize * (currentPage-1), pageSize * currentPage)" :key="identifier">
            <patient-card :patientIdentifier="identifier" :patient="patients[identifier]" :visibleFields="visibleFields"></patient-card>
          </div>
        </div>
        <div v-else>
          <b-card class="no-patients-found">
            No patients found with these filters
          </b-card>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="3">
      </b-col>
      <b-col sm="9">
        <b-pagination-nav :use-router="true" size="md" :link-gen="linkGenerator" align="center"
                          :number-of-pages="totalPages" v-model="currentPage">
        </b-pagination-nav>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PatientCard from './PatientCard'
import PatientsFilterContainer from './filters/PatientsFilterContainer'
import { GET_FILTERED_GROUP_INFORMATION } from '../../store/actions'
import { PATIENT_TABLE, VISIBLE_FILTERS } from '../../store/config'

export default {
  name: 'PatientCardsPaginator',
  props: ['patientIdentifiers', 'visibleFields', 'filtersActive'],
  components: {
    'patient-card': PatientCard,
    'patients-filter-container': PatientsFilterContainer
  },
  data () {
    return {
      totalPages: Math.ceil(this.patientIdentifiers.length / 20),
      currentPage: 1,
      pageSize: 20,
      patientTable: PATIENT_TABLE,
      visibleFiltersPatients: VISIBLE_FILTERS[PATIENT_TABLE]
    }
  },
  computed: {
    ...mapGetters({
      patients: 'patients/getPatients',
      filteredGroupInformation: 'getFilteredGroupInformation'
    })
  },
  watch: {
    '$route.params.pageNumURL': function () {
      if (!this.$route.params.pageNumURL) {
        this.$route.params.pageNumURL = 1
      }
      this.validatePageNum(this.$route.params.pageNumURL)
      this.currentPage = parseInt(this.$route.params.pageNumURL)
    },
    patientIdentifiers () {
      this.totalPages = Math.ceil(this.patientIdentifiers.length / 20)
    }
  },
  created () {
    if (typeof this.$route.params.pageNumURL !== 'undefined') {
      this.currentPage = parseInt(this.$route.params.pageNumURL)
    }
    /* Filtered group information is only set on first load, so it doesn't get overwritten */
    if (typeof this.filteredGroupInformation[this.patientTable] === 'undefined') {
      this.$store.dispatch(GET_FILTERED_GROUP_INFORMATION, this.patientTable)
    }
  },
  methods: {
    linkGenerator (pageNum) {
      if (typeof this.$route.query.q !== 'undefined') {
        return {
          name: 'PatientsContainer',
          params: {
            pageNumURL: pageNum
          },
          query: {q: this.$route.query.q}
        }
      } else {
        return {
          path: '/Patients/page/' + pageNum
        }
      }
    },
    validatePageNum (pageNum) {
      if (this.totalPages > 0) {
        if (pageNum > this.totalPages) {
          this.$router.push('/Patients/page/1')
          this.$router.push('/404')
        }
      }
    }
  }
}
</script>

<style scoped>
.top-row-container {
  margin-top: 1rem;
}
.no-patients-found {
  color: #dc3545;
  text-align: center;
}
</style>
