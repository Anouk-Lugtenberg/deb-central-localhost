<template>
  <div>
    <moon-loader :size="size" :color="color" class="loader"></moon-loader>
    <div class="text-loader">{{ textForLoader }}</div>
  </div>
</template>

<script>
/* https://github.com/greyby/vue-spinner */
import MoonLoader from 'vue-spinner/src/MoonLoader'

export default {
  name: 'BeatLoader',
  props: {
    size: {
      type: String,
      default: '20px'
    },
    color: {
      type: String,
      default: '#1380b5'
    },
    textForLoader: {
      type: String
    }
  },
  components: {
    'moon-loader': MoonLoader
  }
}
</script>

<style scoped>
  .loader {
    display: inline-block;
    vertical-align: top;
  }
  .text-loader {
    display: inline-block;
  }
</style>
