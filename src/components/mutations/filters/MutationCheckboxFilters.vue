<template>
  <div>
    {{ filteredGroupInformation }}
    <div v-if="metadata[mutationTable]">
      <div v-for="property in metadata[mutationTable]">
        <div v-if="property.fieldType === 'CATEGORICAL'">
          <mutation-checkbox-filter-group :filterGroup="property"></mutation-checkbox-filter-group>
        </div>
        <div v-else-if="property.fieldType === 'COMPOUND'">
          <div v-for="nestedProperty in property.attributes">
            <div v-if="nestedProperty.fieldType === 'CATEGORICAL'">
              <mutation-checkbox-filter-group :filterGroup="nestedProperty"></mutation-checkbox-filter-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MutationCheckboxFilterGroup from './MutationCheckboxFilterGroup'
import { mapGetters } from 'vuex'
import { MUTATION_TABLE } from '../../../store/actions'

export default {
  name: 'MutationCheckboxFilters',
  components: {
    'mutation-checkbox-filter-group': MutationCheckboxFilterGroup
  },
  data () {
    return {
      mutationTable: MUTATION_TABLE
    }
  },
  computed: {
    ...mapGetters({
      metadata: 'getMetadata',
      filteredGroupInformation: 'mutation/getFilteredGroupInformation'
    })
  }
}
</script>

<style scoped>

</style>
