<template>
  <div>
    <b-card-group v-if="players.length > 0">
      <player-preview
        v-for="(player, index) in players"
        :key="index"
        :playerID="player.id"
        :playerImg="player.image"
        :playerName="player.full_name"
        :playerPosition="player.player_position"
        :inFavorites="!enableAddToFavorites || player.in_favorites"
        :teamName="playersTeam ? playersTeam : player.team_name"
      ></player-preview>
    </b-card-group>
    <b-jumbotron
      header="No Players To Display"
      v-else
    >
    </b-jumbotron>
  </div>
</template>

<script>
import PlayerPreview from "./PlayerPreview.vue";
export default {
  components: {
    "player-preview": PlayerPreview,
  },
  props: {
    players: {
      type: Array,
      require: true,
    },
    playersTeam: {
      type: String,
    },
    enableAddToFavorites: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style></style>
