<template>
  <div>
    <b-container>
      <div v-if="error && error.status">
        <error-message :error="error"></error-message>
      </div>
      <div v-else>
        <router-view></router-view>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ErrorMessage from './ErrorMessage'
export default {
  name: 'Container',
  components: {
    'error-message': ErrorMessage
  },
  computed: {
    ...mapGetters({
      error: 'getError'
    })
  }
}
</script>
