<template>
  <b-card no-body class="mt-2 ml-2 mr-2 mb-1">
    <div @click="toggleCollapse =! toggleCollapse" class="clickable ml-2">
      <span v-if="toggleCollapse">
        <font-awesome-icon icon="caret-down" class="fa-icon"></font-awesome-icon>
      </span>
      <span v-else>
        <font-awesome-icon icon="caret-right" class="fa-icon"></font-awesome-icon>
      </span>
      <span v-if="tableName === mutationTable">Mutations</span>
      <span v-else-if="tableName === patientTable">Patients</span>
    </div>
    <b-collapse v-model="toggleCollapse" id="collapsed">
      <div v-for="property in data" class="settings-checkbox ml-2">
        <settings-checkbox :property="property"></settings-checkbox>
      </div>
    </b-collapse>
  </b-card>
</template>

<script>
import SettingsCheckbox from './SettingsCheckbox'
import { mapState } from 'vuex'
export default {
  name: 'DataItemSelectorGroup',
  components: {SettingsCheckbox},
  props: ['table', 'tableName', 'data'],
  computed: {
    ...mapState({
      mutationTable: 'MUTATION_TABLE',
      patientTable: 'PATIENT_TABLE'
    })
  },
  data () {
    return {
      toggleCollapse: false
    }
  },
  created () {
    if (this.table === this.tableName) {
      this.toggleCollapse = true
    }
  }
}
</script>

<style scoped>
  .settings-checkbox {
    font-size: 14px;
  }
  .clickable {
    cursor: pointer;
  }
</style>
