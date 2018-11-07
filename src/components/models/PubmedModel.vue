<template>
    <b-container class="margin-model-top">
      <b-row>
        <b-col sm="3">
        </b-col>
        <b-col sm="9">
          Entity: {{ entity }}
          Label: {{ label }}
          Attribute: {{ attribute }}
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import { GET_PUBLICATION_FOR_ID } from '../../store/actions'

export default {
  name: 'MrefModel',
  props: ['entity', 'label', 'attribute'],
  created () {
    this.$store.dispatch(GET_PUBLICATION_FOR_ID, this.attribute)
  }
}
</script>

<style scoped>

</style>
