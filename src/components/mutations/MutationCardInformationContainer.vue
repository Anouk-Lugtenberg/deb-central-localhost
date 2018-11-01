<template>
  <div v-if="tabList.length > 0">
    <b-tabs>
      <b-tab v-for="(patient, i) in tabList" @click="current = i" :class="{current:i === current}" :title="patient" :key="i">
        <div v-if="Object.keys(patients).length > 0">
          <div v-if="listAllPatients[tabList[current]]" class="information-mutations pt-1">
            <field-type-patient-mutations :listMutationsPerPatient="listAllPatients[tabList[current]]['mutations'] "
                                          :entity="patientTable"></field-type-patient-mutations>
            <router-link :to="{name: 'Patient', params: {id: patient}}">
              Show details for {{ patient }}
            </router-link>
            <b-row>
              <b-col cols="6" v-for="property in visibleFields" :key="property.name">
                <field-type :property="property"
                            :information="listAllPatients[tabList[current]]['information']"
                            :entity="patientTable">
                </field-type>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
  <div v-else class="information-mutations no-patients-found">
    No patients found with this mutation
  </div>

</template>

<script>
import FieldTypes from '../fieldTypes/FieldTypes'
import FieldTypePatientMutations from '../fieldTypes/FieldTypePatientMutations'
import { mapGetters } from 'vuex'
import { PATIENT_TABLE, MUTATION_TABLE } from '../../store/config'

export default {
  name: 'MutationCardInformationContainer',
  props: ['mutationIdentifier', 'patients'],
  components: {
    'field-type': FieldTypes,
    'field-type-patient-mutations': FieldTypePatientMutations
  },
  data: function () {
    return {
      tabList: [],
      current: 0,
      patientTable: PATIENT_TABLE,
      mutationTable: MUTATION_TABLE,
      mutationsPerPatient: []
    }
  },
  created () {
    this.patients.forEach((patient) => {
      this.tabList.push(patient)
    })
  },
  computed: {
    ...mapGetters({
      metadata: 'getMetadata',
      patientInformation: 'patients/getPatientInformation',
      listAllPatients: 'patients/getPatients'
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
.information-mutations {
  background-color: #f6f8fa;
  padding-left: 10px;
  padding-right: 10px;
}
.no-patients-found {
  background-color: white;
  color: #dc3545;
}
</style>
