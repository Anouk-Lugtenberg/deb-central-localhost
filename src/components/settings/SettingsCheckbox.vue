<template>
  <div>
    <input type="checkbox" v-model="property.fieldIsVisible" :id="property.name"> {{ property.label }}
  </div>
</template>

<script>
export default {
  name: 'SettingsCheckbox',
  props: ['property']
}
</script>

<style scoped>

</style>
