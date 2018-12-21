<template>
  <div>
    <div v-if="metadata[patientTable]">
      <div v-if="$route.query.q">
        <patient-cards-paginator :patientIdentifiers="filteredIdentifiersPatients"
                                 :visibleFields="getVisibleFieldsMetadata(patientTable)"
                                 :filtered="true"></patient-cards-paginator>
      </div>
      <div v-else>
        <patient-cards-paginator :patientIdentifiers="allIdentifiersPatients"
                                 :visibleFields="getVisibleFieldsMetadata(patientTable)"></patient-cards-paginator>
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
      getVisibleFieldsMetadata: 'getVisibleFieldsMetadata'
    }),
    ...mapState({
      metadata: 'metadata',
      patientTable: 'PATIENT_TABLE'
    })
  }
}
</script>
