<template>
  <div class="search-field ml-1 mr-1 mt-3">
    <input type="text" placeholder="Search data values" v-model.lazy="search">
  </div>
</template>

<script>
import { SET_SEARCH_PATIENTS } from '../../../store/modules/patients/mutations'

export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: function () {
      this.$store.commit('patients/' + SET_SEARCH_PATIENTS, this.search)
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
