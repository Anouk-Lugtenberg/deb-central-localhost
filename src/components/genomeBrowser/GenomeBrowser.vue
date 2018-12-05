<template>
  <div>
    <a href="" v-on:click="filterMutation(mutationIdentifier)" id="stuff" class="meh"></a>
    <div id="svgHolder">Couldn't load Dalliance Browser</div>
  </div>
</template>

<script>
import { Browser, Chainset } from './../../assets/js/dalliance-all.min'
import { GET_MUTATIONS_BETWEEN_POSITION_START_AND_END } from './../../store/modules/mutation/actions'
import _ from 'lodash'
export default {
  name: 'GenomeBrowser',
  props: {
    position: {
      type: Number,
      default: 48610472
    },
    filterMutationsOnVisibility: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      browser: '',
      viewStart: this.position - 50,
      viewEnd: this.position + 50,
      mutationIdentifier: '',
      interval: null
    }
  },
  computed: {
    browserViewStart () {
      return this.browser.viewStart
    }
  },
  methods: {
    setLocation (chr, viewStart, viewEnd) {
      let maxViewWidth = 999999999
      if (chr) {
        viewStart = viewStart && viewStart > 0 ? viewStart : 1
        viewEnd = viewEnd && viewEnd > 0 ? viewEnd : viewStart + maxViewWidth
        this.browser.setLocation(chr, viewStart, viewEnd)
      }
    },
    filterMutation (mutationIdentifier) {
      console.log('Mutation identifier: ' + mutationIdentifier)
    },
    retrieveMutationsForPosition (viewStart, viewEnd) {
      if (this.filterMutationsOnVisibility) {
        this.$store.dispatch('mutation/' + GET_MUTATIONS_BETWEEN_POSITION_START_AND_END, [viewStart, viewEnd])
      }
    },
    setUpdatedViewStartAndEnd () {
      let viewStart = this.browser.viewStart
      let viewEnd = this.browser.viewEnd
      this.retrieveMutationsForPosition(viewStart, viewEnd)
    }
  },
  watch: {
    position () {
      this.setLocation('3', this.viewStart, this.viewEnd)
    },
    browserViewStart: _.debounce(function () {
      this.setUpdatedViewStartAndEnd()
    }, 500),
    filterMutationsOnVisibility () {
      this.setUpdatedViewStartAndEnd()
    }
  },
  mounted () {
    this.browser = new Browser({
      noPersist: true,
      chr: '3',
      viewStart: this.viewStart,
      viewEnd: this.viewEnd,
      cookieKey: 'human-grc_h37',

      coordSystem: {
        speciesName: 'Human',
        taxon: 9606,
        auth: 'GRCh',
        version: '37',
        ucscName: 'hg19'
      },

      chains: {
        hg18ToHg19: new Chainset('http://www.derkholm.net:8080/das/hg18ToHg19/', 'NCBI36', 'GRCh37',
          {
            speciesName: 'Human',
            taxon: 9606,
            auth: 'GRCh',
            version: 36
          })
      },
      sources: [{
        name: 'Genome',
        twoBitURI: 'http://www.biodalliance.org/datasets/hg19.2bit',
        tier_type: 'sequence',
        provides_entrypoints: true,
        pinned: true
      },
      {
        genome_attrs: {
          pos: 'POS',
          chr: '#CHROM'
        },
        name: 'COL7A1',
        label_attr: 'cdnanotation',
        tier_type: 'molgenis',
        uri: 'https://molgenis42.gcc.rug.nl/api/v2/col7a1_Mutations',
        // actions: '[{' +
        //   'label:\' ID \',' +
        //   'run:\'alert(feature.entity["ID"])\'' +
        //   '}]',
        track_type: 'VARIANT',
        entity: this.mutationTable,
        attrs: [
          'ID:Mutation ID',
          'cdnanotation:cDNA change'
        ]
      }],
      injectionPoint: this.pageName,
      fullScreen: true
    })
    this.browser.addFeatureInfoPlugin((f, info) => {
      this.mutationIdentifier = info['hit'][0]['entity']['ID']
      info.add('Mutation', this.mutationIdentifier)
      // document.getElementById('stuff').addEventListener('click', this.filterMutation(this.mutationIdentifier))
    })
  }
}
</script>

<style scoped>
.meh {
  background-color: black;
}
</style>
