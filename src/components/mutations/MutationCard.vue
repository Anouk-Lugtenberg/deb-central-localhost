<template>
  <div>
    <b-card header-tag="header" header-bg-variant="light" no-body class="shadow card mb-2">
      <div class="card-text">
        <b-container>
          <span>
            <font-awesome-icon icon="search-plus" class="fa-icon" v-on:click="changeExpansion()"></font-awesome-icon>
            <span class="title-mutation">
              <field-type-mutation-id :mutation="mutation" :mutationIdentifier="mutationIdentifier">{{ mutationIdentifier }}</field-type-mutation-id>
            </span>
            </span>
          <b-row>
            <b-col cols="6" v-for="property in visibleFields" :key="property.name">
              <field-types :property="property" :information="mutation" :entity="mutationTable"></field-types>
            </b-col>
          </b-row>
        </b-container>
        <div class="extra-information" v-if="expand">
          <div class="line"></div>
          <div v-if="patientsPerMutation[mutationIdentifier]">
            <mutation-card-information-container
              :mutationIdentifier="mutationIdentifier"
              :patients="patientsPerMutation[mutationIdentifier]">
            </mutation-card-information-container>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MutationCardInformationContainer from './MutationCardInformationContainer'
import FieldTypeMutationIdentifier from '../fieldTypes/FieldTypeMutationIdentifier'
import FieldTypes from '../fieldTypes/FieldTypes'
import { GET_PATIENT_FOR_MUTATION } from '../../store/modules/mutation/actions'
import { LOOK_UP_ATTRIBUTE_MUTATIONS, MUTATION_TABLE } from '../../store/config'

export default {
  name: 'MutationCard',
  props: {
    mutationIdentifier: {
      type: String
    },
    mutation: {
      type: Object
    },
    visibleFields: {
      type: Array
    },
    expanded: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'mutation-card-information-container': MutationCardInformationContainer,
    'field-type-mutation-id': FieldTypeMutationIdentifier,
    'field-types': FieldTypes
  },
  data () {
    return {
      expand: this.expanded,
      current: 0,
      tabList: [],
      mutationTable: MUTATION_TABLE
    }
  },
  computed: {
    ...mapGetters({
      patientsPerMutation: 'mutation/getPatientsPerMutation'
    })
  },
  created () {
    this.getPatients()
  },
  methods: {
    changeExpansion () {
      this.expand = !this.expand
      this.getPatients()
    },
    getPatients () {
      if (!(this.mutationIdentifier in this.patientsPerMutation)) {
        this.$store.dispatch('mutation/' + GET_PATIENT_FOR_MUTATION, [this.mutationIdentifier, this.mutation[LOOK_UP_ATTRIBUTE_MUTATIONS]])
      }
    }
  }
}
</script>

<style scoped>
  .fa-icon {
    color: #2a97be;
    font-size: 20px;
  }
  .fa-icon:hover {
    color: #1380b5;
    cursor: pointer;
  }
  .title-mutation {
    font-size: 20px;
    font-weight: bold;
  }
  .line {
    width: 98%;
    align-content: center;
    border-bottom: 1px solid #afc3cc;
    margin: 5px auto 10px auto;
  }
  .card-text {
    background: white;
  }
</style>
