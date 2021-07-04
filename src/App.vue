<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }">Superliga Vue</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>

        <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item :to="{ name: 'stageMatches' }">Matches In Current Stage</b-nav-item>
        <b-nav-item v-if="$store.state.username" :to="{ name: 'favorites' }">Favorites</b-nav-item>
        <!-- <b-nav-item :to="{ name: 'teamPage' }">Team Page Test</b-nav-item> -->
        <b-nav-item disabled>hello {{usernameDisplay}}</b-nav-item>
        </b-navbar-nav>

        
        <b-navbar-nav class="ml-auto" v-if="!$store.state.username">
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item-dropdown right>
          <template #button-content>
            {{usernameDisplay}}
          </template>
          <b-dropdown-item href="#">My Matches</b-dropdown-item>
          <!-- <b-dropdown-item href="#">Favorite Players</b-dropdown-item> -->
          <!-- <b-dropdown-item href="#">Favorite Teams</b-dropdown-item> -->
          <b-dropdown-item @click="Logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$store.actions.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  },
  computed:{
     usernameDisplay(){  
       return this.$store.state.username ? this.$store.state.username : 'guest'; 
      },
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
