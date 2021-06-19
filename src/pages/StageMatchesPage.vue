<template>
  <div>
    <past-future-matches
      :header="`Matches In ${currentStage} Stage`"
      :lead="lead"
      :pastMatches="pastMatches"
      :futureMatches="futureMatches"
    ></past-future-matches>
  </div>
</template>

<script>
import PastFutureMatches from "../components/matches/PastFutureMatches.vue";
export default {
  components: {
    "past-future-matches": PastFutureMatches,
  },
  data() {
    return {
      currentStage: "",
      pastMatches: [],
      futureMatches: [],
      lead:
        "This page displays matches in the current stage. \
            Matches that have already taken place also have an option to display and event log and a score",
    };
  },
  methods: {
    async getMatchesInStage() {
      try {
        if (this.$store.state.matchesInStageFresh) {
          this.pastMatches = this.$store.state.matchesInStage.past_matches;
          this.futureMatches = this.$store.state.matchesInStage.future_matches;
        } else {
          let matchesInStage = await this.axios
            .get(`${this.axios.defaults.baseURL}/matches/${this.currentStage}`)
            .then((matches) => matches.data);
          if (!this.isObjectEmpty(matchesInStage)) {
            this.pastMatches = matchesInStage.past_matches;
            this.futureMatches = matchesInStage.future_matches;
            this.$store.actions.setProperty("matchesInStage", matchesInStage);
            this.$store.state.matchesInStageFresh = true;
          }
        }
      } catch (error) {
        console.log(error.message);
        this.$root.toast("Matches In Stage", error.message, "danger");
      }
    },
  },
  async created() {
    const leagueDetails = await this.getLeagueDetails();
    this.currentStage = leagueDetails.current_stage_name;
    await this.getMatchesInStage();
  },
};
</script>

<style></style>
