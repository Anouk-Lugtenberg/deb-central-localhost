<template>
  <div>
    <span v-if="showPropertyName">{{ label }}: </span>
    <span v-if="attribute.includes('N/A')">
      N/A
    </span>
    <span v-else>
      <span v-if="isClickable">
        <a :href="'https://www.ncbi.nlm.nih.gov/pubmed/' + attribute">{{ attribute }}</a>
      </span>
       <span v-else>
         {{ attribute }}
       </span>
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
      attribute: 'N/A',
      isClickable: false
    }
  },
  /*
  Checks if given field is available in the information, if not then set to 'N/A'
   */
  created () {
    this.setAttribute()
  },
  watch: {
    information () {
      this.setAttribute()
    }
  },
  methods: {
    setAttribute () {
      let name = this.name
      /* Exception for column PubMedID from col7a1_Patients table. The PubMeds are saved as a MREF field.
      * So there isn't a hyperlink available on the fly, but this is embedded in /api/v2/col7a1_Publications.
      * This field has to be retrieved from the data to show the pubmeds to the user.
      * When user clicks on pubmed ID from col7a1 table, he is first redirected to a card which has a summary of
      * the pubmed, in this card the user can click on the hyperlink to go to the pubmed article itself. */
      if (this.name.includes('PubMedID')) {
        name = 'Pubmed'
        this.isClickable = true
      }
      let attribute = ''
      let stuff = this.information[this.name][0]
      Object.keys(stuff).forEach((key) => {
        if (key.includes(name)) {
          attribute = stuff[key]
        }
      })
      this.attribute = attribute
    }
  }
}
</script>

<style scoped>
</style>
