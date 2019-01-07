<template>
  <div v-if="allMutations[mutationIdentifier]">
    <b-row>
      <b-col cols="3" class="bold">
        <router-link :to="{name: 'Mutation', params: {id: allMutations[mutationIdentifier][columnMutationIdentifierNumerical]}}">
          <font-awesome-icon icon="search" class="fa-icon"></font-awesome-icon>
          {{ mutationIdentifier }}
        </router-link>
      </b-col>
      <b-col v-for="(column, index) in columnsMutationsVisibleForPatientCard[mutationTable]" class="mutation-information"
             :class="{ 'col-2': index === 0, 'col-2': index === 1, 'col-4': index === 2}"
             :key="index">
        <field-types :property="column" :information="allMutations[mutationIdentifier]"
                     :showPropertyName="false"></field-types>
      </b-col>
    </b-row>
    <div class="line"></div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'MutationCardCompactView',
  props: ['mutation', 'mutationIdentifier'],
  computed: {
    ...mapGetters({
      allMutations: 'mutation/getMutations'
    }),
    ...mapState({
      mutationTable: 'MUTATION_TABLE',
      columnMutationIdentifierNumerical: 'COLUMN_MUTATION_IDENTIFIER_NUMERICAL',
      columnsMutationsVisibleForPatientCard: 'metadataColumnsMutations'
    })
  }
}
</script>

<style scoped>
  .bold {
    font-weight: bold;
  }
  .line {
    width: 98%;
    align-content: center;
    border-bottom: 1px solid #afc3cc;
    margin-top: 2px;
    margin-bottom: 2px;
  }
  .fa-icon {
    border-radius: 5px;
    padding: 2px;
    background-color: #2a97be;
    color: white;
    font-size: 17px;
  }
  .fa-icon:hover {
    cursor: pointer;
    background-color: #1380b5;
  }
</style>
