<template>
  <div>
    <create-match v-on:add-match="addMatch"></create-match>
    <past-future-matches
      :header="`Matches In ${leagueName} `"
      :lead="lead"

      :pastMatches="pastMatches"
      :futureMatches="futureMatches"
    ></past-future-matches>

  </div>
</template>

<script>
import CreateMatch from '../components/matches/CreateMatch.vue';
import PastFutureMatches from "../components/matches/PastFutureMatches.vue";
export default {
  components: {
    "create-match": CreateMatch,
    "past-future-matches": PastFutureMatches,
  },
  data() {
    return {
      currentStage: "",
      leagueName: "",
      pastMatches: [],
      futureMatches: [],
      lead:
        "This page displays matches in the league. \
            Matches that have already taken place also have an option to display and event log and a score.\
            you can also add matches,event log, and update the score.",
    };
  },
  methods: {
    async getMatchesInLeague() {
      try {
        if (this.$store.state.matchesInLeagueFresh) {
          this.pastMatches = this.$store.state.matchesInLeague.past_matches;
          this.futureMatches = this.$store.state.matchesInLeague.future_matches;
        } else {
          let matchesInLeague = await this.axios
            .get(`${this.axios.defaults.baseURL}/league/${this.$store.state.leagueID}/matches`)
            .then((matches) => matches.data);
          if (!this.isObjectEmpty(matchesInLeague)) {
            this.pastMatches = matchesInLeague.past_matches;
            this.futureMatches = matchesInLeague.future_matches;
            this.$store.actions.setProperty("matchesInLeague", matchesInLeague);
            this.$store.state.matchesInLeagueFresh = true;
          }
        }
      } catch (error) {
        console.log(error.message);
        this.$root.toast("Matches In League", error.message, "danger");
      }
    },
    async addMatch(matchDetails){
      try{
        let addMatchMessage = await this.axios
            .post(`${this.axios.defaults.baseURL}/roles/union_rep_role/matches`,
          {
            date_time : matchDetails.date,
            home_team_name  : matchDetails.home_team_name,
            away_team_name  : matchDetails.away_team_name,
            stage : this.currentStage,
          });
          console.log(addMatchMessage);
      } catch (error) {
        console.log(error.message);
        this.$root.toast("add match", error.message, "danger");
      }
    }
  },
  async created() {
    const leagueDetails = await this.getLeagueDetails();
    this.currentStage = leagueDetails.current_stage_name;
    this.leagueName = leagueDetails.league_name;
    await this.getMatchesInLeague();
  },
};
</script>

<style></style>
