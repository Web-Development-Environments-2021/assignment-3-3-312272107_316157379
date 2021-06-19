<template>
  <div>
    <b-card-group deck>
      <player-preview
        v-for="(player, index) in players"
        :key="index"
        :playerID="player.id"
        :playerImg="player.image"
        :playerName="player.full_name"
        :playerPosition="player.position"
        :teamName="playersTeam ? playersTeam : player.teamName"
      ></player-preview>
    </b-card-group>
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
  },
};
</script>

<style></style>
