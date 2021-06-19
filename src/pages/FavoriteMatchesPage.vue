<template>
  <div>
      <favorite-matches  :favoritesMatches="allFavoriteMatches" :enableAddToFavorites="false" >
          
      </favorite-matches>
  </div>
</template>

<script>
import FavoriteMatches from "../components/MatchesInTable.vue";
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
  created() {
    this.getFavoriteMatches();
  },
};
</script>

<style>

</style>