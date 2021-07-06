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

      <b-input-group-append>
        <b-button variant="success" @click="search()">Search</b-button>
      </b-input-group-append>
    </b-input-group>

    <!-- filter and sort -->
    <search-post-process
      v-if="displayPostSearchOptions"
      :searchResults="searchResults"
      @postProcessComplete="updateSearchResults"
    >
    </search-post-process>

    <!-- search results display -->
    <search-results
      v-if="searchResultsDisplayedCategory"
      :searchCategory="searchResultsDisplayedCategory"
      :searchResults="alteredSearchResults"
    >
    </search-results>
  </div>
</template>

<script>
import searchResultsComp from "./SearchResults.vue";
import searchPostProcess from "./SearchPostProcess.vue";

export default {
  components: {
    "search-results": searchResultsComp,
    "search-post-process": searchPostProcess,
  },
  data() {
    return {
      lastQuery: "",
      currentQuery: "",
      searchResults: [],
      alteredSearchResults: [],
      searchCategory: null,
      searchResultsDisplayedCategory: "",
      searchOptions: [
        { value: null, text: "Search by", disabled: true },
        { value: "player", text: "Players" },
        { value: "team", text: "Teams" },
      ],
    };
  },
  computed: {
    displayPostSearchOptions() {
      return this.searchResults.length > 0 && this.searchCategory == "player";
    },
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
        if (search_results.length == 0) {
          console.log("no search results");
          throw "";
        }

        this.searchResults = search_results;
        this.alteredSearchResults = search_results;
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
    updateSearchResults(newSearchResults) {
        this.alteredSearchResults = newSearchResults;
      }
  },
  mounted() {
    if (
      this.$store.actions.hasProperty("lastSearchResults") &&
      this.$store.actions.hasProperty("lastSearchQuery") &&
      this.$store.actions.hasProperty("lastSearchCategory")
    ) {
      this.lastQuery = this.$store.state.lastSearchQuery;
      this.searchResults = this.$store.state.lastSearchResults;
      this.alteredSearchResults = this.$store.state.lastSearchResults;
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
