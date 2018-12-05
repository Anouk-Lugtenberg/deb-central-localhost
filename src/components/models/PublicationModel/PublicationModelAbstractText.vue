<template>
  <p class="card-text abstract-text">
    <span v-if="textCollapsed">
      {{ substringAbstractText }}
      <span class="expand-text" v-on:click="expandText()">...</span>
    </span>
    <span v-else>
      {{ abstractText }}
    </span>
  </p>
</template>

<script>
export default {
  name: 'PublicationModelAbstractText',
  props: ['abstractText'],
  data () {
    return {
      substringAbstractText: '',
      textCollapsed: true
    }
  },
  created () {
    if (this.abstractText.length > 100) {
      console.log('Created')
      this.substringAbstractText = this.abstractText.substring(0, this.abstractText.lastIndexOf(' ', 100))
      this.textCollapsed = true
    }
  },
  methods: {
    expandText () {
      console.log('Expanding text')
      this.textCollapsed = false
    }
  }
}
</script>

<style scoped>
  .abstract-text {
    font-size: 13px;
  }
  .expand-text {
    font-weight: bold;
    font-size: 15px;
  }
  .expand-text:hover {
    cursor: pointer;
  }
</style>
