<template>
  <div v-if="tabList.length > 0">
    <b-tabs>
      <b-tab v-for="(tab, i) in tabList" @click="current = i" :class="{current:i === current}" :title="tab" :key="i">
        <div v-if="Object.keys(patients).length > 0">
          <div v-if="listAllPatients[tabList[current]]" class="information-mutations">
            <field-type-patient-mutations :listMutationsPerPatient="listAllPatients[tabList[current]]['mutations'] "
                                          :entity="patientTable"></field-type-patient-mutations>
            <div v-for="property in metadata[patientTable]" :key="property.name">
              <div v-if="property.visible">
                <div v-if="property.label === 'Mutations'">
                </div>
                <div v-else>
                  <field-type :property="property"
                              :information="listAllPatients[tabList[current]]['information']"
                              :entity="patientTable">
                  </field-type>
                </div>
              </div>
            </div>
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
import FieldTypes from '../field-types/FieldTypes'
import FieldTypePatientMutations from '../field-types/FieldTypePatientMutations'
import { mapGetters } from 'vuex'
import { PATIENT_TABLE, MUTATION_TABLE } from '../../store/actions'

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
    })
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
