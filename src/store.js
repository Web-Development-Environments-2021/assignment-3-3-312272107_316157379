import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";


let state = {
  username: "",
  leagueID: 271, //Superliga
  favoriteMatchesFresh: true,
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
  notProp(propName){
    state[propName] = !state[propName]
  },
  favoritesStored(favoritesCategory, favoritesPropName){
    let baseCond = true;
    if(favoritesCategory == 'match'){
      baseCond = state.favoriteMatchesFresh;
    }
    baseCond = baseCond && actions.hasProperty(favoritesPropName);
    return baseCond;
  },
}


export { state, actions };
