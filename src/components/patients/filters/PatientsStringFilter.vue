<template>
  <div class="search-field ml-1 mr-1 mt-3">
    <input type="text" placeholder="Search patients" v-model.lazy="search">
  </div>
</template>

<script>
import { SET_SEARCH_PATIENTS } from '../../../store/modules/patients/mutations'

export default {
  name: 'PatientsStringFilter',
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: function () {
      this.$store.commit('patients/' + SET_SEARCH_PATIENTS, this.search)
    },
    '$route.query.q' () {
      if (typeof this.$route.query.q === 'undefined') {
        this.search = ''
      }
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
