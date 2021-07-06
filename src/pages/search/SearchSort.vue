<template>
  <div>
    <b-form-select v-model="sortBy" :options="sortOptions"></b-form-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortBy: null,
      sortOptions: [
        { value: null, text: "Sort by", disabled: true },
        { value: null, text: "No filter" },
        { value: "full_name", text: "Player Name" },
        { value: "team_name", text: "Team Name" },
      ],
    };
  },

  methods: {
    sortPlayers(searchResults) {
      return this.sortBy == null ? searchResults : searchResults.sort(this.dynamicSort(this.sortBy));
    },
    dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function(a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
