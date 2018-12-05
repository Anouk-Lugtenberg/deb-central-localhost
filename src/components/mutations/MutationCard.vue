<template>
  <div>
    <b-card header-tag="header" header-bg-variant="light" no-body class="shadow card mb-2">
      <div class="card-text">
        <b-container>
            <span class="title-mutation">
              <field-type-mutation-id :mutation="mutation" :mutationIdentifier="mutationIdentifier">{{ mutationIdentifier }}</field-type-mutation-id>
            </span>
          <b-row>
            <b-col cols="6" v-for="property in visibleFields" :key="property.name">
              <field-types :property="property" :information="mutation" :entity="mutationTable"></field-types>
            </b-col>
          </b-row>
          <b-row v-if="patientsPerMutation[mutationIdentifier]">
            <b-col v-if="patientsPerMutation[mutationIdentifier].length === 0" cols="6" class="no-patients-found">
              No patients found with this mutation
            </b-col>
            <b-col cols="6" v-else v-on:click="changeExpansion()" class="link-to-patients">
              <span v-if="!expand">
                <font-awesome-icon icon="plus" class="fa-icon icon"></font-awesome-icon> Show
              </span>
              <span v-else>
                <font-awesome-icon icon="minus" class="fa-icon icon"></font-awesome-icon> Hide
              </span>
              {{ patientsPerMutation[mutationIdentifier].length }} patient<span v-if="patientsPerMutation[mutationIdentifier].length > 1">s</span>
            </b-col>
            <b-col cols="6">
              <a href="#" @click="setGenomePosition()">Show in Genome Browser</a>
            </b-col>
          </b-row>
          <b-row v-else>
            <b-col cols="6">
              <moon-loader :size="'15px'" :textForLoader="''"></moon-loader>
            </b-col>
          </b-row>
        </b-container>
        <div class="extra-information" v-if="expand">
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
import { mapGetters, mapState } from 'vuex'
import MutationCardInformationContainer from './MutationCardInformationContainer'
import FieldTypeMutationIdentifier from '../fieldTypes/FieldTypeMutationIdentifier'
import FieldTypes from '../fieldTypes/FieldTypes'
import MoonLoader from '../loader/MoonLoader'
import { GET_PATIENT_FOR_MUTATION } from '../../store/modules/mutation/actions'
import { SET_GENOME_POSITION } from '../../store/modules/mutation/mutations'

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
    'field-types': FieldTypes,
    'moon-loader': MoonLoader
  },
  data () {
    return {
      expand: this.expanded,
      current: 0,
      tabList: []
    }
  },
  computed: {
    ...mapGetters({
      patientsPerMutation: 'mutation/getPatientsPerMutation'
    }),
    ...mapState({
      mutationTable: 'MUTATION_TABLE',
      cDNANotation: 'COLUMN_MUTATION_CDNANOTATION',
      columnMutationPosition: 'COLUMN_MUTATION_POSITION'
    })
  },
  watch: {
    mutationIdentifier () {
      this.getPatients()
    }
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
        this.$store.dispatch('mutation/' + GET_PATIENT_FOR_MUTATION, [this.mutationIdentifier, this.mutation[this.cDNANotation]])
      }
    },
    setGenomePosition () {
      this.$store.commit('mutation/' + SET_GENOME_POSITION, this.mutation[this.columnMutationPosition])
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
  .card-text {
    background: white;
  }
  .no-patients-found {
    color: #dc3545;
  }
  .icon {
    font-size: 15px;
    display: inline-block;
    vertical-align: middle;
    padding-bottom: 2px;
  }
  .link-to-patients {
    color: #3198bc;
  }
  .link-to-patients:hover {
    color: #1380b5;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
