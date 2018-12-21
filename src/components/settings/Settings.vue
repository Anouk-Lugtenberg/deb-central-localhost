<template>
  <div>
    <div class="settings-table-header">
       <span v-if="showTable">
          <font-awesome-icon icon="caret-down" class="fa-icon width-icon"></font-awesome-icon>
        </span>
      <span v-else>
          <font-awesome-icon icon="caret-right" class="fa-icon width-icon"></font-awesome-icon>
        </span>
      <span @click="showTable = !showTable" class="settings-table-header">{{ table }}</span>
      <input type="checkbox" v-model="active" v-on:change="setVisibleCategories()" class="float-right"/>
    </div>
    <b-collapse v-model="showTable" id="collapsed">
      <b-row>
        <b-col sm="12">
          <div v-for="(value, index) in values" :key="index" class="settings-text">
            <div v-if="index % 2 === 0" class="settings-left">
              <settings-checkbox :property="value"></settings-checkbox>
            </div>
            <div v-else class="settings-right">
              <settings-checkbox :property="value"></settings-checkbox>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-collapse>
  </div>
</template>

<script>
import SettingsCheckbox from './SettingsCheckbox'
import { mapState } from 'vuex'

export default {
  name: 'Settings',
  components: {
    'settings-checkbox': SettingsCheckbox
  },
  props: {
    values: Array,
    table: String
  },
  data () {
    return {
      showTable: true,
      active: false
    }
  },
  computed: {
    ...mapState({
      metadata: 'metadata'
    })
  },
  methods: {
    setVisibleCategories () {
      Object.keys(this.metadata[this.table]).map((key) => {
        this.metadata[this.table][key].fieldIsVisible = this.active
      })
    }
  }
}
</script>

<style scoped>
  .settings-text {
    text-align: left;
  }
  .settings-left {
    float: left;
    width: 50%;
    box-sizing: border-box;
  }
  .settings-right {
    float: left;
    width: 50%;
    box-sizing: border-box;
  }
  .settings-table-header {
    background-color: #2b7eb4;
    margin-top: 5px;
    color: white;
    padding: 3px;
  }
  .settings-text {
    background-color: #ededed;
    color: black;
  }
  .width-icon {
    display: inline-block;
    width: 10px;
  }
</style>
