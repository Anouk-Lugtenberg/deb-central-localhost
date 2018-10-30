<template>
  <div>
    <input type="text" v-model.lazy="search">
  </div>
</template>

<script>
import { SET_SEARCH_PATIENTS } from '../../../store/modules/patients/mutations'
export default {
  name: 'PatientsStringFilter',
  props: ['rsqlQuery'],
  data () {
    return {
      search: this.rsqlQuery
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

</style>
