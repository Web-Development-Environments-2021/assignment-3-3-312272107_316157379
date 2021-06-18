import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";



let state = {
  username: "",
  leagueID: 271, //Superliga
  favoriteMatchesFresh: false,

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
  },
  isObjectEmpty(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  },
  areObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  },
   
  
  async updateMatches() {
    try {
      // console.log('entered here');
      if (state.favoriteMatchesFresh) {
        
        // console.log('entered here after the first time');
        // console.log(state.favoriteMatches)
        return state.favoriteMatches;
      } else {
        let favoriteMatches = await axios.get(
          `${axios.defaults.baseURL}/users/favorites/match`
          ).then(favoriteMatches => favoriteMatches.data);
          actions.setProperty("favoriteMatches", favoriteMatches);
          // console.log('exited here');
          state.favoriteMatchesFresh = true;
          return favoriteMatches;
        }
      } catch (error) {
        console.log("error in update matches");
        console.log(error.message);
      }
    },
    
    
    async addToFavorites(categoryID, categoryName) {
      try {
        const response = await axios.post(
          `${axios.defaults.baseURL}/users/favorites/${categoryName}`,
          {
            favorite_id: categoryID,
          }
          )
          state.favoriteMatchesFresh = false;
          return responseStatus;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },

}


export { state, actions };
