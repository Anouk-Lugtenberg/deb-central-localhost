<template>
  <div>
    <span v-if="showPropertyName">
      {{ property.label }}:
    </span>
    {{ information[property.name] }}
  </div>
</template>

<script>
export default {
  name: 'FieldTypeOther',
  props: ['information', 'property', 'showPropertyName']
}
</script>

<style scoped>

</style>
