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
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'PatientCardsContainer',
  components: {
    'patient-cards-paginator': PatientCardsPaginator
  },
  computed: {
    ...mapGetters({
      allIdentifiersPatients: 'patients/getAllIdentifiersPatients',
      filteredIdentifiersPatients: 'patients/getFilteredPatientsIdentifiers',
      metadata: 'getMetadata'
    }),
    ...mapState({
      patientTable: 'PATIENT_TABLE',
      columnPatientIdentifier: 'COLUMN_PATIENT_IDENTIFIER'
    }),
    /* This is created instead of using the visible fields from the metadata, because otherwise the spots from the metadata fields are
    reserved, and this leaves blank spots on the cards.
     */
    visibleFields: function () {
      let patientTable = this.patientTable
      let visibleFields = []
      for (let key in this.metadata[patientTable]) {
        if (!this.metadata[patientTable].hasOwnProperty(key)) continue
        if (this.metadata[patientTable][key]['fieldIsVisible'] && this.metadata[patientTable][key]['name'] !== this.columnPatientIdentifier) {
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
