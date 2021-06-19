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
  methods: {
    async getFavoriteMatches() {
      this.allFavoriteMatches = await this.updateMatches();
    },
  },
  async created() {
    await this.getFavoriteMatches();
  },
};
</script>

<style></style>
