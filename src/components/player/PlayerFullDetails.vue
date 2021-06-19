<template>
  <div>
    <b-card-group deck>
      <player-preview
        :playerImg="playerDetails.image"
        :playerPosition="playerDetails.player_position"
        :teamName="playerDetails.team_name"
        :playerName="playerDetails.full_name"
        :playerID="playerDetails.id"
      ></player-preview>
      <player-additional-details
        :commonName="playerDetails.common_name"
        :nationality="playerDetails.birth_country"
        :dateOfBirth="playerDetails.birth_date"
        :birthCountry="playerDetails.birth_country"
        :height="playerDetails.height"
        :weight="playerDetails.weight"
      ></player-additional-details>
    </b-card-group>
  </div>
</template>

<script>
import PlayerPreview from "./PlayerPreview.vue";
import PlayerAdditionaDetails from "../PlayerAdditionalDetails.vue";
export default {
  components: {
    "player-preview": PlayerPreview,
    "player-additional-details": PlayerAdditionaDetails,
  },
  // data() {
  //   return {
  //     playerDetails: {
  //       id: 3,
  //       player_position: 1,
  //       common_name: "J. Forrest",
  //       full_name: "James Forrest",
  //       birth_date: "07/07/1991",
  //       birth_country: "Scotland",
  //       height: "175 cm",
  //       weight: null,
  //       image: "https://cdn.sportmonks.com/images/soccer/players/8/172104.png",
  //       team_name: "Some Team",
  //     },
  //   };
  // },
    props: {
      playerDetails: {
        type: Object,
        require: true,
      },
    },
};
</script>

<style></style>
