<template>
  <b-card v-if="patient" header-tag="header" header-bg-variant="light" no-body class="shadow rounded card mb-2">
    <div class="card-text">
      <b-container bg-variant="white">
        <div class="title-patient">
          <field-type-patient-id :patient="patient" :patientIdentifier="patientIdentifier">{{ patientIdentifier }}</field-type-patient-id>
        </div>
        <field-type-patient-mutations :listMutationsPerPatient="patient['mutations']"></field-type-patient-mutations>
        <b-row>
          <b-col cols="6" class="extra-information-patient" v-for="property in visibleFields" :key="property.name">
            <div v-if="property.visible">
              <field-types :property="property" :information="patient['information']"></field-types>
            </div>
          </b-col>
        </b-row>
     </b-container>
    </div>
  </b-card>
</template>

<script>
import FieldTypes from '../fieldTypes/FieldTypes'
import FieldTypePatientID from '../fieldTypes/FieldTypePatientID'
import FieldTypePatientMutations from '../fieldTypes/FieldTypePatientMutations'
import { mapGetters } from 'vuex'

export default {
  name: 'PatientCard',
  props: ['patientIdentifier', 'patient', 'visibleFields'],
  components: {
    'field-types': FieldTypes,
    'field-type-patient-id': FieldTypePatientID,
    'field-type-patient-mutations': FieldTypePatientMutations
  },
  computed: {
    ...mapGetters({
      metadata: 'getMetadata'
    })
  }
}
</script>

<style scoped>
  .card {
    background-color: white;
  }
  .title-patient {
    font-size: 20px;
    font-weight: bold;
  }
  .card-text {
    background: white;
  }
</style>
