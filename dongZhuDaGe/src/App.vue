<template>
  <div id="app">
    <!-- <div id="nav" >
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->

      <!-- <Upload  /> -->
      <router-view />
  </div>
</template>

<script>
import Upload from '@/components/upload.vue'
export default {
  data() {
    return {};
  },
  components:{
    Upload
  },

  created() {},
  async mounted() {},

  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  /* min-width: 1120px; */
  /* border: 1px solid red; */
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
}

#nav {
  /* padding: 30px; */
  box-sizing: border-box;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
