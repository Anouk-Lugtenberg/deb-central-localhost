<template>
  <div>
    <h1>Genome Browser</h1>
    <a href='http://www.ensembl.org/' id='enslink' target='_newtab'>Link to Ensembl</a>
    <div id="svgHolder"></div>
  </div>
</template>

<script>
import { Browser, Chainset } from '../assets/js/dalliance-all.min'

export default {
  name: 'GenomeBrowser',
  created () {
    let browser = new Browser({
      chr: '3',
      viewStart: 48610422,
      viewEnd: 48610522,
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
        actions: '[{label:\'show entityreport\',run:\'alert("test")\'}]',
        track_type: 'VARIANT',
        entity: 'col7a1_Mutations',
        attrs: [
          'ID:Mutation ID',
          'cdnanotation:cDNA change'
        ]
      }]
    })
    browser.addFeatureInfoPlugin(function (f, info) {
      info.add('Testing', 'This is a test!')
    })
  }
}
</script>

<style scoped>

</style>
