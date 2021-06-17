<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <league-info></league-info>
        </b-col>
        <b-col>
          <login-page v-if="!$store.state.username"></login-page>
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
import FavoriteMatches from "../components/MatchesInTable.vue";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    "league-info": LeagueInfo,
    "login-page": LoginPage,
    "favorite-matches": FavoriteMatches,
  },
  data() {
    return {
      userLoggedIn: this.$store.state.username,
      threeFavoriteMatches: []
    };
  },
  watch: {
    userLoggedIn: {
      immediate: true,
      deep: true,
      handler() {
        this.getFavoriteMatches();
        },
    },
  },
  methods: {
    getFavoriteMatches: async function(){
      let allFavoriteMatches = await this.$store.actions.updateMatches();
      this.threeFavoriteMatches = allFavoriteMatches.slice(0, 3);
    }
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
