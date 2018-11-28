<template>
  <div class="container">
    <b-row class="pt-3">
      <div class="col-2">
        <div class="sticky-top">
          <div class="card scrollable">
            <div class="card-body">
              <div v-for="patient in patientsByPublicationIdentifier(id)">
                <a :href="'#' + patient">{{ patient }}</a>
              </div>
            </div>
          </div>
          <a href="#publication">Back to top</a>
        </div>
      </div>
      <b-col cols="10">
        <div v-if="getPublicationInformationByIdentifier(id)" class="pb-2">
          <div class="card shadow" id="publication">
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
              <publication-model-authors :authors="getPublicationInformationByIdentifier(id).Authors"></publication-model-authors>
              <a :href="getPublicationInformationByIdentifier(id).ExternalLink">{{ getPublicationInformationByIdentifier(id).ExternalLink }}</a>
            </div>
          </div>
        </div>
        <div v-for="patient in patientsByPublicationIdentifier(id)">
          <div :id="patient">
            <patient-card :patientIdentifier="patient" :patient="patientByIdentifier(patient)" :visibleFields="visibleFields"></patient-card>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { GET_EXTRA_PUBLICATION_INFORMATION, GET_PATIENTS_FOR_PUBLICATION_IDENTIFIER } from '../../../store/modules/patients/actions'
import { mapGetters, mapState } from 'vuex'
import PatientCard from '../../patients/PatientCard'
import FieldTypePatientID from '../../fieldTypes/FieldTypePatientID'
import PublicationModelAuthors from './PublicationModelAuthors'

export default {
  name: 'PubMedModel',
  props: ['id'],
  components: {
    'publication-model-authors': PublicationModelAuthors,
    'patient-card': PatientCard,
    'field-type-patient-identifier': FieldTypePatientID
  },
  computed: {
    ...mapGetters({
      extraPublicationInformation: 'patients/getExtraPublicationInformation',
      getPublicationInformationByIdentifier: 'patients/getPublicationInformationByIdentifier',
      patientsByPublicationIdentifier: 'patients/getPatientsByPublicationIdentifier',
      patientByIdentifier: 'patients/getPatientsByIdentifier',
      metadata: 'getMetadata'
    }),
    ...mapState({
      publicationsApiPath: 'PUBLICATIONS_API_PATH',
      patientTable: 'PATIENT_TABLE',
      columnPatientIdentifier: 'COLUMN_PATIENT_IDENTIFIER'
    }),
    visibleFields: function () {
      let patientTable = this.patientTable
      let visibleFields = []
      for (let key in this.metadata[patientTable]) {
        if (!this.metadata[patientTable].hasOwnProperty(key)) continue
        if (this.metadata[patientTable][key]['visible'] && this.metadata[patientTable][key]['name'] !== this.columnPatientIdentifier) {
          visibleFields.push(this.metadata[patientTable][key])
        }
      }
      return visibleFields
    }
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
  .scrollable {
    overflow-y: auto;
    height: 500px;
  }
</style>
