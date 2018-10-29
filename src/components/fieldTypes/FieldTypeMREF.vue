<template>
  <div>
    <div v-if="attribute.includes('N/A')">
      {{ label }}: N/A
    </div>
    <div v-else>
      {{ label }}: <router-link :to="{name: 'MREF', params: {label: label, attribute: attribute, entity: entity}}">{{ attribute }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldTypeMREF',
  props: ['property', 'information', 'entity'],
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
