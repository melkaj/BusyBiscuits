<template>
  <div id="app">
    <v-app>
      
      <!-- TOOLBAR AT THE TOP OF EVERY PAGE -->
      <PageHeader />

      <!-- CONTENT OF THE PAGE (THE MIDDLE, INBETWEEN THE TOOLBAR AND THE FOOTER) -->
      <v-main>
        <router-view/>
      </v-main>

      <!-- THE FOOTER -->
      <PageFooter /> 
         
    </v-app>
  </div>
</template>

<script>
import PageHeader from './components/MandatoryComponents/Header';
import PageFooter from './components/MandatoryComponents/Footer';

export default {
  components: {
    PageHeader,
    PageFooter
  },
}
</script>

<style lang="scss">
@import url('./assets/fonts.css');
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
