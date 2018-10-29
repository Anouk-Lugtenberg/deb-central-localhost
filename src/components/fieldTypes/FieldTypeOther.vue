<template>
  <div>
    {{ property.label }}: {{ information[property.name] }}
  </div>
</template>

<script>
export default {
  name: 'FieldTypeOther',
  props: ['information', 'property']
}
</script>

<style scoped>

</style>
