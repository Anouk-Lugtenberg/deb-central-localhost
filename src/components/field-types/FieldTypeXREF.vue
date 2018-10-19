<template>
  <div>
    <div v-if="attribute === 'N/A'">
      {{ label }}: {{ attribute }}
    </div>
    <div v-else>
      {{ label }}: <router-link :to="{name: 'XREF', params: {name: name, attribute: attribute, entity: entity}}">{{ attribute }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldTypeXREF',
  props: ['information', 'property', 'entity'],
  data: function () {
    return {
      name: this.property.name,
      label: this.property.label,
      attribute: ''
    }
  },
  /*
  Exception for the property of Mutations_Details (from deb-central) table -> codon change column.
   */
  created () {
    if (this.information[this.property.name]['DNA']) {
      this.attribute = this.information[this.property.name]['DNA']
    } else {
      this.attribute = this.information[this.property.name][this.property.name]
    }
  },
  /*
  Checks if given field is available in the information, if not then set to 'N/A'
   */
  watch: {
    information () {
      if (this.information.hasOwnProperty(this.property.name)) {
        this.attribute = this.information[this.property.name][this.property.name]
      } else {
        this.attribute = 'N/A'
      }
    }
  }
}
</script>

<style scoped>

</style>
