<template>
  <div>
    <b-jumbotron
      header="Watch Your Favorite Players Here"
    >
    </b-jumbotron>
    <favorite-players
      :players="favoritePlayers"
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
      favoritePlayers: [],
    };
  },
  async created() {
    await this.getFavorites('player');
  },
};
</script>

<style></style>
