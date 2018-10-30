<template>
  <div>
    <b-card class="mt-2">
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
        <div v-if="filteredGroupInformation[filterGroup.name]">
          <div v-for="singleInformation in filteredGroupInformation[filterGroup.name]">
            <single-checkbox-filter-group :singleCheckboxInformation="singleInformation"></single-checkbox-filter-group>
          </div>
        </div>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import SingleCheckboxFilterGroup from './SingleCheckboxFilterGroup'
import { GET_FILTER_GROUP_INFORMATION } from '../../store/modules/mutation/actions'
import { mapGetters } from 'vuex'

export default {
  name: 'CheckboxFilterGroup',
  props: ['filterGroup'],
  data () {
    return {
      toggleCollapse: false
    }
  },
  components: {
    'single-checkbox-filter-group': SingleCheckboxFilterGroup
  },
  computed: {
    ...mapGetters({
      filteredGroupInformation: 'mutation/getFilteredGroupInformation'
    })
  },
  created () {
    if (!(this.filteredGroupInformation.hasOwnProperty(this.filterGroup.name))) {
      this.$store.dispatch('mutation/' + GET_FILTER_GROUP_INFORMATION, [this.filterGroup.name, this.filterGroup.href])
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
</style>
