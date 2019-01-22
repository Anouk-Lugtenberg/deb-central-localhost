<template>
  <div v-if="tabList.length > 0">
    <div v-if="tabList.length > 1">
      <div class="small-text mt-2 ml-2">
          <toggle-button :value="false" color="#3e81b5" :labels="true" v-model="allPatientsVisible">
          </toggle-button>
          Show patients in list
      </div>
    </div>
    <div v-if="!allPatientsVisible">
      <b-tabs>
        <b-tab v-for="(patient, i) in tabList" @click="current = i" :class="{current:i === current}" :title="patient" :key="i">
          <div v-if="Object.keys(patients).length > 0">
            <div v-if="listAllPatients[tabList[current]]" class="information-mutations-grey pt-1">
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
    <div v-if="allPatientsVisible">
      <div v-for="(patient, i) in tabList">
        <div :class="{'information-mutations-grey': i % 2 === 0, 'information-mutations-white': i % 2 !== 0}">
          <div class="title-patient">
            <field-type-patient-id :patient="listAllPatients[patient]" :patientIdentifier="patient"></field-type-patient-id>
          </div>
          <field-type-patient-mutations :listMutationsPerPatient="listAllPatients[patient]['mutations'] "
                                        :entity="patientTable"></field-type-patient-mutations>
          <b-row>
            <b-col cols="6" v-for="property in visibleFields" :key="property.name">
              <field-type :property="property"
                          :information="listAllPatients[patient]['information']"
                          :entity="patientTable">
              </field-type>
            </b-col>
          </b-row>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import FieldTypes from '../fieldTypes/FieldTypes'
import FieldTypePatientMutations from '../fieldTypes/FieldTypePatientMutations'
import FieldTypePatientID from '../fieldTypes/FieldTypePatientID'
import { mapState } from 'vuex'
import ToggleButton from 'vue-js-toggle-button/src/Button'

export default {
  name: 'MutationCardInformationContainer',
  props: ['mutationIdentifier', 'patients'],
  components: {
    'field-type': FieldTypes,
    'field-type-patient-mutations': FieldTypePatientMutations,
    'field-type-patient-id': FieldTypePatientID,
    'toggle-button': ToggleButton
  },
  data: function () {
    return {
      tabList: [],
      current: 0,
      mutationsPerPatient: [],
      allPatientsVisible: false
    }
  },
  created () {
    this.patients.forEach((patient) => {
      this.tabList.push(patient)
    })
  },
  computed: {
    ...mapState({
      metadata: 'metadata',
      listAllPatients: state => state.patients.patients,
      mutationTable: 'MUTATION_TABLE',
      patientTable: 'PATIENT_TABLE'
    }),
    visibleFields: function () {
      let patientTable = this.patientTable
      let visibleFields = []
      for (let key in this.metadata[patientTable]) {
        if (!this.metadata[patientTable].hasOwnProperty(key)) continue
        if (this.metadata[patientTable][key]['fieldIsVisible'] && this.metadata[patientTable][key]['name'] !== 'ID') {
          visibleFields.push(this.metadata[patientTable][key])
        }
      }
      return visibleFields
    }
  }
}
</script>

<style scoped>
.information-mutations-grey {
  background-color: #f6f8fa;
  padding-left: 15px;
  padding-right: 10px;
  padding-top: 5px;
}
.information-mutations-white {
  background-color: white;
  padding-left: 15px;
  padding-right: 10px;
  padding-top: 5px;
}
.title-patient {
  font-size: 18px;
  font-weight: bold;
}
  .small-text {
    font-size: 14px;
  }
</style>
