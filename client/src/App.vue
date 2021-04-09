<template>
  <div id="app">
    <v-app>
      
      <!-- TOOLBAR AT THE TOP OF EVERY PAGE -->
      <PortPageHeader v-if='isPathInPortfolio' />
      <BBTTPageHeader v-else />

      <!-- CONTENT OF THE PAGE (THE MIDDLE, INBETWEEN THE TOOLBAR AND THE FOOTER) -->
      <v-main>
        <router-view/>
      </v-main>

      <!-- THE FOOTER -->
      <BBTTPageFooter /> 
         
    </v-app>
  </div>
</template>

<script>
import PortPageHeader from './components/MandatoryComponents/Header';
import BBTTPageHeader from './projects/bbtt/components/MandatoryComponents/Header';
import BBTTPageFooter from './projects/bbtt/components/MandatoryComponents/Footer';
// import PortPageFooter from './projects/bbtt/components/MandatoryComponents/Footer';

export default {
  data() {
    return {
      isPathInPortfolio: true,
    }
  },
  components: {
    BBTTPageHeader,
    PortPageHeader,
    BBTTPageFooter
  },
  updated() {
    console.log(`this.$router.history.current.name: ${this.$router.history.current.name}`);
    console.log(this.$router);
    var path = (this.$router.history.current.name).split("-");
    console.log(`path: ${path}`);
    if (path[0] === "bbtt")  this.isPathInPortfolio = false;
    else                     this.isPathInPortfolio = true;
  },
    // watch: {
    //   '$router' (to, from) {
    //     var path = (this.$router.history.current.name).split("-");
    //     console.log(`this.$router.history.current.name: ${this.$router.history.current.name}`);
    //     console.log(`path: ${path}`);
    //     console.log(`to: ${to}`);
    //     console.log(`from: ${from}`);
    //     if (path[0] === "bbtt")  this.isPathInPortfolio = false;
    //     else                     this.isPathInPortfolio = true;
  
    //   }
    //   // $router: function() {
    //   //   var path = (this.$router.history.current.name).split("-");
    //   //   console.log(`path: ${path}`);
    //   //   if (path[0] === "bbtt")  this.isPathInPortfolio = false;
    //   //   else                     this.isPathInPortfolio = true;
    //   // }
    // },
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
