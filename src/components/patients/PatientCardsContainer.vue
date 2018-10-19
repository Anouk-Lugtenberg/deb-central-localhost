<template>
  <div>
    <div v-if="allIdentifiersPatients.length > 0">
      <patient-cards-paginator :patientIdentifiers="allIdentifiersPatients"></patient-cards-paginator>
    </div>
    <div v-else>
      Loading patients...
    </div>
  </div>
</template>

<script>
import PatientCardsPaginator from './PatientCardsPaginator'
import { mapGetters } from 'vuex'

export default {
  name: 'PatientCardsContainer',
  components: {
    'patient-cards-paginator': PatientCardsPaginator
  },
  computed: {
    ...mapGetters({
      allIdentifiersPatients: 'patients/getAllIdentifiersPatients'
    })
  }
}
</script>

<style scoped>

</style>
