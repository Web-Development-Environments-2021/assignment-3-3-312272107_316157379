<template>
  <div>
    <b-card style="max-width: 20rem;">
      <b-list-group flush>
        <b-card-title>Match Details</b-card-title>
        <b-list-group-item>Home Team: {{ homeTeam }}</b-list-group-item>
        <b-list-group-item>Away Team: {{ awayTeam }}</b-list-group-item>
        <b-list-group-item>Match Date: {{ date }}</b-list-group-item>
        <b-list-group-item>Match Time: {{ time }}</b-list-group-item>
      </b-list-group>
      <b-card-body>
        <b-list-group flush> </b-list-group>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "MatchPreview",
  props: {
    homeTeam: {
      type: String,
      required: true,
    },
    awayTeam: {
      type: String,
      required: true,
    },
    date_time: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      date: "",
      time: "",
    };
  },
  watch: {
    date_time: {
      immediate: true,
      handler() {
        let date_time_split = this.date_time.split("T");
        this.date = date_time_split[0];
        this.time = date_time_split[1].substring(
          0,
          8
        );
      },
    },
  },
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}
</style>
