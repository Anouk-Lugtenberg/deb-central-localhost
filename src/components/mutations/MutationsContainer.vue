<template>
  <b-container>
    <mutation-cards-container>
      <router-view></router-view>
    </mutation-cards-container>
  </b-container>
</template>

<script>
import MutationCardsContainer from './MutationCardsContainer'
import SettingsModal from './../settings/SettingsModal'
import FilterContainer from './filters/FilterContainer'
import { GET_ALL_MUTATIONS } from '../../store/modules/mutation/actions'
import { mapGetters } from 'vuex'

export default {
  name: 'MutationsContainer',
  components: {
    'mutation-cards-container': MutationCardsContainer,
    'settings-modal': SettingsModal,
    'filter-container': FilterContainer
  },
  computed: {
    ...mapGetters({
      totalMutations: 'mutation/getTotalMutations'
    })
  },
  created () {
    if (Object.keys(this.$store.state.mutation.mutations).length === 0) {
      this.$store.dispatch('mutation/' + GET_ALL_MUTATIONS)
    }
  }
}
</script>

<style scoped>

</style>
