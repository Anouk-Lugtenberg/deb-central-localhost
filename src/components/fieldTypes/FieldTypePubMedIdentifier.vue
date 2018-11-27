<template>
  <div>
    <div v-if="property.fieldType === 'HYPERLINK'">
      <span v-if="showPropertyName">
        {{ property.label }}:
      </span>
      <span v-if="information[property.name]">
        <a :href="information[property.name]">{{ information[property.name].split('/').pop() }}</a>
      </span>
      <span v-else>
        N/A
      </span>
    </div>
    <div v-else-if="property.fieldType === 'MREF'">
      <fieldtype-pubmed-mref :information="information" :property="property" :entity="entity" :showPropertyName="showPropertyName"></fieldtype-pubmed-mref>
    </div>
  </div>
</template>

<script>
import FieldTypePubMedMREF from './FieldTypePubMedMREF'
export default {
  name: 'FieldTypePubMedIdentifier',
  props: ['information', 'property', 'entity', 'showPropertyName'],
  components: {
    'fieldtype-pubmed-mref': FieldTypePubMedMREF
  }
}
</script>

<style scoped>

</style>
