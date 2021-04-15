<template> 
    <v-container v-if="isDataLoaded" fluid class="fill-height whole-container">

        <v-row justify="center" align="center" class="landing-intro clip-pos">
            <div>
                <h1 class="heading-font">
                    HELLO,<br/>
                    I'M MELDIN!
                </h1>
            </div>
        </v-row>

        <v-row justify="center" align="center" class="landing-intro clip-neg"> 
            <div class="text-margin">
                <h1 class="heading-font">
                    I AM A RECENT GRADUATE<br/> 
                    AND AN ASPIRING SOFTWARE ENGINEER<br/>
                </h1>
                <p>This is my portfolio website and would like to showcase some of my projects!</p>
            </div>
        </v-row>
        
        <v-row justify="center" align="center" class="landing-intro clip-pos"> 
            <div class="text-margin">
                <h1 class="heading-font">
                    SOME PROJECTS I WORKED ON!
                </h1>
                <p>CARROSEL</p>
            </div>
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
.heading-font {
    font-family: "Montserrat-Bold", 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 3vw;
    margin: 4vw;
}
.text-margin {
    margin: 4vw;
}
@media screen and (min-width: 701px) {                            /* LARGE */
    .heading-font {
        font-size: 2.5vw;
    }
    p {
        font-size: 2vw;
    }
}
@media screen and (min-width: 401px) and (max-width: 700px) {     /* MEDIUM */
    .heading-font {
        font-size: 4vw;
    }
    p {
        font-size: 2.5vw;
    }
}
@media screen and (max-width: 400px) {                            /* SMALL */
    .heading-font {
        font-size: 5vw;
    }
    p {
        font-size: 3.5vw;
    }
}
/* #116466 */
</style>