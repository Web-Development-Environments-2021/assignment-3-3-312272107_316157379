
<template>
  <div>
    <b-button @click="show=true" variant="primary">Create Match</b-button>

    <b-modal
      v-model="show"
      title="Create Match"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-text-variant="footerTextVariant"
    >
      <b-container fluid>

        <b-row class="mb-1">
          <b-col cols="3">Home Team</b-col>
          <b-col>
            <b-form-select
              v-model="home_team"
              :options="teams"
            ></b-form-select>
          </b-col>
          <b-col cols="3">Away Team</b-col>
          <b-col>
            <b-form-select
              v-model="away_team"
              :options="teams"
            ></b-form-select>
          </b-col>
        </b-row>
        <br>
        <b-row class="mb-1">
          <b-col cols="3">Date</b-col>
          <b-col>
            <b-calendar v-model="picked_date" :min="getNextDay" :max="getEndSeason" @context="onContext" locale="en-US" ></b-calendar>
          </b-col>
        </b-row>
        <b-row >
          <b-col md="auto">time</b-col>
          <b-col>
            <b-time v-model="picked_time" locale="en" @contextTime="onContextTime" ></b-time>
          </b-col>
        </b-row>
        <br>

          
      </b-container>

      <template #modal-footer>
        <div class="w-100">
          <p class="float-left"></p>
            <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="onSave"
            :disabled="!checkInserted"
            >
            Save
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="show=false"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import teamsName from '../../assets/teamsNames';
  export default {
    data() {
      return {
        show: false,
        teams:teamsName,
        picked_date: '',
        picked_time: '',
        headerBgVariant: 'dark',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerTextVariant: 'dark',
        home_team: '',
        away_team: '',
      }
    },
    computed: {
      //for not picked today
      getNextDay(){
        const now = new Date()
        const newdate = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1)
        // 15th two months prior
        return new Date(newdate)
      },
      getEndSeason(){
        const now = new Date();
        return new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
      },
      matchDate(){
        return this.picked_date + "T" + this.picked_time;
      },
      checkInserted(){
        if (  this.picked_date  &&  this.picked_time && this.home_team &&  this.away_team ){
            return true;}
        return false;
      },
    },
    methods: {
        onContext(ctx) {
        this.context = ctx
      },
        onContextTime(ctx) {
        this.contextTime = ctx
      },
      onSave(){
        let match = {home_team_name: this.home_team,
                     away_team_name: this.away_team,
                     date: this.matchDate ,}
        this.$emit('add-match', match);
        this.show = false;
      }
    }
  }
</script>

<style scoped>

</style>