<template>
  <mutation-cards-container>
    <router-view></router-view>
  </mutation-cards-container>
</template>

<script>
import MutationCardsContainer from './MutationCardsContainer'
import { mapGetters } from 'vuex'

export default {
  name: 'MutationsContainer',
  components: {
    'mutation-cards-container': MutationCardsContainer
  },
  computed: {
    ...mapGetters({
      totalMutations: 'mutation/getTotalMutations'
    })
  }
}
</script>

<style scoped>

</style>
