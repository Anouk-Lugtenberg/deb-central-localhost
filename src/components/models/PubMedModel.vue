<template>
  <div>
    <b-row class="ml-4 pt-3 mr-4">
      <b-col cols="7">
        <div v-if="getPublicationInformationByIdentifier(id)">
          <div class="card shadow">
            <div class="card-body">
              <h5 class="card-title">
                {{ getPublicationInformationByIdentifier(id).Title }}
              </h5>
              <h6 class="year text-muted">
                {{ getPublicationInformationByIdentifier(id).Journal }} - {{ getPublicationInformationByIdentifier(id).Year }}
              </h6>
              <p class="card-text">
                {{ getPublicationInformationByIdentifier(id).abstractText }}
              </p>
              <a :href="getPublicationInformationByIdentifier(id).ExternalLink">{{ getPublicationInformationByIdentifier(id).ExternalLink }}</a>
            </div>
          </div>
        </div>
      </b-col>
      <b-col  cols="5">
        <div class="card shadow">
          <div class="card-body">
            <div v-for="patient in patientsByPublicationIdentifier(id)">
              <field-type-patient-identifier :patientIdentifier="patient" :patient="patientByIdentifier(patient)"></field-type-patient-identifier>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { GET_EXTRA_PUBLICATION_INFORMATION, GET_PATIENTS_FOR_PUBLICATION_IDENTIFIER } from '../../store/modules/patients/actions'
import { mapGetters, mapState } from 'vuex'
import PatientCard from './../patients/PatientCard'
import FieldTypePatientID from './../fieldTypes/FieldTypePatientID'
export default {
  name: 'PubMedModel',
  props: ['id'],
  components: {
    'patient-card': PatientCard,
    'field-type-patient-identifier': FieldTypePatientID
  },
  computed: {
    ...mapGetters({
      extraPublicationInformation: 'patients/getExtraPublicationInformation',
      getPublicationInformationByIdentifier: 'patients/getPublicationInformationByIdentifier',
      patientsByPublicationIdentifier: 'patients/getPatientsByPublicationIdentifier',
      patientByIdentifier: 'patients/getPatientsByIdentifier'
    }),
    ...mapState({
      publicationsApiPath: 'PUBLICATIONS_API_PATH'
    })
  },
  created () {
    if (!this.extraPublicationInformation.hasOwnProperty(this.id)) {
      this.$store.dispatch('patients/' + GET_EXTRA_PUBLICATION_INFORMATION, this.publicationsApiPath + this.id)
    }
    if (!this.patientsByPublicationIdentifier.hasOwnProperty(this.id)) {
      this.$store.dispatch('patients/' + GET_PATIENTS_FOR_PUBLICATION_IDENTIFIER, this.id)
    }
  }
}
</script>

<style scoped>
  .year {
    font-weight: bold;
  }
</style>
