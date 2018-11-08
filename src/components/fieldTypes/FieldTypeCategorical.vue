<template>
  <div>
    <span v-if="showPropertyName">{{ label }}: </span>
    <span>
      {{ attribute }}
    </span>
     <!--<router-link :to="{name: 'CATEGORICAL', params: {name: name, attribute: attribute, entity: entity}}">{{ attribute }}</router-link>-->
  </div>
</template>

<script>
export default {
  name: 'FieldTypeCategorical',
  props: ['information', 'property', 'entity', 'showPropertyName'],
  data () {
    return {
      name: this.property.name,
      label: this.property.label,
      attribute: ''
    }
  },
  /*
  Exception for column ntchange from table Mutations_Details (deb-central).
  The name used in nested is nucleotide instead of ntchange.
   */
  created () {
    if (this.property.name.includes('ntchange')) {
      this.attribute = this.information['ntchange']['nucleotide']
    } else {
      this.attribute = this.information[this.name][this.name]
    }
  }
}
</script>

<style scoped>

</style>
