<template>
  <div>
    <b-jumbotron
      v-if="three_favorite_matches.length > 0"
      lead="Your Favorite Matches"
    >
      <match-preview
        v-for="match in three_favorite_matches"
        :homeTeam="match.home_team"
        :awayTeam="match.away_team"
        :date_time="match.match_date_time"
        :key="match.match_id"
      >
      </match-preview>
    </b-jumbotron>
    <b-jumbotron
      header="No Favorite Matches To Display"
      lead="Navigate to favorites matches page to add favorites"
      v-else
    >
      <!-- <b-button variant="primary" href="#">Favorite Matches</b-button> -->
      <router-link to="/" tag="button">Favorite Matches</router-link>
    </b-jumbotron>
  </div>
</template>

<script>
import MatchPreview from "./MatchPreview.vue";
export default {
  name: "FavoriteMatches",
  components: {
    "match-preview": MatchPreview,
  },
  data() {
    return {
      three_favorite_matches: [],
    };
  },
  methods: {
    async updateMatches() {
      try {
        if (this.$store.actions.hasProperty("favoriteMatches")) {
          let favorite_matches = await this.axios
            .get(`${this.axios.defaults.baseURL}/users/favorites/match`)
            .then((favorite_matches) => favorite_matches.data);
          this.three_favorite_matches = favorite_matches.slice(0, 3);
          this.$store.actions.setProperty("favoriteMatches");
        } else {
          this.three_favorite_matches = favorite_matches.slice(0, 3);
        }
      } catch (error) {
        console.log("error in update matches");
        console.log(error.message);
      }
    },
  },
  created() {
    this.updateMatches();
  },
};
</script>

<style></style>
