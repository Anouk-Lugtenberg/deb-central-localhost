<template>
  <mutation-cards-container>
    <router-view></router-view>
  </mutation-cards-container>
</template>

<script>
import MutationCardsContainer from './MutationCardsContainer'

export default {
  name: 'MutationsContainer',
  components: {
    'mutation-cards-container': MutationCardsContainer
  }
}
</script>
