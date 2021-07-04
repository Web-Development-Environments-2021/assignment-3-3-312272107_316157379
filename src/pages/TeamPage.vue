<template>
  <div v-if="dataLoaded">
    <team-preview
      
      :teamLogo="teamDetails.team_logo"
      :teamName="teamDetails.team_name"
    ></team-preview>
    <player-collection
    
      :players="playersDetails"
      :playersTeam="teamDetails.team_name"
    ></player-collection>
    <past-future-matches
    
      :header="`Matches of team ${teamDetails.team_name}`"
      :lead="lead"
      :pastMatches="pastMatches"
      :futureMatches="futureMatches"
    ></past-future-matches>
  </div>
</template>

<script>
import PastFutureMatches from "../components/matches/PastFutureMatches.vue";
import PlayerCollection from "../components/player/PlayerCollection.vue";
import TeamPreview from "../components/team/TeamPreview.vue";
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
      dataLoaded: false,
    };
  },
  props: {
    id: {
      type: Number,
    },
  },
  computed: {
    teamName(){
      return this.$route.params.team_name;
    }
  },
  methods: {
    async getTeamDetails() {
      try {
        let teamID = await this.getTeamID();
        let teamDetails = await this.axios
          .get(
            `${this.axios.defaults.baseURL}/teams/get_page_details/${teamID}`
          )
          .then((teamDetails) => teamDetails.data);
        this.pastMatches = teamDetails.match_details.past_matches;
        this.futureMatches = teamDetails.match_details.future_matches;
        this.teamDetails = teamDetails.team_details;
        this.playersDetails = teamDetails.players_details;
        this.dataLoaded = true;
      } catch (error) {
        console.log(error.message);
        this.$root.toast("Team Details", error.message, "danger");
      }
    },
    async getTeamID() {
      if (this.id) {
        return this.id;
      } else {
        try {
          return await this.axios
            .get(`${this.axios.defaults.baseURL}/teams/${this.teamName}`)
            .then((teamDetails) => teamDetails.data.id);
        } catch {
          console.log(error.message);
          this.$root.toast("Team ID; Team Details", error.message, "danger");
        }
      }
    },
  },
  async created() {
    await this.getTeamDetails();
  },
};
</script>

<style></style>
