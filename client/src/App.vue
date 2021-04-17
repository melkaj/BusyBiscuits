<template>
  <div id="app">
    <v-app>
      
      <!-- TOOLBAR AT THE TOP OF EVERY PAGE -->
      <BBTTPageHeader v-if='isPathInTimeTracker' />
      <PortPageHeader v-else />

      <!-- CONTENT OF THE PAGE (THE MIDDLE, INBETWEEN THE TOOLBAR AND THE FOOTER) -->
      <v-main>
        <router-view/>
      </v-main>

      <!-- THE FOOTER -->
      <BBTTPageFooter v-if='isPathInTimeTracker' /> 
      <PortPageFooter v-else />
         
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
      isPathInTimeTracker: false,
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
      var path = (this.$router.history.current.name).split("-");
      if (path[0] === "bbtt")  this.isPathInTimeTracker = true;
      else                     this.isPathInTimeTracker = false;
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
