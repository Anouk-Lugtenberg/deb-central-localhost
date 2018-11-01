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
        {{ filterGroup.label }}
      </div>
      <b-collapse v-model="toggleCollapse" id="collapsed">
        <div v-if="Object.keys(filteredGroupInformation).length > 0">
          <div v-if="filteredGroupInformation[table]">
            <div v-if="filteredGroupInformation[table][filterGroup.name]">
              <div v-for="singleInformation in filteredGroupInformation[table][filterGroup.name].slice(0, 10)">
                <single-checkbox-filter-group :singleCheckboxInformation="singleInformation"></single-checkbox-filter-group>
              </div>
              <b-collapse v-model="showAllFilters" id="collapsedFilters">
                <div v-for="singleInformation in filteredGroupInformation[table][filterGroup.name].slice(10)">
                  <single-checkbox-filter-group :singleCheckboxInformation="singleInformation"></single-checkbox-filter-group>
                </div>
              </b-collapse>
              <div @click="showAllFilters = !showAllFilters" class="show-more-filters">
                <div v-if="showAllFilters">Show less</div>
                <div v-else>Show more</div>
              </div>
            </div>
          </div>
        </div>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import SingleCheckboxFilterGroup from './SingleCheckboxFilterGroup'
import { GET_FILTER_GROUP_INFORMATION } from '../../store/actions'
import { mapGetters } from 'vuex'

export default {
  name: 'CheckboxFilterGroup',
  props: ['filterGroup', 'table'],
  data () {
    return {
      toggleCollapse: false,
      showAllFilters: false
    }
  },
  components: {
    'single-checkbox-filter-group': SingleCheckboxFilterGroup
  },
  computed: {
    ...mapGetters({
      filteredGroupInformation: 'getFilteredGroupInformation'
    })
  },
  created () {
    if (!(this.filteredGroupInformation.hasOwnProperty(this.filterGroup.name))) {
      this.$store.dispatch(GET_FILTER_GROUP_INFORMATION, [this.table, this.filterGroup.name, this.filterGroup.href])
    }
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
