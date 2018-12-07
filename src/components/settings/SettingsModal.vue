<template>
  <div>
      <b-modal id="settingsModal"
               ref="settingsModal"
               v-model="modalVisible">
        <div slot="modal-title">
          Item selector
        </div>
        <b-container fluid>
          <b-row>
            <b-col sm="12">
              <b-button-group size="sm" class="align-right">
                <b-button @click="selectAll" variant="outline-primary">Select all</b-button>
                <b-button @click="deselectAll" variant="outline-primary">Deselect all</b-button>
              </b-button-group>
            </b-col>
          </b-row>
          <div v-for="(value, table) in metadata" :key="table">
            <settings :values="value" :table="table"></settings>
          </div>
        </b-container>
        <div slot="modal-footer" class="w-100">
          <b-btn size="m" class="float-right" variant="primary" @click="hideModal">
            Close
          </b-btn>
        </div>
      </b-modal>
  </div>
</template>

<script>
import Settings from './Settings'
import { mapGetters } from 'vuex'

export default {
  name: 'SettingsModal',
  components: {
    'settings': Settings
  },
  props: ['showModal'],
  computed: {
    ...mapGetters({
      metadata: 'getMetadata'
    })
  },
  data () {
    return {
      modalVisible: false
    }
  },
  watch: {
    showModal: function () {
      this.modalVisible = this.showModal
    },
    modalVisible: function () {
      this.$emit('setVisibility', this.modalVisible)
    }
  },
  methods: {
    hideModal () {
      this.$refs.settingsModal.hide()
    },
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
.align-right {
  float: right;
}
</style>
