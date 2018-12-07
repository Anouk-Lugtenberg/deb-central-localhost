<template>
  <b-card>

    {{ reference.Title }}
  </b-card>
</template>

<script>
import FieldTypePubMedIdentifer from './../fieldTypes/FieldTypePubMedIdentifier'
export default {
  name: 'ReferenceCard',
  props: ['reference'],
  components: {
    'field-type-pubmed-identifier': FieldTypePubMedIdentifer
  }
}
</script>

<style scoped>

</style>
