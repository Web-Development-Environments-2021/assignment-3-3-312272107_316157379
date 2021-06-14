<template>
  <div>
    <b-jumbotron
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
        let favorite_matches = JSON.parse(
          this.$root.store.inLocalStorage("favoriteMatches")
        );
        if (favorite_matches == null) {
          favorite_matches = await this.axios
            .get(`${this.axios.defaults.baseURL}/users/favorites/match`)
            .then((favorite_matches) => favorite_matches.data);
          this.three_favorite_matches = favorite_matches.slice(0, 3);
          localStorage.setItem(
            "favoriteMatches",
            JSON.stringify(favorite_matches)
          ); //more than three
        } else {
          // localStorage.removeItem('favoriteMatches');
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
