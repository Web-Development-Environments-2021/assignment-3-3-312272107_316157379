<template>
  <div class="main_div">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <league-info></league-info>
        </b-col>
        <b-col>
          <login-page v-if="!$store.state.username" v-on:loginSuccessful="getFavoriteMatches"></login-page>
          <favorite-matches
            v-else
            :matchesToDisplay="threeFavoriteMatches"
            :enableAddToFavorites="false"
          ></favorite-matches>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteMatches from "../components/matches/MatchesInTable.vue";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    "league-info": LeagueInfo,
    "login-page": LoginPage,
    "favorite-matches": FavoriteMatches,
  },
  data() {
    return {
      threeFavoriteMatches: [],
    };
  },

  methods: {
    async getFavoriteMatches() {
      let allFavoriteMatches = await this.getFavorites('match');
      this.threeFavoriteMatches = allFavoriteMatches.future_matches.slice(0, 3);
    },
  },
  async created() {
    if(this.$store.state.username){
      this.getFavoriteMatches();
    }
  },
};
</script>

<style>

</style>
