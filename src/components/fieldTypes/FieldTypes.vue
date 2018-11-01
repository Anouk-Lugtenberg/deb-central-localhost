<template>
  <div>
    <div v-if="property.fieldType === 'COMPOUND'">
      <field-type-compound :information="information" :property="property" :entity="entity"></field-type-compound>
    </div>
    <div v-else-if="typeof singleInformation !== 'undefined'">
      <field-type-xref v-if="property.fieldType === 'XREF'" :information="information" :property="property" :entity="entity"></field-type-xref>
      <field-type-mref v-else-if="property.fieldType === 'MREF'" :information="information" :property="property" :entity="entity"></field-type-mref>
      <field-type-categorical v-else-if="property.fieldType === 'CATEGORICAL'" :information="information" :property="property" :entity="entity"></field-type-categorical>
      <field-type-other v-else :information="information" :property="property"></field-type-other>
    </div>
    <div v-else>
      {{ property.label }}: N/A
    </div>
  </div>
</template>

<script>
import FieldTypeXREF from './FieldTypeXREF'
import FieldTypeMREF from './FieldTypeMREF'
import FieldTypeCompound from './FieldTypeCompound'
import FieldTypeCategorical from './FieldTypeCategorical'
import FieldTypeOther from './FieldTypeOther'

export default {
  name: 'FieldTypes',
  props: ['property', 'information', 'entity', 'showPropertyName'],
  components: {
    'field-type-xref': FieldTypeXREF,
    'field-type-mref': FieldTypeMREF,
    'field-type-compound': FieldTypeCompound,
    'field-type-categorical': FieldTypeCategorical,
    'field-type-other': FieldTypeOther
  },
  data () {
    return {
      singleInformation: this.information[this.property.name]
    }
  },
  watch: {
    information () {
      this.singleInformation = this.information[this.property.name]
    }
  }
}
</script>

<style scoped>

</style>
