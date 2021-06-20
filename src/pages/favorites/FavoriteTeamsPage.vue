<template>
  <div>
    <b-jumbotron
      header="Watch Your Favorite Teams Here"
    >
    </b-jumbotron>
    <favorite-teams v-for="team in favoriteTeams" :key="team.id"
      :teamName="team.team_name"
      :teamLogo="team.logo"
    >
    </favorite-teams>
  </div>
</template>

<script>
import FavoriteTeams from "../../components/team/TeamPreview.vue";
export default {
  components: {
    "favorite-teams": FavoriteTeams,
  },
  data() {
    return {
      favoriteTeams: [],
    };
  },
  async created() {
    await this.getFavorites('team');
  },
};
</script>

<style></style>
