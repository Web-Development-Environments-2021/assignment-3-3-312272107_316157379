<template>
  <div>
    <b-jumbotron
      header="Watch Your Favorites Here"
      lead="Choose one type of favorites to display using the drop down menu."
    >
    </b-jumbotron>

    <b-dropdown
      id="dropdown-left"
      :text="favoritesCategoryAsPlural"
      variant="primary"
      class="m-2"
    >
      <b-dropdown-item @click="favoritesCategory = 'player'"
        >Players</b-dropdown-item
      >
      <b-dropdown-item @click="favoritesCategory = 'team'"
        >Teams</b-dropdown-item
      >
      <b-dropdown-item @click="favoritesCategory = 'match'"
        >Matches</b-dropdown-item
      >
    </b-dropdown>
    <component :is="favoritesComponent" v-bind="currentProperties"></component>
  </div>
</template>

<script>
import FavoriteTeams from "../../components/team/TeamCollection.vue";
import FavoritePlayers from "../../components/player/PlayerCollection.vue";
import FavoriteMatches from "../../components/matches/MatchesInTable.vue";
import Pluralize from "pluralize";

export default {
  components: {
    "favorite-teams": FavoriteTeams,
    "favorite-players": FavoritePlayers,
    "favorite-matches": FavoriteMatches,
  },
  data() {
    return {
      favorites: [],
      favoritesCategory: "match",
      favoritesComponent: "",
    };
  },
  computed: {
    currentProperties() {
      switch (this.favoritesComponent) {
        case "favorite-teams":
          return { teams: this.favorites, enableAddToFavorites: false };
        case "favorite-players":
          return { players: this.favorites, enableAddToFavorites: false };
        case "favorite-matches":
          return {
            matchesToDisplay: this.favorites,
            enableAddToFavorites: false,
          };
        default:
          return {
            matchesToDisplay: this.favorites,
            enableAddToFavorites: false,
          };
      }
    },
    favoritesCategoryAsPlural() {
      return Pluralize(this.$root.capitalize(this.favoritesCategory));
    },
  },
  watch: {
    favoritesCategory: {
      immediate: true,
      async handler() {
        await this.changeComponent();
      },
    },
  },
  methods: {
    async changeComponent() {
      this.favorites = await this.getFavorites(this.favoritesCategory);
      this.favoritesComponent =
        "favorite-" + Pluralize(this.favoritesCategory, 4);
    },
  },
  async created() {
    await this.changeComponent();
  },
};
</script>

<style></style>
