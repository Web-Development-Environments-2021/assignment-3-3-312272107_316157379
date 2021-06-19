<template>
  <div>
    <b-card style="max-width: 20rem;">
      <b-list-group>
        <b-card-title>League Details</b-card-title>
        <b-list-group-item
          v-for="(value, key, index) in leagueDetails"
          v-bind:key="index"
          >{{ value }}</b-list-group-item
        >
      </b-list-group>
    </b-card>
    <span>Next Match</span>
    <match-preview
      :matchesToDisplay="[nextMatch]"
      :enableAddToFavorites="true"
    ></match-preview>
  </div>
</template>

<script>
import MatchPreview from "./MatchesInTable.vue";
export default {
  data() {
    return {
      leagueDetails: {
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
  async mounted() {
    const league_details = await this.getLeagueDetails();
    this.leagueDetails.league = league_details.league_name;
    this.leagueDetails.season = league_details.current_season_name;
    this.leagueDetails.stage = league_details.current_stage_name;
    this.nextMatch = league_details.next_match_details;
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
