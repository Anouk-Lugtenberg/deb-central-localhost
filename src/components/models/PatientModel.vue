<template>
  <div>
    <b-container class="pt-4">
      <b-row>
        <b-col cols="3">
          <span>Add patients:</span>
          <input type="text" v-model.lazy="newPatient">
          <div v-if="errorPatientNotFound">
            PATIENT NOT FOUND
          </div>
        </b-col>
        <b-col cols="9" v-for="patientIdentifier in identifiers" :key="patientIdentifier">
          <div v-if="patients[patientIdentifier] && Object.keys(metadata).length > 0">
            <patient-card :patientIdentifier="patientIdentifier"
                           :patient="patients[patientIdentifier]"
                           :visibleFields="metadata[patientTable]">
            </patient-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FieldTypes from '../fieldTypes/FieldTypes'
import PatientCard from '../patients/PatientCard'
import { PATIENT_TABLE } from '../../store/actions'
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
      patientTable: PATIENT_TABLE,
      allFieldsVisibleMetadata: []
    }
  },
  created () {
    /* TODO there's a problem on reloading the page when the URI contains a dot. This is a problem with that
     * connect-history-api-fallback (dev-server.js) sees a dot as a file extension. */
    /* TODO on reload, these methods are executed before metadata is loaded -> leads to no information available. */
    this.updateIdentifiers()
  },
  computed: {
    ...mapGetters({
      metadata: 'getMetadataAllFieldsVisible',
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

</style>
