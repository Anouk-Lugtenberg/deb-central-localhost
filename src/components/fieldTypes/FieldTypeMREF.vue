<template>
  <div>
    <span v-if="showPropertyName">{{ label }}: </span>
    <span v-if="attribute.includes('N/A')">
      N/A
    </span>
    <span v-else>
      <router-link :to="{name: 'MREF', params: {label: label, attribute: attribute, entity: entity}}">{{ attribute }}</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'FieldTypeMREF',
  props: ['property', 'information', 'entity', 'showPropertyName'],
  data () {
    return {
      label: this.property.label,
      name: this.property.name,
      attribute: ''
    }
  },
  /*
  Checks if given field is available in the information, if not then set to 'N/A'
   */
  created () {
    if (this.information[this.property.name].length === 0) {
      this.attribute = 'N/A'
      /*
      Exception for column PubMed_ID from Patients-table (deb-central.org)
       */
    } else if (this.name.includes('PubMedID')) {
      this.attribute = this.information['PubMedID'][0]['Pubmed']
    } else {
      this.attribute = this.information[this.property.name][0][this.property.name]
    }
  }
}
</script>

<style scoped>
</style>
