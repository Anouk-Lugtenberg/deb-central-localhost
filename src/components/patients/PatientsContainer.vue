<template>
  <patient-cards-container>
    <router-view></router-view>
  </patient-cards-container>
</template>

<script>
import PatientsCardsContainer from './PatientCardsContainer'

export default {
  name: 'PatientsContainer',
  components: {
    'patient-cards-container': PatientsCardsContainer
  }
}
</script>
