<template>
  <div>
    <div v-if="filteredGroupInformation[table]">
      <div v-for="filterGroupName in Object.keys(filteredGroupInformation[table])">
        <checkbox-filter-group :filterGroupName="filterGroupName" :filters="filteredGroupInformation[table][filterGroupName]"></checkbox-filter-group>
      </div>
    </div>
  </div>
</template>

<script>
import CheckboxFilterGroup from './CheckboxFilterGroup'
import { mapGetters } from 'vuex'

export default {
  name: 'CheckboxFilters',
  props: ['table'],
  components: {
    'checkbox-filter-group': CheckboxFilterGroup
  },
  computed: {
    ...mapGetters({
      metadata: 'getMetadata',
      filteredGroupInformation: 'getFilteredGroupInformation'
    })
  }
}
</script>

<style scoped>
</style>
