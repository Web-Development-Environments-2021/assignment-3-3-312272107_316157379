<template>
  <div>
    <team-preview :teamLogo="teamDetails.team_logo" :teamName="teamDetails.team_name"></team-preview>
    <player-collection :players="playersDetails" :playersTeam="teamDetails.team_name"></player-collection>
    <past-future-matches
      :header="`Matches of team ${teamDetails.team_name}`"
      :lead="lead"
      :pastMatches="pastMatches"
      :futureMatches="futureMatches"
    ></past-future-matches>
  </div>
</template>

<script>
import PastFutureMatches from "../components/matches/PastFutureMatches.vue"
import PlayerCollection from "../components/player/PlayerCollection.vue";
import TeamPreview from "../components/team/TeamInfoPreview.vue";
export default {
  components: {
    "past-future-matches": PastFutureMatches,
    "player-collection": PlayerCollection,
    "team-preview": TeamPreview,
  },
  data() {
    return {
      playersDetails: [],
      teamDetails: {},
      pastMatches: [],
      futureMatches: [],
      lead: "This page displays the team's players and matches.",
      teamID: 939, // for testing
    };
  },
//   props: {
//     teamID: {
//       type: Number,
//       require: true,
//     },
//   },
  methods: {
    async getTeamDetails() {
      try {
        if (this.$store.state.teamDetails) {
          this.pastMatches = this.$store.state.teamDetails.match_details.past_matches;
          this.futureMatches = this.$store.state.teamDetails.match_details.future_matches;
          this.teamDetails = this.$store.state.teamDetails.team_details;
          this.playersDetails = this.$store.state.teamDetails.players_details
        } else {
          let teamDetails = await this.axios
            .get(
              `${this.axios.defaults.baseURL}/teams/get_page_details/${this.teamID}`
            )
            .then((teamDetails) => teamDetails.data);
            this.pastMatches = teamDetails.match_details.past_matches;
            this.futureMatches = teamDetails.match_details.future_matches;
            this.teamDetails = teamDetails.team_details;
            this.playersDetails = teamDetails.players_details;
            this.$store.actions.setProperty("teamDetails", teamDetails);
        }
      } catch (error) {
        console.log(error.message);
        this.$root.toast("Team Details", error.message, "danger");
      }
    },
  },
  async mounted() {
    await this.getTeamDetails();
  },
};
</script>

<style></style>
