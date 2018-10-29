<template>
  <div>
    <b-container class="pt-4">
      <b-row>
        <b-col cols="3">
          <span>Add mutations:</span>
          <input type="text" v-model.lazy="newMutation">
          <div v-if="errorMutationNotFound">
            MUTATION NOT FOUND
          </div>
        </b-col>
        <b-col cols="9" v-for="mutationIdentifier in identifiers" :key="mutationIdentifier">
          <div v-if="mutations[mutationIdentifier] && Object.keys(metadata).length > 0">
            <mutation-card :mutationIdentifier="mutationIdentifier"
                           :mutation="mutations[mutationIdentifier]"
                           :visibleFields="metadata[mutationTable]">
            </mutation-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MutationCard from './../mutations/MutationCard'
import { MUTATION_TABLE } from '../../store/actions'

export default {
  name: 'MutationModel',
  props: ['id'],
  components: {
    'mutation-card': MutationCard
  },
  data () {
    return {
      identifiers: [],
      newMutation: '',
      errorMutationNotFound: false,
      mutationTable: MUTATION_TABLE,
      allFieldsVisibleMetadata: []
    }
  },
  created () {
    /* TODO there's a problem on reloading the page when the URI contains a dot. This is a problem with that
     * connect-history-api-fallback (dev-server.js) sees a dot as a file extension. */
    this.updateIdentifiers()
  },
  computed: {
    ...mapGetters({
      metadata: 'getMetadataAllFieldsVisible',
      mutations: 'mutation/getMutations'
    })
  },
  watch: {
    newMutation: function () {
      if (this.mutations[this.newMutation]) {
        this.errorMutationNotFound = false
        this.identifiers.push(this.newMutation)
        this.createNewRoute()
      } else {
        this.errorMutationNotFound = true
      }
    },
    id: function () {
      this.updateIdentifiers()
    }
  },
  methods: {
    createNewRoute () {
      let stringIdentifiers = this.identifiers.join('&')
      this.$router.push('/Mutation/' + stringIdentifiers)
    },
    updateIdentifiers () {
      this.identifiers = []
      if (this.id.substring('&')) {
        let identifiers = this.id.split('&')
        for (let item in identifiers) {
          this.identifiers.push(identifiers[item])
        }
      } else {
        this.identifiers = this.id
      }
    }
  }
}
</script>
