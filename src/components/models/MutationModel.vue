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
          <div v-if="mutations[mutationIdentifier]">
            <mutation-card :mutationIdentifier="mutationIdentifier"
                           :mutation="mutations[mutationIdentifier]"
                           :visibleFields="allFieldsVisibleMetadata[mutationTable]">
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
    /* TODO there's a problem on reloading the page when the URI contains a dot. Ask co-worker. */
    this.updateIdentifiers()
    this.setAllFieldsVisible()
  },
  computed: {
    ...mapGetters({
      metadata: 'getMetadata',
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
    },
    /* Sets all the fields from metadata to visible, so all the information of the mutation is shown in this model */
    setAllFieldsVisible () {
      let copyMetadata = this.jsonCopy(this.metadata)
      copyMetadata[MUTATION_TABLE].forEach(function (field) {
        field.visible = true
      })
      this.allFieldsVisibleMetadata = copyMetadata
    },
    jsonCopy (src) {
      return JSON.parse(JSON.stringify(src))
    }
  }
}
</script>
