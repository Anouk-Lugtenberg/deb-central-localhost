<template>
  <b-card header-tag="header" header-bg-variant="light" no-body class="shadow rounded card mb-2">
    <div slot="header">
    <span>
      <span class="title-patient">
        <field-type-patient-id :patient="patient" :patientIdentifier="patientIdentifier">{{ patientIdentifier }}</field-type-patient-id>
      </span>
    </span>
    </div>
    <div class="card-text">
      <b-container bg-variant="white">
      <field-type-patient-mutations :listMutationsPerPatient="patient['mutations']" :entity="mutationTable"></field-type-patient-mutations>
        <b-row>
          <b-col cols="6" class="extra-information-patient" v-for="property in visibleFields" :key="property.name">
            <div v-if="property.visible">
              <field-types :property="property" :information="patient['information']" :entity="patientTable"></field-types>
            </div>
          </b-col>
        </b-row>
     </b-container>
    </div>
  </b-card>
</template>

<script>
import FieldTypes from './../field-types/FieldTypes'
import FieldTypePatientID from './../field-types/FieldTypePatientID'
import FieldTypePatientMutations from './../field-types/FieldTypePatientMutations'
import { mapGetters } from 'vuex'
import { PATIENT_TABLE, MUTATION_TABLE } from '../../store/actions'

export default {
  name: 'PatientCard',
  props: ['patientIdentifier', 'patient'],
  components: {
    'field-types': FieldTypes,
    'field-type-patient-id': FieldTypePatientID,
    'field-type-patient-mutations': FieldTypePatientMutations
  },
  data () {
    return {
      patientTable: PATIENT_TABLE,
      mutationTable: MUTATION_TABLE
    }
  },
  computed: {
    ...mapGetters({
      metadata: 'getMetadata'
    }),
    visibleFields: function () {
      let patientTable = this.patientTable
      let visibleFields = []
      for (let key in this.metadata[patientTable]) {
        if (!this.metadata[patientTable].hasOwnProperty(key)) continue
        if (this.metadata[patientTable][key]['visible'] && this.metadata[patientTable][key]['name'] !== 'ID') {
          visibleFields.push(this.metadata[patientTable][key])
        }
      }
      return visibleFields
    }
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
