<template>
  <b-card header-tag="header" header-bg-variant="light" class="rounded-1 mt-3 item-selector" no-body>
    <span class="title-item-selector card-text text-center">
      Item selector
    </span>
    <div v-if="table === mutationTable" class="text-small pl-2 pt-1">
      <toggle-button :value="false" color="#2196F3" :labels="true" v-model="compactView">
      </toggle-button>
      Compact
    </div>
    <span class="text-small pl-2">
      <a href="#" @click="selectAll()">Select all</a>
      <a href="#" @click="deselectAll()">Deselect all</a>
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
import { mapGetters, mapState } from 'vuex'
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
  data () {
    return {
      compactView: false
    }
  },
  computed: {
    ...mapGetters({
      metadata: 'getMetadata'
    }),
    ...mapState({
      mutationTable: 'MUTATION_TABLE'
    })
  },
  watch: {
    compactView () {
      console.log('compact view changed: ' + this.compactView)
      this.$store.commit('mutation/' + SET_BOOLEAN_COMPACT_VIEW_MUTATIONS, this.compactView)
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
  .text-small {
    font-size: 14px;
    text-align: left;
  }
</style>
