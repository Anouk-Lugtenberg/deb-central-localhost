<template>
  <div>
    <div v-if="mutations.length > 0">
      <table class="mutation-table pure-table pure-table-horizontal">
        <b-row v-for="(mutation, index) in mutations" :key="index">
          <b-col cols="2" class="bold">
            <router-link :to="{name: 'Mutation', params: {id: allMutations[mutation][columnMutationIdentifierNumerical]}}">
              {{ mutation }}
            </router-link>
          </b-col>
          <b-col v-for="(column, index) in metadataColumnsMutations[mutationTable]" class="mutation-information"
                 :class="{ 'col-3': index === 0, 'col-2': index === 1, 'col-5': index === 2}"
                 :key="index">
              <field-types :property="column" :information="allMutations[mutation]" :entity="mutationTable"
                           :showPropertyName="false"></field-types>
          </b-col>
        </b-row>
      </table>
    </div>
    <div class="line"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { COLUMN_MUTATION_IDENTIFIER_NUMERICAL,
  MUTATION_TABLE,
  COLUMN_MUTATION_CDNANOTATION } from '../../store/config'
import FieldTypes from './FieldTypes'

export default {
  name: 'FieldTypePatientMutations',
  props: ['listMutationsPerPatient', 'entity'],
  components: {
    'field-types': FieldTypes
  },
  data () {
    return {
      mutations: [],
      columnMutationIdentifierNumerical: COLUMN_MUTATION_IDENTIFIER_NUMERICAL,
      mutationTable: MUTATION_TABLE
    }
  },
  computed: {
    ...mapGetters({
      allMutations: 'mutation/getMutations',
      metadataColumnsMutations: 'getMetadataColumnsMutations'
    })
  },
  watch: {
    listMutationsPerPatient () {
      this.getMutationsForPatientID()
    }
  },
  created: function () {
    this.getMutationsForPatientID()
  },
  methods: {
    getMutationsForPatientID () {
      /**
       * TODO: VRIJDAG MEE GESTOPT
       * Dat dit niet werkt heeft te maken met dat er geen CDNA notatie wordt opgeslagen bij de FIPA database.
       * Deze CDNA notatie wordt bij col7a en CHD7 opgeslagen in de Patient tabel, onder de kolom waar hun mutatie id(s) staan...
       * Moet dit opgelost worden? Of moet de dataset worden aangepast? Bart vragen? **/
      this.mutations = []
      for (let mutation in this.listMutationsPerPatient) {
        if (!this.listMutationsPerPatient.hasOwnProperty(mutation)) continue
        let singleMutation = this.listMutationsPerPatient[mutation][COLUMN_MUTATION_CDNANOTATION]
        console.log('Single mutation: ' + singleMutation)
        this.mutations.push(singleMutation)
      }
      /*
      If more than mutation is found, mutations are sorted
      */
      if (this.mutations.length > 1) {
        this.mutations.sort(this.sortMutations)
      }
    },
    /*
    Sorts the two mutations from deb-central by 'natural sort'
     */
    sortMutations (a, b) {
      let ax = []
      let bx = []

      a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { ax.push([$1 || Infinity, $2 || '']) })
      b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { bx.push([$1 || Infinity, $2 || '']) })

      while (ax.length && bx.length) {
        let an = ax.shift()
        let bn = bx.shift()
        let nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1])
        if (nn) return nn
      }
      return ax.length - bx.length
    }
  }
}
</script>

<style scoped>
  .mutation-table {
    width: 100%;
  }
  .bold {
    font-weight: bold;
  }
  .line {
    width: 98%;
    align-content: center;
    border-bottom: 1px solid #afc3cc;
    margin: 5px auto 10px auto;
  }
</style>
