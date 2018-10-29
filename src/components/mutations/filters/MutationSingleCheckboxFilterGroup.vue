<template>
  <div>
    <input type="checkbox" v-model="singleCheckboxInformation.activeFilter" :id="singleCheckboxInformation.name">
    <span>
      {{ singleCheckboxInformation.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'MutationSingleCheckboxFilterGroup',
  props: ['singleCheckboxInformation']
}
</script>

<style scoped>

</style>
