<template>
  <div>
    <b-card no-body class="mt-2 ml-2 mr-2 mb-1">
      <div @click="toggleCollapse =! toggleCollapse" class="clickable ml-2">
        <span v-if="toggleCollapse">
          <font-awesome-icon icon="caret-down" class="fa-icon"></font-awesome-icon>
        </span>
        <span v-else>
          <font-awesome-icon icon="caret-right" class="fa-icon"></font-awesome-icon>
        </span>
        {{ groupName }}
      </div>
      <b-collapse v-model="toggleCollapse" id="collapsed">
        <div v-for="singleCheckboxInformation in filters.slice(0, 10)">
          <single-checkbox-filter-group class="settings-checkbox ml-2" :singleCheckboxInformation="singleCheckboxInformation"></single-checkbox-filter-group>
        </div>
        <div v-if="filters.length > 10">
          <b-collapse v-model="showAllFilters" id="collapsedFilters">
            <div v-for="singleCheckboxInformation in filters.slice(10)">
              <single-checkbox-filter-group class="settings-checkbox ml-2" :singleCheckboxInformation="singleCheckboxInformation"></single-checkbox-filter-group>
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
  props: ['filterLabel', 'filters', 'filterGroupName'],
  data () {
    return {
      toggleCollapse: false,
      showAllFilters: false,
      groupName: ''
    }
  },
  components: {
    'single-checkbox-filter-group': SingleCheckboxFilterGroup
  },
  created () {
    this.groupName = this.setGroupName(this.filterGroupName)
  },
  methods: {
    /* Capitalizes and adds spaces to the group name for readability of the user */
    setGroupName: function (filterGroupName) {
      filterGroupName = this.removeUnderscores(filterGroupName)
      filterGroupName = this.addSpaceBeforeUppercase(filterGroupName)
      filterGroupName = this.capitalizeFirstCharacter(filterGroupName)
      return filterGroupName
    },
    removeUnderscores: function (filterGroupName) {
      return filterGroupName.replace(/_/g, ' ')
    },
    capitalizeFirstCharacter: function (filterGroupName) {
      return filterGroupName.charAt(0).toUpperCase() + filterGroupName.slice(1)
    },
    addSpaceBeforeUppercase: function (filterGroupName) {
      return filterGroupName.replace(/([A-Z])/g, ' $1').trim()
    }
  }
}
</script>

<style scoped>
  .clickable {
    cursor: pointer;
  }
  .show-more-filters {
    font-size: 14px;
    text-align: right;
    cursor: pointer;
    font-weight: bold;
  }
  .settings-checkbox {
    font-size: 14px;
  }
</style>
