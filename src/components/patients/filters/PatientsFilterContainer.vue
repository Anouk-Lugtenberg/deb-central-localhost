<template>
  <div>
    <patients-string-filter></patients-string-filter>
  </div>
</template>

<script>
import PatientsStringFilter from './PatientsStringFilter'
import { mapGetters } from 'vuex'
import { GET_FILTERED_PATIENTS } from '../../../store/modules/patients/actions'
import { SET_SEARCH } from '../../../store/mutations'

export default {
  name: 'PatientsFilterContainer',
  props: ['pageNumber'],
  components: {
    'patients-string-filter': PatientsStringFilter
  },
  computed: {
    ...mapGetters(['rsql'])
  },
  /* Checks if search query is available in URL on creation, if yes -> use this Query to filter patients */
  created () {
    if (typeof this.$route.query.q !== 'undefined') {
      let URLrsql = this.$route.query.q
      this.getPatientIdentifiers(URLrsql)
    } else {
      /* Resets filtered identifiers when switched between patients - mutations via menu */
      this.getPatientIdentifiers('')
      this.$store.commit(SET_SEARCH, '')
    }
  },
  watch: {
    pageNumber () {
      this.createRoute()
    },
    rsql () {
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
</style>
