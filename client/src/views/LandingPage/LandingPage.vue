<template>        
    <v-card v-if='isDataLoaded' flat class="fill-height">

        <h1>HELLO FROM LANDINGPAGE</h1>
        <h2>{{ this.bbttVar }}</h2>
        <h2>{{ this.rootVar }}</h2>

        <v-btn @click='inc'>Clickme</v-btn>

    </v-card>
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
.form-card-heading {
    background: #116466;
    color:white !IMPORTANT;
}
.form-border {
    border-left: 2px solid #116466; 
    border-bottom: 2px solid #116466; 
    border-right: 2px solid #116466;
}
.tab-font {
    font-family: "Montserrat-SemiBold", 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: lighter;
}
.tab-colors {
    background-color: #80c0ff;
}
</style>