<template>
  <div>
    <div v-if="filteredIdentifiersPatients.length > 0">
      <patient-cards-paginator :patientIdentifiers="filteredIdentifiersPatients" :visibleFields="visibleFields"></patient-cards-paginator>
    </div>
    <div v-else-if="allIdentifiersPatients.length > 0">
      <patient-cards-paginator :patientIdentifiers="allIdentifiersPatients" :visibleFields="visibleFields"></patient-cards-paginator>
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
      metadata: 'getMetadata'
    }),
    visibleFields: function () {
      // let patientTable = PATIENT_TABLE
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
