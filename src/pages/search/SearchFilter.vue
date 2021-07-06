<template>
  <div>

    <!-- FILTER OPTIONS  -->
    <b-form-select v-model="filterBy" :options="filterOptions"> </b-form-select>

    <!-- POSITION FILTER  -->
    <b-form-select
      v-show="filterBy == 'position'"
      v-model="positionFilter"
      :options="positionFilterOptions"
      multiple
      :select-size="4"
    >
    </b-form-select>

    <!-- TEAM NAME FILTER  -->
    <b-form-select
      v-show="filterBy == 'team_name'"
      v-model="teamNameFilter"
      :options="teamNames"
      multiple
      :select-size="4"
    >
    </b-form-select>
  </div>
</template>

<script>
import teamNames from "../../assets/teamsNames";
export default {
  data() {
    return {
      // filter
      filterBy: null,
      teamNames: [],
      positionFilter: [1],
      teamNameFilter: [""],
      filterOptions: [
        { value: null, text: "Filter by", disabled: true },
        { value: null, text: "No filter" },
        { value: "position", text: "Player Position" },
        { value: "team_name", text: "Team Name" },
      ],

      positionFilterOptions: [
        { value: null, text: "Choose a player position", disabled: true },
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
      ],


    };
  },
  methods: {
    filterPlayers(searchResults) {
      return this.filterBy == null 
        ? searchResults
        : this.filterBy == "position"
        ? searchResults.filter( (player) => this.positionFilter.includes(player.player_position))
        : searchResults.filter( (player) => this.teamNames.includes(player.team_name))
    },
  },
  mounted() {
    this.teamNames.push(...teamNames);
  },
};
</script>

<style lang="scss" scoped></style>
