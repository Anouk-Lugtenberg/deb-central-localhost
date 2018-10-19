<template>
  <div>
    <b-container>
      <patient-cards-container>
        <router-view></router-view>
      </patient-cards-container>
    </b-container>
  </div>
</template>

<script>
import PatientsCardsContainer from './PatientCardsContainer'
import { GET_ALL_PATIENTS } from './../../store/modules/patients/actions'
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
  },
  created () {
    if (Object.keys(this.$store.state.patients.patients).length === 0) {
      this.$store.dispatch('patients/' + GET_ALL_PATIENTS)
    }
  }
}
</script>

<style scoped>

</style>
