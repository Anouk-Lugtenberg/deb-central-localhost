<template>
  <div>
    <ul class="list-inline">
      <template v-for="filter in filterGroup">
        <li v-if="filter.activeFilter" class="list-inline-item active-filter" @click="filter.activeFilter = false">
          <small>{{ filter.name }}</small>
          <i title="remove this filter" class="fa fa-times remove-filter-btn"></i>
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

.active-filter:hover {
  cursor: pointer;
  color: red;
}
</style>
