<template>
  <div id="app">
    <v-app>
      
      <!-- TOOLBAR AT THE TOP OF EVERY PAGE -->
      <PageHeader v-if='temp' />

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
import PageHeader from './projects/bbtt/components/MandatoryComponents/Header';
import PageFooter from './projects/bbtt/components/MandatoryComponents/Footer';

export default {
  data() {
    return {
      isPathInPortfolio: true,
    }
  },
  watch: {
    $router: function() {
      var path = (this.$router.history.current.name).split("-");
      console.log(path);
      if (path[0] === "bbtt")  this.isPathInPortfolio = false;
      else                     this.isPathInPortfolio = true;
    }
  },
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
  font-family: "Montserrat-SemiBold", 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #116466;
}
</style>
