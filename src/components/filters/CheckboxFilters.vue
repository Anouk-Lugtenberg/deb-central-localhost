<template>
  <div>
    <div v-if="metadata[table]">
      <div v-for="property in metadata[table]">
        <div v-if="property.hasOwnProperty('href')">
          <checkbox-filter-group :filterGroup="property"></checkbox-filter-group>
        </div>
        <div v-else-if="property.fieldType === 'COMPOUND'">
          <div v-for="nestedProperty in property.attributes">
            <div v-if="nestedProperty.hasOwnProperty('href')">
              <checkbox-filter-group :filterGroup="nestedProperty"></checkbox-filter-group>
            </div>
          </div>
        </div>
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
      metadata: 'getMetadata'
    })
  }
}
</script>

<style scoped>

</style>
