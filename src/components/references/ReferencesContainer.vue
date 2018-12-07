<template>
  <b-container>
    <div v-if="references.length > 0">
      <div v-for="reference in references" class="pt-2">
        <reference-card :reference="reference"></reference-card>
      </div>
    </div>
  </b-container>
</template>

<script>
import { GET_ALL_REFERENCES } from '../../store/actions'
import { mapGetters } from 'vuex'
import ReferenceCard from './ReferenceCard'

export default {
  name: 'ReferencesContainer',
  components: {
    'reference-card': ReferenceCard
  },
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters({
      references: 'getAllReferences'
    })
  },
  created () {
    this.$store.dispatch(GET_ALL_REFERENCES)
  }
}
</script>

<style scoped>

</style>
