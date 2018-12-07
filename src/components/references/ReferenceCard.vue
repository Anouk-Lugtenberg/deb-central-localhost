<template>
  <b-card>
    <div class="title">
      <router-link :to="{name: 'PubMed', params: {id: reference.Pubmed}}">
        <font-awesome-icon icon="search" class="fa-icon"></font-awesome-icon>
      </router-link>
      {{ reference.Title }}
    </div>
    <div v-if="reference.abstractText">
      <publication-model-abstract-text :abstractText="reference.abstractText"></publication-model-abstract-text>
    </div>
    <!--<field-type-pubmed-mref></field-type-pubmed-mref>-->


  </b-card>
</template>

<script>
import PublicationModelAbstractText from './../models/PublicationModel/PublicationModelAbstractText'
import { mapState } from 'vuex'
export default {
  name: 'ReferenceCard',
  props: ['reference'],
  components: {
    'publication-model-abstract-text': PublicationModelAbstractText
  },
  computed: {
    ...mapState({
      referenceMetadata: 'referenceMetadata'
    })
  }
}
</script>

<style scoped>
  .title {
    font-weight: bold;
    color: dimgrey;
  }
  .fa-icon {
    border-radius: 5px;
    padding: 2px;
    background-color: #2a97be;
    color: white;
    font-size: 22px;
  }
  .fa-icon:hover {
    cursor: pointer;
    background-color: #1380b5;
  }
</style>
