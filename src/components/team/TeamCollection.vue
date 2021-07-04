<template>
  <div>
    <b-container v-if="teams.length > 0">
      <team-preview
        v-for="team in teams"
        :key="team.id"
        :teamName="team.team_name"
        :teamLogo="team.logo"
      >
      </team-preview>
    </b-container>

    <b-jumbotron
      header="No Teams To Display"
      v-else
    >
    </b-jumbotron>
  </div>
</template>

<script>
import TeamPreview from "./TeamPreview.vue";
export default {
  components: {
    "team-preview": TeamPreview,
  },
  props: {
    teams: {
      type: Array,
      require: true,
    },
    enableAddToFavorites: {
      type: Boolean,
      default: true,
    }
  },
};
</script>

<style></style>
