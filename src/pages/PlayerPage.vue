<template>
  <div>
    <player-preview
      :playerImg="playerDetails.image"
      :playerPosition="playerDetails.player_position"
      :teamName="playerDetails.team_name"
      :playerName="playerDetails.full_name"
      :playerID="playerDetails.id"
    ></player-preview>
  </div>
</template>

<script>
import PlayerPreview from "./previews/PlayerPreview.vue";
export default {
  components: {
    "player-preview": PlayerPreview,
  },
  data() {
    return {
        playerDetails: {
            id: 3,
            image: "https://cdn.sportmonks.com/images/soccer/players/8/172104.png",
            player_position: 1, 
            team_name: 'Some Team',
            full_name: 'Some Guy'
        }
    };
  },
//   props: {
//     playerDetails: {
//       type: Object,
//       require: true,
//     },
//   },
};
</script>

<style></style>
