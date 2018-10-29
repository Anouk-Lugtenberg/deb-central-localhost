<template>
  <div>
    Group: {{ filterGroup.label }}
    <div v-if="filteredGroupInformation[filterGroup.name]">
      <div v-for="singleInformation in filteredGroupInformation[filterGroup.name]">
        <mutation-single-checkbox-filter-group :singleCheckboxInformation="singleInformation"></mutation-single-checkbox-filter-group>
      </div>
    </div>
  </div>
</template>

<script>
import MutationSingleCheckboxFilterGroup from './MutationSingleCheckboxFilterGroup'
import { GET_FILTER_GROUP_INFORMATION } from '../../../store/modules/mutation/actions'
import { mapGetters } from 'vuex'

export default {
  name: 'MutationCheckboxFilterGroup',
  props: ['filterGroup'],
  components: {
    'mutation-single-checkbox-filter-group': MutationSingleCheckboxFilterGroup
  },
  computed: {
    ...mapGetters({
      filteredGroupInformation: 'mutation/getFilteredGroupInformation'
    })
  },
  created () {
    if (!(this.filteredGroupInformation.hasOwnProperty(this.filterGroup.name))) {
      this.$store.dispatch('mutation/' + GET_FILTER_GROUP_INFORMATION, [this.filterGroup.name, this.filterGroup.href])
    }
  }
}
</script>

<style scoped>

</style>
