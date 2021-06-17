import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";

let state = {
  username: "",
  leagueID: 271, //Superliga
};
let actions = {
  login: (username) => {
    state.username = username;
  },
  logout() {
    state.username = "";
  },
  hasProperty(paramAsString) {
    // return localStorage.getItem(storageParam);
    return state.hasOwnProperty(paramAsString);
  },
  setProperty(param, value) {
    state[param] = value;
  },
  isObjectEmpty(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  },
  async updateMatches() {
    try {
      // console.log('entered here');
      if (actions.hasProperty("favoriteMatches")) {
        
        // console.log('entered here after the first time');
        // console.log(state.favoriteMatches)
        return state.favoriteMatches;
      } else {
        let favoriteMatches = await axios.get(
          `${axios.defaults.baseURL}/users/favorites/match`
          ).then(favoriteMatches => favoriteMatches.data);
          actions.setProperty("favoriteMatches", favoriteMatches);
          // console.log('exited here');
          return favoriteMatches;
        }
      } catch (error) {
      console.log("error in update matches");
      console.log(error.message);
    }
  },
  areObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  },
  async addToFavorites(categoryID, categoryName) {
    try {
      await this.axios.post(
        `${this.axios.defaults.baseURL}/users/favorites/${categoryName}`,
        {
          favorite_id: categoryID,
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export { state, actions };
