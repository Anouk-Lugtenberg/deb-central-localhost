<template>
  <b-card header-tag="header" header-bg-variant="light" class="rounded-1 mt-3 item-selector" no-body>
    <span class="title-item-selector card-text text-center">
      Item selector
    </span>
    <b-card v-if="table === mutationTable" no-body class="m-2">
      <b-row class="small-text mt-2">
        <b-col cols="3" class="ml-2">
          <toggle-button :value="false" color="#3e81b5" :labels="true" v-model="stateCompactView">
          </toggle-button>
        </b-col>
        <b-col cols="8">
          Compact view
        </b-col>
      </b-row>
    </b-card>
    <span class="small-text pr-3 align-right">
      <a href="#!" @click="selectAll()">Select all</a>
      <a href="#!" @click="deselectAll()">Deselect all</a>
    </span>
    <div v-if="table === mutationTable">
      <div v-for="(data, tableName) in metadata">
        <data-item-selector-group :table="table" :tableName="tableName" :data="data"></data-item-selector-group>
      </div>
    </div>
    <div v-else>
      <data-item-selector-group :table="table" :tableName="table" :data="metadata[table]"></data-item-selector-group>
    </div>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'
import { SET_BOOLEAN_COMPACT_VIEW_MUTATIONS } from '../../store/modules/mutation/mutations'
import SettingsCheckbox from './SettingsCheckbox'
import DataItemSelectorGroup from './DataItemSelectorGroup'
import ToggleButton from 'vue-js-toggle-button/src/Button'

export default {
  name: 'DataItemSelector',
  props: ['table'],
  components: {
    'data-item-selector-group': DataItemSelectorGroup,
    'settings-checkbox': SettingsCheckbox,
    'toggle-button': ToggleButton
  },
  computed: {
    ...mapState({
      metadata: 'metadata',
      mutationTable: 'MUTATION_TABLE'
    }),
    stateCompactView: {
      get () { return this.$store.state.mutation.isCompactViewMutations },
      set (value) { this.$store.commit('mutation/' + SET_BOOLEAN_COMPACT_VIEW_MUTATIONS, value) }
    }
  },
  methods: {
    selectAll () {
      this.setVisibleFields(true)
    },
    deselectAll () {
      this.setVisibleFields(false)
    },
    setVisibleFields (booleanVisible) {
      Object.keys(this.metadata).map((key) => {
        let metadataPerTable = this.metadata[key]
        Object.keys(metadataPerTable).map((meta) => {
          metadataPerTable[meta].fieldIsVisible = booleanVisible
        })
      })
    }
  }
}
</script>

<style scoped>
  .title-item-selector {
    font-size: 20px;
    font-weight: bold;
    color: #4497be;
    background-color: #dee6ed;
  }
  .item-selector {
    background-color: #fafafa;
  }
  .small-text {
    font-size: 14px;
  }
  .align-right {
    text-align: right;
  }
</style>
