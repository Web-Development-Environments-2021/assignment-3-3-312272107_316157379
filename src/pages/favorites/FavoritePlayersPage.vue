<template>
  <div>
    <b-jumbotron
      header="Watch Your Favorite Players Here"
    >
    </b-jumbotron>
    <favorite-players
      :players=""
    >
    </favorite-players>
  </div>
</template>

<script>
import FavoritePlayers from "../../components/player/PlayerCollection.vue";
export default {
  components: {
    "favorite-players": FavoritePlayers,
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
