<template>
  <div>
    <div v-if="metadata[patientTable]">
      <div v-if="$route.query.q">
        <patient-cards-paginator :patientIdentifiers="filteredIdentifiersPatients"
                                 :visibleFields="visibleFields"
                                 :filtered="true"></patient-cards-paginator>
      </div>
      <div v-else>
        <patient-cards-paginator :patientIdentifiers="allIdentifiersPatients"
                                 :visibleFields="visibleFields"></patient-cards-paginator>
      </div>
    </div>
  </div>
</template>

<script>
import PatientCardsPaginator from './PatientCardsPaginator'
import { PATIENT_TABLE } from '../../store/config'
import { mapGetters } from 'vuex'

export default {
  name: 'PatientCardsContainer',
  components: {
    'patient-cards-paginator': PatientCardsPaginator
  },
  data () {
    return {
      patientTable: PATIENT_TABLE
    }
  },
  computed: {
    ...mapGetters({
      allIdentifiersPatients: 'patients/getAllIdentifiersPatients',
      filteredIdentifiersPatients: 'patients/getFilteredPatientsIdentifiers',
      metadata: 'getMetadata'
    }),
    /* This is created instead of using the visible fields from the metadata, because otherwise the spots from the metadata fields are
    reserved, and this leaves blank spots on the cards.
     */
    visibleFields: function () {
      let patientTable = this.patientTable
      let visibleFields = []
      for (let key in this.metadata[patientTable]) {
        if (!this.metadata[patientTable].hasOwnProperty(key)) continue
        if (this.metadata[patientTable][key]['visible'] && this.metadata[patientTable][key]['name'] !== 'ID') {
          visibleFields.push(this.metadata[patientTable][key])
        }
      }
      return visibleFields
    }
  }
}
</script>

<style scoped>

</style>
