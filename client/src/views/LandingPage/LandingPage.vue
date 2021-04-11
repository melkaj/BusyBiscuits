<template> 
    <v-container v-if="isDataLoaded" fluid class="fill-height" style="background:black;">
        <v-row justify="center" align="center" class="landing-intro">
            <h1>
                HELLO,<br/>
                I'M MELDIN!
            </h1>
        </v-row>

        <v-row justify="center" align="center" class="landing-background"> 
            <h1>
                HELLO,<br/>
                I'M MELDIN!
            </h1>
        </v-row>
        
        
        <v-row style="background:red;">
            <v-col cols=12>
                <v-card flat class="fill-height">

                    <h1>HELLO FROM LANDINGPAGE</h1>
                    <h2>{{ this.bbttVar }}</h2>
                    <h2>{{ this.rootVar }}</h2>

                    <v-btn @click='inc'>Clickme</v-btn>

                </v-card>
            </v-col>
        </v-row>   

        <v-row style="background:blue;">
            <h1>HELLO</h1>
        </v-row>   
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
.landing-intro {
    height: 95vh;
    color: white;
    background: #116466;
}
.landing-background {
    height: 100vh;
    color: white;
    background: #B34400;
}
</style>