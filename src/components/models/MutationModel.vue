<template>
  <div>
    <b-container class="margin-model-top">
      <div v-if="identifiers.length > 0">
        <b-row>
          <!--<b-col cols="3">-->
            <!--<span>Add mutations:</span>-->
            <!--<input type="text" v-model.lazy="newMutation">-->
            <!--<div v-if="errorMutationNotFound" class="mutation-not-found">-->
              <!--Mutation not found-->
            <!--</div>-->
          <!--</b-col>-->
          <div class="align-right">Filter mutations on visibility in Genome Browser
          <label class="switch">
            <input type="checkbox" v-model="filterMutationsOnVisibility">
            <span class="slider round"></span>
          </label></div>
          <b-col cols="12">
            <div v-for="mutationIdentifier in identifiers" :key="mutationIdentifier">
              <div v-if="mutations[mutationIdentifier] && Object.keys(metadataAllFieldsVisible).length > 0">
                <div>
                  <genome-browser :position="mutations[mutationIdentifier]['POS']" :filterMutationsOnVisibility="filterMutationsOnVisibility"></genome-browser>
                </div>
                <div v-if="!filterMutationsOnVisibility">
                  <mutation-card :mutationIdentifier="mutationIdentifier"
                                 :mutation="mutations[mutationIdentifier]"
                                 :visibleFields="metadataAllFieldsVisible[mutationTable]"
                                 :expanded="true">
                  </mutation-card>
                </div>
                <div v-else>
                  Showing filtered mutations
                </div>
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
import GenomeBrowser from './../genomeBrowser/GenomeBrowser'

export default {
  name: 'MutationModel',
  props: ['id'],
  components: {
    'mutation-card': MutationCard,
    'genome-browser': GenomeBrowser
  },
  data () {
    return {
      numericalIdentifiers: new Set(),
      identifiers: [],
      newMutation: '',
      errorMutationNotFound: false,
      filterMutationsOnVisibility: false
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
.margin-model-top {
  margin-top: 70px;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
