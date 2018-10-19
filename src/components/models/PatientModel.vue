<template>
  <div>
    {{ patients }}
  </div>
</template>

<script>
import FieldTypes from './../field-types/FieldTypes'
import { mapGetters } from 'vuex'
export default {
  name: 'PatientModel',
  props: ['id'],
  components: {
    'field-types': FieldTypes
  },
  created () {
    this.$store.dispatch('patients/GET_PATIENTS_INFORMATION_PATIENT_ID', this.id)
  },
  computed: {
    ...mapGetters({
      metadata: 'getMetadata',
      patients: 'patients/getPatientInformation'
    })
  }
}
</script>

<style scoped>

</style>
