<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-nav>
        <b-navbar-brand :to="{name: 'Home'}">
          <img src="./../assets/img/deb-register-grey-background.png" class="img-deb-register">
        </b-navbar-brand>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item :to="'/Mutations'">
          Mutations
        </b-nav-item>
        <b-nav-item :to="'/Patients'">
          Patients
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <settings-modal></settings-modal>
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
  }
}
</script>

<style scoped>
.img-deb-register {
  height: 79px;
  width: 260px;
}
</style>
