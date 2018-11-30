<template>
  <div>
    Home page
    {{ metadata }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      metadata: 'getMetadata'
    })
  }
}
</script>

<style scoped>

</style>
