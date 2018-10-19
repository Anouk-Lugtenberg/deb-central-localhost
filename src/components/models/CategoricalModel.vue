<template>
  <div>
    Entity: {{ entity }}
    Name: {{ name }}
    Attribute: {{ attribute }}
  </div>
</template>

<script>
export default {
  name: 'CategoricalModel',
  props: ['entity', 'name', 'attribute']
}
</script>

<style scoped>

</style>
