<template>
  <div>
    <input type="checkbox" v-model="singleCheckboxInformation.activeFilter" :id="singleCheckboxInformation.name">
    <span>
      {{ singleCheckboxInformation.name }}
    </span>
  </div>
</template>

<script>
import { SET_FILTERS_CHECKBOX } from '../../store/modules/mutation/mutations'

export default {
  name: 'SingleCheckboxFilterGroup',
  props: ['singleCheckboxInformation'],
  computed: {
    filter () {
      return this.singleCheckboxInformation.activeFilter
    }
  },
  watch: {
    filter () {
      this.$store.commit('mutation/' + SET_FILTERS_CHECKBOX)
    }
  }
}
</script>

<style scoped>

</style>
