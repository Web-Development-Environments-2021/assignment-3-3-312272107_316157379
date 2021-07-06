<template>
  <div>
    <search-sort ref="sortingComp"></search-sort>
    <search-filter ref="filteringComp"></search-filter>
    <b-button @click="filterAndSort">Filter and sort</b-button>
  </div>
</template>

<script>
import SearchFilter from "./SearchFilter.vue";
import SearchSort from "./SearchSort.vue";
export default {
  components: {
    "search-filter": SearchFilter,
    "search-sort": SearchSort,
  },
  props: {
    searchResults: {
      type: Array,
      required: true,
    },
  },
  methods: {
      filterAndSort(){
          let processedResults = JSON.parse(JSON.stringify(this.searchResults)); // deep copy
          processedResults = this.$refs.filteringComp.filterPlayers(processedResults);
          processedResults = this.$refs.sortingComp.sortPlayers(processedResults);
          this.$emit('postProcessComplete',processedResults);
      }
  }
};
</script>

<style lang="scss" scoped></style>
