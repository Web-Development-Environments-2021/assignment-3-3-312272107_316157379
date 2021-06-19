import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";
let state = {
  username: "",
  leagueID: 271, //Superliga
  favoriteMatchesFresh: false,
  matchesInStageFresh: false,
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
  updateProperty(prop,value){
    state[prop].push(value);
  }
}


export { state, actions };
