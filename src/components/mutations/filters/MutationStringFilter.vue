<template>
  <div class="search-field ml-1 mr-1 mt-3">
    <input type="text" placeholder="Search data values" v-model.lazy="search">
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
  input {
    width: 100%;
  }
  .search-field {
    text-align: center;
  }
</style>
