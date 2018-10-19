<template>
  <div>
    Entity: {{ entity }}
    Label: {{ label }}
    Attribute: {{ attribute }}
  </div>
</template>

<script>
export default {
  name: 'MrefModel',
  props: ['entity', 'label', 'attribute']
}
</script>

<style scoped>

</style>
