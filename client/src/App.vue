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
      <PortPageFooter v-if='isPathInPortfolio' />
      <BBTTPageFooter v-else /> 
      <!-- <div v-if='isPathInPortfolio' style="position:absolute; bottom:0;">
        <PortPageFooter />
      </div>
      <div v-else>
        <BBTTPageFooter /> 
      </div> -->
         
    </v-app>
  </div>
</template>

<script>
import PortPageHeader from './components/MandatoryComponents/Header';
import PortPageFooter from './components/MandatoryComponents/Footer';
import BBTTPageHeader from './projects/bbtt/components/MandatoryComponents/Header';
import BBTTPageFooter from './projects/bbtt/components/MandatoryComponents/Footer';

export default {
  data() {
    return {
      isPathInPortfolio: true,
    }
  },
  components: {
    BBTTPageHeader,
    PortPageHeader,
    BBTTPageFooter,
    PortPageFooter,
  },
  methods: {
    checkPath() {
      console.log(`this.$router.history.current.name: ${this.$router.history.current.name}`);
      console.log(this.$router);
      var path = (this.$router.history.current.name).split("-");
      console.log(`path: ${path}`);
      if (path[0] === "bbtt")  this.isPathInPortfolio = false;
      else                     this.isPathInPortfolio = true;
    }
  },
  updated() {
    this.checkPath();
  },
  mounted() {
    this.checkPath();
  }
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
  // position: relative;
}
</style>
