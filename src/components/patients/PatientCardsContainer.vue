<template>
  <div>
    <div v-if="patientsFiltersActive">
      <patient-cards-paginator :patientIdentifiers="filteredIdentifiersPatients" :visibleFields="visibleFields"
                               :filtersActive="true"></patient-cards-paginator>
    </div>
    <div v-else-if="allIdentifiersPatients.length > 0">
      <patient-cards-paginator :patientIdentifiers="allIdentifiersPatients" :visibleFields="visibleFields"
                               :filtersActive="false"></patient-cards-paginator>
    </div>
    <div v-else>
      Loading patients...
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
  computed: {
    ...mapGetters({
      allIdentifiersPatients: 'patients/getAllIdentifiersPatients',
      filteredIdentifiersPatients: 'patients/getFilteredPatientsIdentifiers',
      metadata: 'getMetadata',
      patientsFiltersActive: 'patients/getPatientsFilterActive'
    }),
    /* This is created instead of using the visible fields from the metadata, because otherwise the spots from the metadata fields are
    reserved, and this leaves blank spots on the cards.
     */
    visibleFields: function () {
      let visibleFields = []
      for (let key in this.metadata[PATIENT_TABLE]) {
        if (!this.metadata[PATIENT_TABLE].hasOwnProperty(key)) continue
        if (this.metadata[PATIENT_TABLE][key]['visible'] && this.metadata[PATIENT_TABLE][key]['name'] !== 'ID') {
          visibleFields.push(this.metadata[PATIENT_TABLE][key])
        }
      }
      return visibleFields
    }
  }
}
</script>

<style scoped>

</style>
