<template>
  <div>
    <component
      :is="searchCategory"
      v-bind="currentProperties"
    ></component>
  </div>
</template>

<script>
import playercollection from "../../components/player/PlayerCollection.vue";
import teamCollection from "../../components/team/TeamCollection.vue";
import matchCollection from "../../components/matches/PastFutureMatches.vue";
export default {
  components: {
    'player': playercollection,
    'team': teamCollection,
    'match': matchCollection,
  },
  props: {
    searchResults: {
      type: Array,
      required: true,
    },
    searchCategory: {
      type: String,
      required: true,
    },
  },
  computed: {
    currentProperties() {
      switch (this.searchCategory) {
        case "team":
          return { teams: this.searchResults, enableAddToFavorites: true };
        case "player":
          return { players: this.searchResults, enableAddToFavorites: true };
        case "match":
          return {
            matchesToDisplay: this.searchResults,
          };
        default:
          return {};
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
