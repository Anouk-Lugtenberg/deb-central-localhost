<template>
   <span>
      <router-link :to="{name: 'Patient', params: {id: patientIdentifier, patient: patient}}">
        <font-awesome-icon icon="search" class="fa-icon"></font-awesome-icon>
        {{ patientIdentifier }}
      </router-link>
    </span>
</template>

<script>
export default {
  name: 'FieldTypePatientID',
  props: ['patient', 'patientIdentifier']
}
</script>

<style scoped>
  .fa-icon {
    border-radius: 5px;
    padding: 2px;
    background-color: #2a97be;
    color: white;
    font-size: 22px;
  }
  .fa-icon:hover {
    cursor: pointer;
    background-color: #1380b5;
  }
</style>
