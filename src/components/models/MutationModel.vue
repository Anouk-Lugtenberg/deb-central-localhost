<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="2">
          <span>Add mutations:</span>
          <input type="text" v-model.lazy="newMutation">
          <div v-if="errorMutationNotFound">
            MUTATION NOT FOUND
          </div>
        </b-col>
        <b-col cols="5" v-for="mutationIdentifier in identifiers" :key="mutationIdentifier">
          <div v-if="mutations[mutationIdentifier]">
            <b-card header-tag="header" header-bg-variant="light" class="mt-2">
              <div slot="header" class="header-card">
                <field-type-mutation-id :mutationIdentifier="mutationIdentifier">{{ mutationIdentifier }}
                </field-type-mutation-id>
              </div>
              <div class="card-text">
                <div v-for="property in metadata[mutationTable]" :key="property.name">
                  <field-types :property="property" :information="mutations[mutationIdentifier]" :entity="'Mutations'"></field-types>
                </div>
              </div>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FieldTypes from './../field-types/FieldTypes'
import FieldTypeMutationIdentifier from './../field-types/FieldTypeMutationIdentifier'
import { MUTATION_TABLE } from '../../store/actions'

export default {
  name: 'MutationModel',
  props: ['id'],
  components: {
    'field-types': FieldTypes,
    'field-type-mutation-id': FieldTypeMutationIdentifier
  },
  data () {
    return {
      identifiers: [],
      newMutation: '',
      errorMutationNotFound: false,
      mutationTable: MUTATION_TABLE
    }
  },
  created () {
    this.updateIdentifiers()
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
    }
  }
}
</script>

<style scoped>
  .header-card {
    font-size: 20px;
    font-weight: bold;
  }
</style>
