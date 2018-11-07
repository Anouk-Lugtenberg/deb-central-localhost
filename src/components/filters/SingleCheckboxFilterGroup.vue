<template>
  <div>
    <input type="checkbox" v-model="singleCheckboxInformation.activeFilter" :id="singleCheckboxInformation.name">
    <span class="small-font">
      {{ name }}
    </span>
  </div>
</template>

<script>
import { SET_FILTERS_FROM_ACTIVE_CHECKBOXES } from '../../store/actions'

export default {
  name: 'SingleCheckboxFilterGroup',
  props: ['singleCheckboxInformation'],
  data () {
    return {
      name: this.capitalizeFirstCharacter()
    }
  },
  computed: {
    filter () {
      return this.singleCheckboxInformation.activeFilter
    }
  },
  watch: {
    filter () {
      this.$store.dispatch(SET_FILTERS_FROM_ACTIVE_CHECKBOXES)
    }
  },
  methods: {
    capitalizeFirstCharacter: function () {
      return this.singleCheckboxInformation.name.charAt(0).toUpperCase() + this.singleCheckboxInformation.name.slice(1)
    }
  }
}
</script>

<style scoped>
  .small-font {
    font-size: 14px;
  }
</style>
