<template>
  <div>
    <b-card class="mt-2 ml-1 mr-1 mb-1">
      <div @click="toggleCollapse =! toggleCollapse" class="clickable">
            <span v-if="toggleCollapse">
              <font-awesome-icon icon="caret-down" class="fa-icon"></font-awesome-icon>
            </span>
        <span v-else>
              <font-awesome-icon icon="caret-right" class="fa-icon"></font-awesome-icon>
            </span>
        {{ filterGroupName }}
      </div>
      <b-collapse v-model="toggleCollapse" id="collapsed">
        <div v-for="singleCheckboxInformation in filters.slice(0, 10)">
          <single-checkbox-filter-group :singleCheckboxInformation="singleCheckboxInformation"></single-checkbox-filter-group>
        </div>
        <div v-if="filters.length > 10">
          <b-collapse v-model="showAllFilters" id="collapsedFilters">
            <div v-for="singleCheckboxInformation in filters.slice(10)">
              <single-checkbox-filter-group :singleCheckboxInformation="singleCheckboxInformation"></single-checkbox-filter-group>
            </div>
          </b-collapse>
          <div @click="showAllFilters = !showAllFilters" class="show-more-filters">
            <div v-if="showAllFilters">Show less</div>
            <div v-else>Show more</div>
          </div>
        </div>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import SingleCheckboxFilterGroup from './SingleCheckboxFilterGroup'

export default {
  name: 'CheckboxFilterGroup',
  props: ['filters', 'filterGroupName'],
  data () {
    return {
      toggleCollapse: false,
      showAllFilters: false
    }
  },
  components: {
    'single-checkbox-filter-group': SingleCheckboxFilterGroup
  }
}
</script>

<style scoped>
  .clickable {
    cursor: pointer;
  }
  span {
    display: inline-block;
    width: 10px;
  }
  .show-more-filters {
    font-size: 14px;
    text-align: right;
    cursor: pointer;
    font-weight: bold;
  }
</style>
