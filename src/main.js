import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import Pluralize from "pluralize";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  InputGroupPlugin,
  JumbotronPlugin,
  ListGroupPlugin,
  TablePlugin,
  ImagePlugin,
  CalendarPlugin,
  ModalPlugin,
  TimePlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  InputGroupPlugin,
  JumbotronPlugin,
  ListGroupPlugin,
  TablePlugin,
  ImagePlugin,
  CalendarPlugin,
  ModalPlugin,
  TimePlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

import { state as store_state, actions as store_actions } from "./store";
let state = Vue.observable(store_state);
let actions = Vue.observable(store_actions);
let store = { state: state, actions: actions };
Vue.prototype.$store = store;

// move to mixin files if there's time
Vue.mixin({
  methods: {
    isObjectEmpty(obj) {
      return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
    },
    areObjectsEqual(obj1, obj2) {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    },

    async getFavorites(favoritesCategory) {
      try {
        const favoritesPropName =
          "favorite" + Pluralize(this.$root.capitalize(favoritesCategory), 4);

        if (
          this.$store.actions.favoritesStored(
            favoritesCategory,
            favoritesPropName
          ) &&
          this.$store.state.favoriteMatchesFresh
        ) {
          return this.$store.state[favoritesPropName];
        } else {
          let favorites = await this.axios
            .get(
              `${this.axios.defaults.baseURL}/users/favorites/${favoritesCategory}`
            )
            .then((favorites) => favorites.data);
          this.$store.actions.setProperty(favoritesPropName, favorites);
          return favorites;
        }
      } catch (error) {
        this.$root.toast("Add Favorites", error.message, "danger");
      }
    },
    capitalize(term) {
      return term.charAt(0).toUpperCase() + term.slice(1);
    },

    async addToFavorites(categoryID, categoryName) {
      try {
        await this.axios({
          method: 'post',
          url: `${this.axios.defaults.baseURL}/users/favorites/${categoryName}`,
          headers: {}, 
          data: {
            favorite_id: categoryID,
          }
        })
        if (categoryName == "match") {
          this.$store.actions.notProp('favoriteMatchesFresh');
        }
        this.$root.toast(
          "Add favorite",
          `New ${categoryName} has been added to your favorites.`,
          "success"
        );
      } catch (error) {
        this.$root.toast("Add Favorites", "Already in favorites", "danger");
      }
    },

    async getLeagueDetails() {
      try {
        if (!this.$store.actions.hasProperty("leagueDetails")) {
          //first time retrieving league details
          let league_details = await this.axios
            .get(`${this.axios.defaults.baseURL}/league/details`)
            .then((details) => details.data);
          this.$store.actions.setProperty("leagueDetails", league_details);
          return league_details;
        } else {
          return this.$store.state.leagueDetails;
        }
      } catch (err) {
        this.$root.toast(
          "League Details",
          "Could not retrieve league details",
          "danger"
        );
      }
    },
  },
}),
  new Vue({
    router,
    methods: {
      toast(title, content, variant = null, append = false) {
        this.$bvToast.toast(`${content}`, {
          title: `${title}`,
          toaster: "b-toaster-top-center",
          variant: variant,
          solid: true,
          appendToast: append,
          autoHideDelay: 3000,
        });
      },
    },
    render: (h) => h(App),
  }).$mount("#app");
