<template>
  <div>
    <div>
      <div class="about-section">
        <h1>{{playerDetails.full_name}} : {{playerDetails.player_position}}  </h1>
        <h2>Each player is a whole world, but to really get to know one, you should look at their stats. </h2>
      </div>
    </div>
    <b-card-group deck v-if="dataLoaded">
      <player-preview
        :playerImg="playerDetails.image"
        :playerPosition="playerDetails.player_position"
        :teamName="playerDetails.team_name"
        :playerName="playerDetails.full_name"
        :playerID="playerDetails.id"
        :inFavorites="$route.params.playerInFavorites"
      ></player-preview>
      <player-additional-details
        :commonName="playerDetails.common_name"
        :dateOfBirth="playerDetails.birth_date"
        :birthCountry="playerDetails.country"
        :height="playerDetails.height"
        :weight="playerDetails.weight"
      ></player-additional-details>
    </b-card-group>
    <h2>If you're done watching, Please make use of the navigation bar to choose your next page</h2>
  </div>
</template>

<script>
import PlayerPreview from "../components/player/PlayerPreview.vue";
import PlayerAdditionaDetails from "../components/player/PlayerAdditionalDetails.vue";
export default {
  components: {
    "player-preview": PlayerPreview,
    "player-additional-details": PlayerAdditionaDetails,
  },
 data() {
    return {
      playerDetails: {},
      dataLoaded: false,
    };
  },
  computed: {
    pid(){
      return this.$route.params.player_id;
    },
  },
  methods: {
    async getPlayerDetails() {
      try {
          this.playerDetails = await this.axios
            .get(
              `${this.axios.defaults.baseURL}/players/${this.pid}`
            )
            .then((player) => player.data[0]);
            this.dataLoaded = true;
      } catch (error) {
        console.log(error.message);
        this.$root.toast("Team Details", error.message, "danger");
      }
    },
  },
  async created() {
    await this.getPlayerDetails();
  },
};
</script>

<style>
.about-section {
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
}
</style>
