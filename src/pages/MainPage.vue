<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <LeagueInfo></LeagueInfo>
        </b-col>
        <b-col>
          <LoginPage v-if="!$root.store.username"></LoginPage>
          <FavoriteGames v-else></FavoriteGames>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LeagueInfo,
    LoginPage,
    FavoriteGames,
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
