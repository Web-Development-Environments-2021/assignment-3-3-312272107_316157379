<template>
  <div>
    <b-table
      v-if="matchesToDisplayAfterSplit.length > 0"
      :items="matchesToDisplayAfterSplit"
      :fields="fields"
      small
      striped
      hover
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(home_team)="data">
        <router-link
          :to="{ name: 'teamPage', params: { team_name: data.value } }"
          >{{ data.value }}</router-link
        >
      </template>

      <template #cell(away_team)="data">
        <router-link
          :to="{ name: 'teamPage', params: { team_name: data.value } }"
          >{{ data.value }}</router-link
        >
      </template>

      <template #cell(home_goals)="data">
        <b-dropdown
          v-if="matchOver(data.item)"
          size="sm"
          :text="data.item.home_team_goals.toString()"
          class="m-2"
          variant="primary"
        >
          <b-dropdown-item-button
            v-for="index in 5"
            :key="index"
            :value="index - 1"
            @click="
              updateScore(data.item, data.item.home_team_goals, index-1, true)
            "
            >{{ index - 1 }}
          </b-dropdown-item-button>
        </b-dropdown>
        <span v-else>NA</span>
      </template>

      <template #cell(away_goals)="data">
        <b-dropdown
          v-if="matchOver(data.item)"
          size="sm"
          :text="data.item.away_team_goals.toString()"
          class="m-2"
          variant="primary"
        >
          <b-dropdown-item-button
            v-for="index in 5"
            :key="index"
            :value="index - 1"
            @click="
              updateScore(data.item, data.item.away_team_goals, index-1, false)
            "
            >{{ index - 1 }}
          </b-dropdown-item-button>
        </b-dropdown>
        <span v-else>NA</span>
      </template>

      <template #cell(event_log)="data">
        <b-button
          :disabled="!matchHasEventLog(data.item)"
          @click="toggleEventLog(data.item.event_log, data.index)"
          size="sm"
          variant="info"
          >{{ rowIndOfEventLog == data.index ? "Hide" : "Show" }} Event
          Log</b-button
        >
      </template>

      <template #cell(addFavorite)="data">
        <b-button
          :disabled="disableFavorites"
          @click="addToFavorites(data.item.match_id, 'match')"
          size="sm"
          variant="secondary"
        >
          Add to Favorites</b-button
        >
      </template>
    </b-table>

    <b-jumbotron
      header="No Matches To Display"
      lead="Current Stage Matches Page displays matches and allows you to add them to your favorites"
      v-else
    >
      <!-- <b-button variant="primary" href="#">Favorite Matches</b-button> -->
      <router-link to="/stageMatches" tag="button"
        >Move to Matches Page</router-link
      >
    </b-jumbotron>

    <event-log v-if="displayEventLog" :eventLog="currentEventLog"></event-log>
  </div>
</template>

<script>
import EventLog from "../EventLog.vue";
export default {
  components: {
    "event-log": EventLog,
  },
  data() {
    return {
      rowIndOfEventLog: -1,
      currentEventLog: [],
      matchesToDisplayAfterSplit: [],
      fields: [
        "index",
        "home_team",
        "away_team",
        "date",
        "time",
        "home_goals",
        "away_goals",
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
        if (this.isObjectEmpty(this.matchesToDisplay[0])) {
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
    disableFavorites() {
      return !this.enableAddToFavorites || !this.$store.state.username;
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
    toggleEventLog(newEventLog, rowIndex) {
      if (this.currentEventLog.length == 0) {
        // none displayed
        this.currentEventLog = newEventLog;
        this.rowIndOfEventLog = rowIndex;
      } else if (this.areObjectsEqual(this.currentEventLog, newEventLog)) {
        // hide event log being displayed after two clicks
        this.currentEventLog = [];
        this.rowIndOfEventLog = -1;
      } else {
        // show new event log
        this.currentEventLog = newEventLog;
        this.rowIndOfEventLog = rowIndex;
      }
    },
    async updateScore(matchDetails, currGoals, newGoals, isHomeTeam) {
      if (currGoals == newGoals) {
        return;
      }
      try {
        await this.axios.put(
          `${this.axios.defaults.baseURL}/users/union_rep/${matchDetails.match_id}/${newGoals}`,
          { isHomeTeam: isHomeTeam }
        );
        isHomeTeam
          ? (matchDetails.home_team_goals = newGoals)
          : (matchDetails.away_team_goals = newGoals);
        this.$store.state.matchesInStageFresh = false;
        this.$root.toast("New Score", (isHomeTeam ? 'Home team' : 'Away team') + ' score updated to ' + newGoals  , "info");
      } catch (error) {
        console.log(error.message);
        this.$root.toast("New Score", 'Please login as a union rep before updating matches scores', "danger");
      }
    },
    matchOver: function(currentMatch) {
      return currentMatch.is_over == true;
    },
    matchHasEventLog: function(currentMatch) {
      return (
        this.matchOver(currentMatch) && currentMatch.hasOwnProperty("event_log")
      );
    },
  },
};
</script>

<style></style>
