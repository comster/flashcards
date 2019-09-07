<template>
  <div id="app">
    <h1>Flashcards</h1>
    <!--<div id="nav">-->
    <!-- <router-link :to="{ name: 'home' }">Home</router-link> |-->
    <!-- <router-link :to="{ name: 'study' }">Study</router-link> |-->
    <!-- <router-link :to="{ name: 'cards' }">Cards</router-link>-->
    <!--</div>-->
    
    <b-nav tabs align="center">
      <b-nav-item title="Home" to="/" exact-active-class="active">Home</b-nav-item>
      <b-nav-item title="Study" to="study" active-class="active">Study</b-nav-item>
      <b-nav-item title="Cards" to="cards" active-class="active">Cards</b-nav-item>
    </b-nav>
    
    <br />
    
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script>
  import Vue from 'vue'
  import { NavPlugin } from 'bootstrap-vue'
  Vue.use(NavPlugin)
  export default {
    name: "App",
  }
</script>