<template>
  <div class="search-field ml-1 mr-1 mt-3">
    {{ $route.query.q }}
    <input type="text" placeholder="search" v-model.lazy="search">
  </div>
</template>

<script>
import { SET_SEARCH_MUTATION } from '../../../store/modules/mutation/mutations'

export default {
  name: 'MutationStringFilter',
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: function () {
      this.$store.commit('mutation/' + SET_SEARCH_MUTATION, this.search)
    }
  },
  created () {
    if (this.$route.query.q) {
      if (this.$route.query.q.includes('*')) {
        this.search = this.$route.query.q.split('=').pop()
      }
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
