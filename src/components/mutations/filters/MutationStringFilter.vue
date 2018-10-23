<template>
  <div>
    <input type="text" v-model.lazy="search">
  </div>
</template>

<script>
import { SET_SEARCH } from '../../../store/mutations'

export default {
  name: 'MutationStringFilter',
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: function () {
      this.$store.commit(SET_SEARCH, this.search)
    }
  }
}
</script>

<style scoped>

</style>
