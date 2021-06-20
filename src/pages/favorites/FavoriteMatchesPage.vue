<template>
  <div>
    <b-jumbotron
      header="Watch Your Favorite Matches Here"
    >
    </b-jumbotron>
    <favorite-matches
      :matchesToDisplay="allFavoriteMatches"
      :enableAddToFavorites="false"
    >
    </favorite-matches>
  </div>
</template>

<script>
import FavoriteMatches from "../components/matches/MatchesInTable.vue";
export default {
  components: {
    "favorite-matches": FavoriteMatches,
  },
  data() {
    return {
      allFavoriteMatches: [],
    };
  },
  async created() {
    this.allFavoriteMatches = await this.getFavorites('match');
  },
};
</script>

<style></style>
