<template>
  <b-card header-tag="header" header-bg-variant="light" class="rounded-1 mt-3 item-selector" no-body>
    <span class="title-item-selector card-text text-center">
      Item selector
    </span>
    <span class="text-small pr-2">
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
import SettingsCheckbox from './SettingsCheckbox'
import DataItemSelectorGroup from './DataItemSelectorGroup'

export default {
  name: 'DataItemSelector',
  props: ['table'],
  components: {
    'data-item-selector-group': DataItemSelectorGroup,
    'settings-checkbox': SettingsCheckbox
  },
  computed: {
    ...mapGetters({
      metadata: 'getMetadata'
    }),
    ...mapState({
      mutationTable: 'MUTATION_TABLE'
    })
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
    text-align: right;
  }
</style>
