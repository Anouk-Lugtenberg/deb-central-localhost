<template>
  <b-card class="mt-2 ml-1 mr-1 mb-1">
    <div @click="toggleCollapse =! toggleCollapse" class="clickable">
        <span v-if="toggleCollapse">
          <font-awesome-icon icon="caret-down" class="fa-icon"></font-awesome-icon>
        </span>
        <span v-else>
          <font-awesome-icon icon="caret-right" class="fa-icon"></font-awesome-icon>
        </span>
      {{ tableName }}
    </div>
    <b-collapse v-model="toggleCollapse" id="collapsed">
      <div v-for="property in data" class="settings-checkbox">
        <settings-checkbox :property="property"></settings-checkbox>
      </div>
    </b-collapse>
  </b-card>
</template>

<script>
import SettingsCheckbox from './SettingsCheckbox'
export default {
  name: 'DataItemSelectorGroup',
  components: {SettingsCheckbox},
  props: ['table', 'tableName', 'data'],
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
</style>
