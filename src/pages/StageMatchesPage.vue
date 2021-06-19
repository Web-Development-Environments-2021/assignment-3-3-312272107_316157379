<template>
  <div>
    <b-jumbotron bg-variant="secondary" text-variant="white" border-variant="dark">
      <template #header>Matches In {{ currentStage }} Stage</template>

      <template #lead>
        This page displays matches in the current stage. Matches that have
        already taken place also have an option to display and event log and a
        score.
      </template>

      <hr class="my-4" />

      <p>
        Past Matches
      </p>

      <matches-table
        :matchesToDisplay="pastMatches"
        :enableAddToFavorites="false"
      ></matches-table>
      <hr class="my-4" />

      <p>
        Upcoming Matches
      </p>

      <matches-table
        :matchesToDisplay="futureMatches"
        :enableAddToFavorites="true"
      ></matches-table>
    </b-jumbotron>
  </div>
</template>

<script>
import MatchesInTable from "../components/MatchesInTable.vue";
export default {
  components: {
    "matches-table": MatchesInTable,
  },
  data() {
    return {
      currentStage: "",
      pastMatches: [],
      futureMatches: [],
    };
  },
  methods: {
    async getMatchesInStage() {
      try {
        if (this.$store.state.matchesInStageFresh) {
          this.pastMatches = this.$store.state.matchesInStage.past_matches;
          this.futureMatches= this.$store.state.matchesInStage.future_matches ;
        } else {
          let matchesInStage = await this.axios
            .get(
              `${this.axios.defaults.baseURL}/matches/${this.currentStage}`
            ).then(matches => matches.data);
          if(!this.isObjectEmpty(matchesInStage)){
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
