<template>
  <div>
    <b-table
      v-if="matchesToDisplayAfterSplit.length > 0"
      :items="matchesToDisplayAfterSplit"
      :fields="fields"
      small
    >
      <!-- hopefully all the other cells just render normally  -->


      <template #cell(home_team)="data">
        <router-link
          to="{ name: 'teamPage', params: {teamName: data.value }}"
          exact
          >{{ data.value }}</router-link
        >
      </template>

      <template #cell(away_team)="data">
        <router-link
          to="{ name: 'teamPage', params: {teamName: data.value }}"
          exact
          >{{ data.value }}</router-link
        >
      </template>

      <template #cell(score)="data">
        <span v-if="matchOver(data.item)">{{
          score(data.item.home_team_goals, data.item.away_team_goals)
        }}</span>
        <span v-else>NA</span>
      </template>

      <template #cell(event_log)="data">
        <b-button
          :disabled="!matchHasEventLog(data.item)"
          @click="toggleEventLog(data.item.event_log)"
          size="sm"
          variant="info"
          >{{ displayEventLog ? "Hide" : "Show" }} Event Log</b-button
        >
      </template>

      <template #cell(addFavorite)="data">
        <b-button
          :disabled="! enableAddToFavorites"
          @click="addToFavorites(data.item.match_id, 'match')"
            size="sm"
          variant="primary"
        >
        Add to Favorites
        </b-button>
      </template>
    </b-table>

    <b-jumbotron
      header="No Matches To Display"
      lead="Navigate to current stage matches page to view matches and to add them to your favorites"
      v-else
    >
      <!-- <b-button variant="primary" href="#">Favorite Matches</b-button> -->
      <router-link to="/" tag="button">Matches Page</router-link>
    </b-jumbotron>

    <event-log v-if="displayEventLog" :eventLog="currentEventLog"></event-log>
  </div>
</template>

<script>
import EventLog from "./EventLog.vue";
export default {
  components: {
    "event-log": EventLog,
  },
  data() {
    return {
      currentEventLog: [],
      matchesToDisplayAfterSplit: [],
      fields: [
        "index",
        "home_team",
        "away_team",
        "date",
        "time",
        "score",
        "venue",
        "event_log",
        "addFavorite",
      ],
    };
  },
  props: {
    matchesToDisplay: {
      type: Array,
      required: true,
    },
    enableAddToFavorites: {
      // favorites page doesn't enable favorites and stage matches page does
      type: Boolean,
      require: true,
    },
  },
  watch: {
    matchesToDisplay: {
      immediate: true,
      handler() {
        if (this.$store.actions.isObjectEmpty(this.matchesToDisplay[0])) {
          return;
        }
        this.splitDateTime();
      },
    },
  },
  computed: {
    displayEventLog: function() {
      return this.currentEventLog.length > 0;
    },
  },
  methods: {
    splitDateTime() {
      let tmpMatches = this.matchesToDisplay;
      this.matchesToDisplayAfterSplit = tmpMatches.map((match) => {
        let date_time_split = match.match_date_time.split("T");
        match.date = date_time_split[0];
        match.time = date_time_split[1].substring(0, 8);
        return match;
      });
    },
    toggleEventLog(newEventLog) {
      if (this.currentEventLog.length == 0) {
        // none displayed
        this.currentEventLog = newEventLog;
      } else if (
        this.$store.actions.areObjectsEqual(this.currentEventLog, newEventLog)
      ) {
        // hide event log being displayed after two clicks
        this.currentEventLog = [];
      } else {
        // show new event log
        this.currentEventLog = newEventLog;
      }
    },
    score: function(homeTeamGoals, awayTeamGoals) {
      return homeTeamGoals.toString() + "-" + awayTeamGoals.toString();
    },
    matchOver: function(currentMatch) {
      return currentMatch.is_over == true;
    },
    matchHasEventLog: function(currentMatch) {
      return (
        this.matchOver(currentMatch) &&
        currentMatch.hasOwnProperty("event_log")
      );
    },
    async addToFavorites(matchID,matchCategory){
      try{
        await this.$store.actions.addToFavorites(matchID,matchCategory);
        this.$root.toast('Add favorite', 'New match has been added to your favorites.', 'success');
      }
      catch(error){
        this.$root.toast('Add favorite', error.message, 'danger');
      }

    }
  },
};
</script>

<style></style>
