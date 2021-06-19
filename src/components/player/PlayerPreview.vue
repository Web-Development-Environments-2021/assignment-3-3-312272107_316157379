<template>
  <div>
    <b-card style="max-width: 30rem;">
      <b-card-img
        no-body
        @click="navigateToPlayerPage"
        :src="`${playerImg}`"
      ></b-card-img>
      <b-card-body>
        <b-card-title>
          <router-link :to="{ name: playerPagePath }">{{
            playerName
          }}</router-link>
        </b-card-title>

        <b-list-group flush>
          <b-list-group-item>Team Name: {{ teamName }}</b-list-group-item>
          <b-list-group-item
            >Player Position: {{ playerPosition }}</b-list-group-item
          >
          <b-button
            :disabled="localInFavorites"
            @click="addPlayerToFavorites()"
            size="sm"
            :variant="favoritesVariant"
          >
            {{localInFavorites ? 'Added' : 'Add'}} to favorites</b-button
          >
        </b-list-group>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localInFavorites: this.inFavorites,
    };
  },
  props: {
    playerID: {
      type: Number,
      required: true,
    },
    playerImg: {
      type: String,
      required: true,
    },
    teamName: {
      type: String,
      require: true,
    },
    playerName: {
      type: String,
      require: true,
    },
    playerPosition: {
      type: Number,
      require: true,
    },
    inFavorites: {
      type: Boolean,
      require: true,
    },
  },
  computed: {
    playerPagePath() {
      // return `playerPage/${this.playerID}`;
      return "main";
    },
    favoritesVariant() {
      return this.localInFavorites ? "info" : "warning";
    },
  },
  methods: {
    navigateToPlayerPage() {
      this.$router.push(this.playerPagePath).catch(() => {
        console.log("traveling in the same page");
      }); // incase in the same page - catch error and do nothing
    },
    async addPlayerToFavorites() {
      await this.addToFavorites(this.playerID, "player");
      this.localInFavorites = true;
    },
  },
};
</script>

<style></style>
