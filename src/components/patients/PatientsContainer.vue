<template>
  <div>
    <patient-cards-container>
      <router-view></router-view>
    </patient-cards-container>
  </div>
</template>

<script>
import PatientsCardsContainer from './PatientCardsContainer'
import { mapGetters } from 'vuex'

export default {
  name: 'PatientsContainer',
  components: {
    'patient-cards-container': PatientsCardsContainer
  },
  computed: {
    ...mapGetters({
      totalPatients: 'patients/getTotalPatients'
    })
  }
}
</script>

<style scoped>

</style>
