<template>
  <div>
    <h1 class="title">Search Page</h1>
    <h2 v-show="lastQuery != ''">Your last query was: {{ lastQuery }}</h2>
    <b-input-group prepend="Search Query:" id="search-input">
      <!-- SEARCH CATEGORY  -->
      <b-form-input v-model="currentQuery"></b-form-input>
      <b-input-group-append>
        <b-form-select v-model="searchCategory" :options="searchOptions">
        </b-form-select>
      </b-input-group-append>

      <!-- FILTER OPTIONS  -->
      <div v-show="searchCategory == 'player'">
        <b-input-group-append>
          <b-form-select v-model="filterBy" :options="filterOptions">
          </b-form-select>
        </b-input-group-append>

        <!-- POSITION FILTER  -->
        <b-input-group-append v-show="filterBy == 'position'">
          <b-form-select
            v-model="positionFilter"
            :options="positionFilterOptions"
            multiple
            :select-size="4"
          >
          </b-form-select>
        </b-input-group-append>

        <!-- TEAM NAME FILTER  -->
        <b-input-group-append v-show="filterBy == 'team_name'">
          <b-form-select
            v-model="teamNameFilter"
            :options="teamNames"
            multiple
            :select-size="4"
          >
          </b-form-select>
        </b-input-group-append>

        <!-- SORTING -->
        <b-input-group-append>
          <b-form-select
            v-model="sortBy"
            :options="sortOptions"
          ></b-form-select>
        </b-input-group-append>
      </div>
      <b-input-group-append>
        <b-button variant="success" @click="search()">Search</b-button>
      </b-input-group-append>
    </b-input-group>

    <search-results
      v-if="searchResultsDisplayedCategory"
      :searchCategory="searchResultsDisplayedCategory"
      :searchResults="searchResults"
    >
    </search-results>
  </div>
</template>

<script>
import searchResultsComp from "./SearchResults.vue";
import teamNames from "../../assets/teamsNames";

export default {
  components: {
    "search-results": searchResultsComp,
  },
  data() {
    return {
      lastQuery: "",
      currentQuery: "",

      searchResults: [],
      searchCategory: null,
      searchResultsDisplayedCategory: "",
      searchOptions: [
        { value: null, text: "Search by", disabled: true },
        { value: "player", text: "Players" },
        { value: "team", text: "Teams" },
      ],

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

      sortBy: null,
      sortOptions: [
        { value: null, text: "Sort by", disabled: true },
        { value: null, text: "No filter" },
        { value: "full_name", text: "Player Name" },
        { value: "team_name", text: "Team Name" },
      ],
    };
  },
  methods: {
    async search() {
      try {
        if (this.searchCategory == null || this.currentQuery == "") {
          this.$root.toast(
            "Search",
            "Please choose a search category and enter a query before searching",
            "warning"
          );
          return;
        }
        let search_results = await this.axios
          .get(
            `${this.axios.defaults.baseURL}/search/${this.searchCategory}/${this.currentQuery}`
          )
          .then((res) => res.data);
        if(search_results.length == 0){
          console.log('no search results');
          throw '';
        }

        // let search_results = [
        //   {
        //     id: 23664,
        //     full_name: "Hans Jorge Mulder",
        //     common_name: "H. Mulder",
        //     country: "Netherlands",
        //     birth_date: "27/04/1987",
        //     height: "180 cm",
        //     weight: "76 kg",
        //     image:
        //       "https://cdn.sportmonks.com/images/soccer/players/16/23664.png",
        //     player_position: 3,
        //     team_name: "RKC Waalwijk",
        //     in_favorites: false,
        //   },
        //   {
        //     id: 82959,
        //     full_name: "Hans Henrik Andreasen",
        //     common_name: "H. Andreasen",
        //     country: "Denmark",
        //     birth_date: "10/01/1979",
        //     height: "183 cm",
        //     weight: "72 kg",
        //     image:
        //       "https://cdn.sportmonks.com/images/soccer/players/15/82959.png",
        //     player_position: 3,
        //     team_name: "OB",
        //     in_favorites: false,
        //   },
        //   {
        //     id: 24081697,
        //     full_name: "Hans Christian Bernat",
        //     common_name: "H. Bernat",
        //     country: "Denmark",
        //     birth_date: "13/11/2000",
        //     height: null,
        //     weight: null,
        //     image:
        //       "https://cdn.sportmonks.com/images/soccer/players/1/24081697.png",
        //     player_position: 1,
        //     team_name: "OB",
        //     in_favorites: true,
        //   },
        // ];

        if (this.searchCategory == "player" && this.filterBy != null) {
          search_results = this.filterPlayers(search_results);
        }
        if (this.searchCategory == "player" && this.sortBy != null) {
          search_results = this.sortPlayers(search_results);
        }

        this.searchResults = search_results;
        this.lastQuery = this.currentQuery;
        this.searchResultsDisplayedCategory = this.searchCategory; // Change search results displayed

        this.$store.actions.setProperty("lastSearchQuery", this.currentQuery);
        this.$store.actions.setProperty("lastSearchResults", search_results);
        this.$store.actions.setProperty(
          "lastSearchCategory",
          this.searchCategory
        );
      } catch (error) {
        console.log(error.message);
        this.$root.toast(
          "Matches In Stage",
          "Can't find results for query. Please try again.",
          "warning" 
        );
      }
    },
    filterPlayers(players) {
      if (this.filterBy == "position") {
        return players.filter((player) =>
          this.positionFilter.includes(player.player_position)
        );
      }
      return players.filter((player) =>
        this.teamNames.includes(player.team_name)
      );
    },
    sortPlayers(players) {
      return players.sort(this.dynamicSort(this.sortBy));
    },
    dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1; 
        property = property.substr(1);
      }
      return function(a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    },
  },
  mounted() {
    this.teamNames.push(...teamNames);
    if (
      this.$store.actions.hasProperty("lastSearchResults") &&
      this.$store.actions.hasProperty("lastSearchQuery") &&
      this.$store.actions.hasProperty("lastSearchCategory")
    ) {
      this.lastQuery = this.$store.state.lastSearchQuery;
      this.searchResults = this.$store.state.lastSearchResults;
      this.searchResultsDisplayedCategory = this.$store.state.lastSearchCategory;
    }
  },
};
</script>

<style scoped>
#search-input {
  margin-left: 20px;
  width: 500px;
}
</style>
