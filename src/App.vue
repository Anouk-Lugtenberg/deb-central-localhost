<template>
  <div id="app">
    <page-header></page-header>
    <router-view/>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader'
import { GET_METADATA } from './store/actions'
import { GET_ALL_MUTATIONS } from './store/modules/mutation/actions'
import { GET_ALL_PATIENTS } from './store/modules/patients/actions'

export default {
  name: 'App',
  components: {
    'page-header': PageHeader
  },
  created () {
    this.$store.dispatch(GET_METADATA)
    this.$store.dispatch('mutation/' + GET_ALL_MUTATIONS)
    this.$store.dispatch('patients/' + GET_ALL_PATIENTS)
  }
}
</script>

<style lang="scss">
  @import './assets/scss/custom-styling.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
