<template>
  <div>
    <div v-if="pubMedIdentifierPatientTable === property.name">
      <field-type-pubmed-identifier :information="information" :property="property"
                                    :showPropertyName="showPropertyName"></field-type-pubmed-identifier>
    </div>
    <div v-else-if="property.fieldType === 'COMPOUND'">
      <field-type-compound :information="information" :property="property"
                           :showPropertyName="showPropertyName"></field-type-compound>
    </div>
    <div v-else-if="typeof singleInformation !== 'undefined'">
      <field-type-xref v-if="property.fieldType === 'XREF'" :information="information" :property="property"
                       :showPropertyName="showPropertyName"></field-type-xref>
      <field-type-mref v-else-if="property.fieldType === 'MREF'" :information="information" :property="property"
                       :showPropertyName="showPropertyName"></field-type-mref>
      <field-type-categorical v-else-if="property.fieldType === 'CATEGORICAL'" :information="information" :property="property"
                              :showPropertyName="showPropertyName"></field-type-categorical>
      <field-type-other v-else :information="information" :property="property"
                        :showPropertyName="showPropertyName"></field-type-other>
    </div>
    <div v-else>
      <span v-if="showPropertyName">
        {{ property.label }}:
      </span>
      N/A
    </div>
  </div>
</template>

<script>
import FieldTypeXREF from './FieldTypeXREF'
import FieldTypeMREF from './FieldTypeMREF'
import FieldTypeCompound from './FieldTypeCompound'
import FieldTypeCategorical from './FieldTypeCategorical'
import FieldTypePubMedIdentifier from './FieldTypePubMedIdentifier'
import FieldTypeOther from './FieldTypeOther'
import { mapGetters } from 'vuex'

export default {
  name: 'FieldTypes',
  props: {
    property: {
      type: Object
    },
    information: {
      type: Object
    },
    showPropertyName: {
      default: true,
      type: Boolean
    }
  },
  components: {
    'field-type-xref': FieldTypeXREF,
    'field-type-mref': FieldTypeMREF,
    'field-type-compound': FieldTypeCompound,
    'field-type-categorical': FieldTypeCategorical,
    'field-type-pubmed-identifier': FieldTypePubMedIdentifier,
    'field-type-other': FieldTypeOther
  },
  computed: {
    ...mapGetters({
      pubMedIdentifierPatientTable: 'getColumnNamePubMedIdentifierPatientTable'
    })
  },
  data () {
    return {
      singleInformation: ''
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
