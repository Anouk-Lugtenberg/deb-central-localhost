<template>
  <div>
    <b-container class="pt-4">
      <b-row>
        <b-col sm="3">
          <span>Add patients:</span>
          <input type="text" v-model.lazy="newPatient">
          <div v-if="errorPatientNotFound" class="patient-not-found">
            Patient not found
          </div>
        </b-col>
        <b-col sm="9">
          <div v-for="patientIdentifier in identifiers" :key="patientIdentifier">
            <div v-if="patients[patientIdentifier] && Object.keys(metadataAllFieldsVisible).length > 0">
              <patient-card :patientIdentifier="patientIdentifier"
                             :patient="patients[patientIdentifier]"
                             :visibleFields="metadataAllFieldsVisible[patientTable]">
              </patient-card>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FieldTypes from '../fieldTypes/FieldTypes'
import PatientCard from '../patients/PatientCard'
import { PATIENT_TABLE } from '../../store/config'
import { mapGetters } from 'vuex'

export default {
  name: 'PatientModel',
  props: ['id'],
  components: {
    'field-types': FieldTypes,
    'patient-card': PatientCard
  },
  data () {
    return {
      identifiers: [],
      newPatient: '',
      errorPatientNotFound: false,
      patientTable: PATIENT_TABLE
    }
  },
  created () {
    this.updateIdentifiers()
  },
  computed: {
    ...mapGetters({
      metadataAllFieldsVisible: 'getMetadataAllFieldsVisible',
      patients: 'patients/getPatients'
    })
  },
  watch: {
    newPatient: function () {
      if (this.patients[this.newPatient]) {
        this.errorPatientNotFound = false
        this.identifiers.push(this.newPatient)
        this.createNewRoute()
      } else {
        this.errorPatientNotFound = true
      }
    },
    id: function () {
      this.updateIdentifiers()
    }
  },
  methods: {
    createNewRoute () {
      let stringIdentifiers = this.identifiers.join('&')
      this.$router.push('/Patient/' + stringIdentifiers)
    },
    updateIdentifiers () {
      this.identifiers = []
      if (this.id.substring('&')) {
        let identifiers = this.id.split('&')
        for (let item in identifiers) {
          this.identifiers.push(identifiers[item])
        }
      } else {
        this.identifiers = this.id
      }
    }
  }
}
</script>

<style scoped>
.patient-not-found {
  color: #dc3545;
}
</style>
