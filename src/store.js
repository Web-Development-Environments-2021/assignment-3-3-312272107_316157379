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

};

export {state,actions};