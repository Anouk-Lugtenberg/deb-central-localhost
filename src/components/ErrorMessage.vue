<template>
  <b-row class="justify-content-center pt-5">
    <b-col cols="10">
      <b-card bg-variant="danger" text-variant="white" class="text-center">
        <p class="error-font">
          Woops! Something went wrong while processing your request
        </p>
        <p>
          {{ error.status }} - {{ error.statusText }}
        </p>
        <b-button @click="goHome()">Home</b-button>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { SET_ERROR } from '../store/mutations'

export default {
  name: 'ErrorMessage',
  props: ['error'],
  methods: {
    goHome () {
      this.$router.push({
        name: 'Home'
      })
      this.$store.commit(SET_ERROR, '')
    }
  }
}
</script>

<style scoped>
.error-font {
  font-weight: bold;
}
</style>
