<template>
  <div>
    <b-card style="max-width: 20rem;">
      <b-list-group>
        <b-card-title>League Details</b-card-title>
        <b-list-group-item
          v-for="(value, key, index) in league_details"
          v-bind:key="index"
          >{{ value }}</b-list-group-item
        >
      </b-list-group>
      <b-card-body title="Next Match">
        <match-preview
          v-if="!isObjectEmpty(nextMatch)"
          :homeTeam="nextMatch.home_team"
          :awayTeam="nextMatch.away_team"
          :date_time="nextMatch.match_date_time"
        ></match-preview>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import MatchPreview from "./MatchPreview.vue";
export default {
  data() {
    return {
      league_details: {
        league: "",
        season: "",
        stage: "",
      },
      nextMatch: {},
    };
  },
  components: {
    "match-preview": MatchPreview,
  },
  methods: {
    async getLeagueDetails() {
      try {
        if (!this.$store.actions.hasProperty("leagueDetails")) {
          //first time retrieving league details
          let league_details = await this.axios.get(
            `${this.axios.defaults.baseURL}/league/details`
          );
          this.league_details.league = league_details.data.league_name;
          this.league_details.season = league_details.data.current_season_name;
          this.league_details.stage = league_details.data.current_stage_name;
          this.nextMatch = league_details.data.next_match_details;

          this.$store.actions.setProperty("leagueDetails",this.league_details);
          this.$store.actions.setProperty("nextMatch",this.nextMatch);
        } else {
          this.league_details = this.$store.state.league_details;
          this.nextMatch = this.$store.state.nextMatch;
        }
      } catch (err) {
        console.log(err);
      }
    },
    isObjectEmpty(obj) {
      return this.$store.actions.isObjectEmpty(obj);
    },
  },
  mounted() {
    this.getLeagueDetails();
  },
};
</script>

<style>
.league-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: rgb(44, 89, 116);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}
</style>
