<template>
  <div>
    <b-navbar variant="info" type="dark" toggleable="sm">
      <b-navbar-nav>
        <b-navbar-brand :to="{name: 'Home'}">
          <img src="../assets/img/deb-central-logo.png" class="img-deb-register">
        </b-navbar-brand>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item :to="'/Mutations'">Mutations</b-nav-item>
        <b-nav-item :to="'/Patients'">Patients</b-nav-item>
        <b-nav-item :to="'/GenomeBrowser'">Genome Browser</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="showModal = !showModal">
          Settings
          <settings-modal v-on:setVisibility="setVisibilityModal" :showModal="showModal"></settings-modal>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import SettingsModal from './settings/SettingsModal'

export default {
  name: 'PageHeader',
  components: {
    'settings-modal': SettingsModal
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    setVisibilityModal (isVisible) {
      this.showModal = isVisible
    }
  }
}
</script>

<style scoped>
.img-deb-register {
  height: 79px;
  width: 260px;
}
</style>
