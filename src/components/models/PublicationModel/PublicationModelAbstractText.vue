<template>
  <p class="card-text abstract-text">
    <span v-if="textCollapsed">
      {{ substringAbstractText }}...
      <a href="#!" @click="expandText()">[expand]</a>
    </span>
    <span v-else-if="!textCollapsed">
      {{ abstractText }} <a href="#!" @click="expandText()">[collapse]</a>
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
      this.substringAbstractText = this.abstractText.substring(0, this.abstractText.lastIndexOf(' ', 100))
      this.textCollapsed = true
    }
  },
  methods: {
    expandText () {
      this.textCollapsed = !this.textCollapsed
    }
  }
}
</script>

<style scoped>
  .abstract-text {
    font-size: 14px;
  }
  .expand-text {
    font-weight: bold;
    font-size: 16px;
  }
  .expand-text:hover {
    cursor: pointer;
  }
</style>
