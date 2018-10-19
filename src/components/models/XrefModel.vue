<template>
  <div>
    <p>
      RSQL: {{ rsql }}
    </p>
    Entity: {{ entity }}
    Name: {{ name }}
    Attribute: {{ attribute }}
    <filter-container></filter-container>
  </div>
</template>

<script>
import FilterContainer from './../mutations/filters/FilterContainer'
import { mapGetters } from 'vuex'

export default {
  name: 'XrefModel',
  components: {
    'filter-container': FilterContainer
  },
  computed: {
    ...mapGetters({
      rsql: 'rsql'
    })
  },
  props: ['entity', 'name', 'attribute']
}
</script>

<style scoped>

</style>
