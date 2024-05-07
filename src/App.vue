<!--<template>
  <nav>
    <router-link to="/project-select">ProjectSelect</router-link> | 
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |

    <router-link to="/model-dev">ModelDev</router-link> |
    <router-link to="/annotations">annotations</router-link> |
    <router-link to="/leaflet">leaflet</router-link> |
    <router-link to="/gallery">Gallery</router-link> |
    <router-link to="/database">DataBase</router-link> 
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
-->

<template>
  <div id="app">
    <!-- Conditionally render header based on the current route -->
    <header>
      <img alt="logo" src="\assets\Air_Maps_Logo.png">
      <!-- Navigation Links Here -->
      <nav v-if="isHomePage">
        <!--<router-link to="/project-select">ProjectSelect</router-link> | -->
        <router-link to="/">Home/project select</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/model-dev">ModelDev</router-link> |
        <router-link to="/annotations">annotations</router-link> |
        <router-link to="/leaflet">leaflet</router-link> |
        <router-link to="/gallery">Gallery</router-link> |
        <router-link to="/database">DataBase</router-link> 
        <!-- Add more links as needed -->
      </nav>
    </header>

    <!-- Main content rendered by router -->
    <router-view @route-changed="handleRouteChange"></router-view>
  </div>
</template>

<script>
export default {
  computed:{
    isHomePage() {
      return this.$route.path !== '/';
    }
  },
  data() {
    return {
      showNav: false // Initially false so no nav on the home page

    };
  },
  methods: {
    handleRouteChange() {
      // Update the showNav based on route
      this.showNav = this.$route.path !== '/';
    }
  },
  created() {
    // Call handleRouteChange on component creation to set initial state
    this.handleRouteChange();
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>



