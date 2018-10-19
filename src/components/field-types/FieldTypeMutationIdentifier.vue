<template>
    <span>
      <router-link :to="{name: 'Mutation', params: {id: mutationIdentifier }}">{{ mutationIdentifier }}</router-link>
    </span>
</template>

<script>
export default {
  name: 'FieldTypeMutationIdentifier',
  props: ['mutationIdentifier']
}
</script>

<style scoped>

</style>
