<template>
  <div>
    <input type="text" v-model.lazy="search">
  </div>
</template>

<script>
import { SET_SEARCH_MUTATION } from '../../../store/modules/mutation/mutations'

export default {
  name: 'MutationStringFilter',
  props: ['rsqlQuery'],
  data () {
    return {
      search: this.rsqlQuery
    }
  },
  watch: {
    search: function () {
      this.$store.commit('mutation/' + SET_SEARCH_MUTATION, this.search)
    }
  }
}
</script>

<style scoped>

</style>
