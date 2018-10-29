<template>
   <span>
      <router-link :to="{name: 'Patient', params: {id: patientIdentifier, patient: patient}}">{{ patientIdentifier }}</router-link>
    </span>
</template>

<script>
export default {
  name: 'FieldTypePatientID',
  props: ['patient', 'patientIdentifier']
}
</script>

<style scoped>

</style>
