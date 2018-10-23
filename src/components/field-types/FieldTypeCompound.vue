<template>
  <div>
    <div class="property-label clickable" @click="changeExpansion()">
      <span v-if="compoundVisible">
        <font-awesome-icon icon="caret-down" class="fa-icon"></font-awesome-icon>
      </span>
      <span v-else>
        <font-awesome-icon icon="caret-right" class="fa-icon"></font-awesome-icon>
      </span>
      {{ property.label }}
    </div>
    <div v-if="compoundVisible" class="property-label">
      <div v-for="compoundField in property.attributes">
        <field-types :property="compoundField" :information="information" :entity="entity"></field-types>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldTypeCompound',
  props: ['information', 'property', 'entity'],
  data () {
    return {
      compoundVisible: false
    }
  },
  methods: {
    changeExpansion () {
      this.compoundVisible = !this.compoundVisible
    }
  }
}
</script>

<style scoped>
  .property-label {
    background-color: #f6f8fa;
    border-radius: 5px;
  }
  .clickable {
    cursor: pointer;
  }
</style>
