<template>
  <div>
    <span class="font-authors" v-for="(author, index) in listAuthors">
      <span v-if="index === listAuthors.length -1"> {{ author }}.</span>
      <span v-else> {{ author }},</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'PublicationModelAuthors',
  props: ['authors'],
  data () {
    return {
      listAuthors: this.authors.split(';')
    }
  }
}
</script>

<style scoped>
.font-authors {
  font-size: 13px;
  font-weight: bold;
}
</style>
