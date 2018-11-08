<template>
  <div>
    <error-message></error-message>
  </div>
</template>

<script>
import ErrorMessage from './ErrorMessage'
export default {
  name: 'NotFound',
  components: {
    'error-message': ErrorMessage
  }
}
</script>

<style scoped>

</style>
