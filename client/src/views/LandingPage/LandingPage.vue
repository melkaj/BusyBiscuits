<template> 
    <v-container v-if="isDataLoaded" fluid class="fill-height whole-container">

        <v-row justify="center" align="center" class="landing-intro clip-pos">
            <h1 class="heading-font">
                (STILL IN DEVELOPEMENT)<br/>
                HELLO,<br/>
                I'M MELDIN!
            </h1>
        </v-row>

        <v-row justify="center" align="center" class="landing-intro clip-neg"> 
            <h1 class="heading-font">
                I am a recent graduate<br/> 
                and an aspiring software engineer<br/>
            </h1>
        </v-row>
        
        
        <!-- <v-row style="background:red;">
            <v-col cols=12>
                <v-card flat class="fill-height">

                    <h1>HELLO FROM LANDINGPAGE</h1>
                    <h2>{{ this.bbttVar }}</h2>
                    <h2>{{ this.rootVar }}</h2>

                    <v-btn @click='inc'>Clickme</v-btn>

                </v-card>
            </v-col>
        </v-row>    -->
    </v-container>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'LandingPage',
    data () {
        return {
            isDataLoaded: true,
            bbttVar: this.$store.getters['bbtt/getbbtt'],
            rootVar: this.$store.getters['getRoot'],
        }
    },
    methods: {
        inc() {
            this.$store.dispatch('bbtt/incrementbbtt');
            this.$store.dispatch('incrementRoot');
            this.bbttVar = this.$store.getters['bbtt/getbbtt'];
            this.rootVar = this.$store.getters['getRoot'];
        }
    },
    mounted() {
        console.log(this.$router.history.current.name);
    },
}
</script>

<style scoped>
.whole-container {
    background: #333333;
}
.landing-intro {
    height: 95vh;
    color: #333333;
    background: #D5F1FC;
    /* clip-path: polygon(0 5%, 100% 15%, 100% 85%, 0 95%); */
}
.clip-pos {
    /* Top left going down || Top right going down || Bottom right going up || Bottom left going up */
    clip-path: polygon(0 5%, 100% 15%, 100% 85%, 0 95%);
}
.clip-neg {
    /* Top left going down || Top right going down || Bottom right going up || Bottom left going up */
    clip-path: polygon(0 15%, 100% 5%, 100% 95%, 0 85%);
}
/* .landing-background {
    height: 100vh;
    color: #D5F1FC;
} */
.heading-font {
    font-size: 5.9vw;
    margin: auto;
}
/* #116466 */
</style>