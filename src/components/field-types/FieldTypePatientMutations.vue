<template>
  <div>
    <div v-if="mutations.length > 0">
      <table class="mutation-table pure-table pure-table-horizontal">
        <tr v-for="(mutation, index) in mutations" :key="index">
          <td class="bold mutation-id">
            Mutation:
            <router-link :to="{name: 'Mutation', params: {id: mutation}}">
              {{ mutation }}
            </router-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="line"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { LOOK_UP_ATTRIBUTE_MUTATIONS } from '../../store/actions'

export default {
  name: 'FieldTypePatientMutations',
  props: ['listMutationsPerPatient', 'entity'],
  data () {
    return {
      mutations: []
    }
  },
  computed: {
    ...mapGetters({
      allMutations: 'mutation/getMutations',
      listLinkMutationCDNA: 'mutation/getMutationIDCDNALink'
    })
  },
  watch: {
    listMutationsPerPatient () {
      this.getMutationsForPatientID()
    }
  },
  created () {
    this.getMutationsForPatientID()
  },
  methods: {
    getMutationsForPatientID () {
      this.mutations = []
      for (let mutation in this.listMutationsPerPatient) {
        if (!this.listMutationsPerPatient.hasOwnProperty(mutation)) continue
        let singleMutation = this.listMutationsPerPatient[mutation][LOOK_UP_ATTRIBUTE_MUTATIONS]
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
  .mutation-id {
    width: 20%;
  }
  .line {
    width: 98%;
    align-content: center;
    border-bottom: 1px solid #afc3cc;
    margin: 5px auto 10px auto;
  }
</style>
