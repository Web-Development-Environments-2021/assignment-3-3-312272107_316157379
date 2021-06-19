<template>
  <div>
    <b-jumbotron bg-variant="secondary" text-variant="white" border-variant="dark">
      <template #header>{{header}}</template>

      <template #lead>
        {{lead}}
      </template>

      <hr class="my-4" />

      <p>
        Past Matches
      </p>

      <matches-table
        :matchesToDisplay="pastMatches"
        :enableAddToFavorites="false"
      ></matches-table>
      <hr class="my-4" />

      <p>
        Upcoming Matches
      </p>

      <matches-table
        :matchesToDisplay="futureMatches"
        :enableAddToFavorites="true"
      ></matches-table>
    </b-jumbotron>
  </div>
</template>

<script>
import MatchesInTable from "./MatchesInTable.vue";
export default {
  components: {
    "matches-table": MatchesInTable,
  },
  props: {
        header: {
            type: String,
            require: true 
        },
        lead: {
            type: String
        },
        pastMatches: {
            type: Array,
            require: true 
        },
        futureMatches: {
            type: Array,
            require: true 
        },
  }
};
</script>

<style></style>
