<template>
  <div>
    <ul class="list-inline">
      <template v-for="filter in filterGroup">
        <li v-if="filter.activeFilter" class="list-inline-item active-filter custom-border" @click="filter.activeFilter = false">
          <small>{{ filter.name }}</small>
          <font-awesome-icon icon="times" class="fa-icon small"></font-awesome-icon>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ActiveFilters',
  props: ['filterGroup']
}
</script>

<style scoped>
.active-filter {
  padding: 0.1em 0.3em 0.3em;
  border: solid 1px;
  margin-bottom: 0.2em;
}

.custom-border {
  padding-top: 0;
  padding-bottom: 0;
  border-radius: 25px;
  background-color: #ededed;
  color: black;
  font-weight: bold;
  font-size: 17px;
}
.active-filter:hover {
  cursor: pointer;
  background-color: #dc3545;
}
</style>
