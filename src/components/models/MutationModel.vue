<template>
  <div>
    <!--Numerical: {{ this.mutations[this.newMutation][this.columnMutationIdentifierNumerical] }}-->
    <b-container class="margin-model-top">
      <div v-if="identifiers.length > 0">
        <b-row>
          <b-col cols="3">
            <span>Add mutations:</span>
            <input type="text" v-model.lazy="newMutation">
            <div v-if="errorMutationNotFound" class="mutation-not-found">
              Mutation not found
            </div>
          </b-col>
          <b-col cols="9">
            <div v-for="mutationIdentifier in identifiers" :key="mutationIdentifier">
              <div v-if="mutations[mutationIdentifier] && Object.keys(metadataAllFieldsVisible).length > 0">
                <mutation-card :mutationIdentifier="mutationIdentifier"
                               :mutation="mutations[mutationIdentifier]"
                               :visibleFields="metadataAllFieldsVisible[mutationTable]"
                               :expanded="true">
                </mutation-card>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MutationCard from './../mutations/MutationCard'

export default {
  name: 'MutationModel',
  props: ['id'],
  components: {
    'mutation-card': MutationCard
  },
  data () {
    return {
      numericalIdentifiers: new Set(),
      identifiers: [],
      newMutation: '',
      errorMutationNotFound: false
    }
  },
  created () {
    this.updateIdentifiers()
    this.getMutationIdentifiers()
  },
  computed: {
    ...mapGetters({
      metadataAllFieldsVisible: 'getMetadataAllFieldsVisible',
      mutations: 'mutation/getMutations'
    }),
    ...mapState({
      columnMutationIdentifierNumerical: 'COLUMN_MUTATION_IDENTIFIER_NUMERICAL',
      mutationTable: 'MUTATION_TABLE'
    })
  },
  watch: {
    newMutation: function () {
      if (this.mutations[this.newMutation]) {
        this.errorMutationNotFound = false
        this.numericalIdentifiers.add(this.mutations[this.newMutation][this.columnMutationIdentifierNumerical])
        this.createNewRoute()
        this.getMutationIdentifiers()
      } else {
        this.errorMutationNotFound = true
      }
    },
    id: function () {
      this.updateIdentifiers()
      this.getMutationIdentifiers()
    },
    mutations: function () {
      this.updateIdentifiers()
      this.getMutationIdentifiers()
    }
  },
  methods: {
    createNewRoute () {
      let stringIdentifiers = [...this.numericalIdentifiers].join('&')
      this.$router.push('/Mutation/' + stringIdentifiers)
    },
    updateIdentifiers () {
      this.numericalIdentifiers = new Set()
      console.log('ID: ' + this.id)
      if (this.id.substring('&')) {
        let singleNumericalIdentifier = this.id.split('&')
        for (let item in singleNumericalIdentifier) {
          this.numericalIdentifiers.add(singleNumericalIdentifier[item])
        }
      } else {
        this.numericalIdentifiers = this.id
      }
    },
    /*
    CDNA notation is retrieved, bases on numerical identifier from mutation.
    This is done, because the router doesn't deal well with URLs containing a dot, and dots are found in CDNA notation.
     */
    getMutationIdentifiers () {
      this.identifiers = []
      for (let identifier in this.mutations) {
        if (!this.mutations.hasOwnProperty(identifier)) continue
        let mutationIdentifier = this.mutations[identifier][this.columnMutationIdentifierNumerical]
        if (this.numericalIdentifiers.has(mutationIdentifier)) {
          this.identifiers.push(identifier)
        }
      }
    }
  }
}
</script>
<style scoped>
.mutation-not-found {
  color: #dc3545;
}
.margin-model-top {
  margin-top: 70px;
}
</style>
