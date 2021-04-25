<template>
    <v-container fluid class="fill-height whole-container">
        <v-row justify="center" align="center" class="landing-intro clip-pos"> 
            <!-- <v-col cols="12"> -->
                <div class="scroll hei">
                    <h1 class="heading-font center-element">
                        BUSY BISCUITS TIME TRACKER
                    </h1>
                    <p>
                        You are about to be sent to the mock version of my BBTT application. The full version of the 
                        app is a frontend that makes Axios calls to a Node backend which performs operations on a MySql 
                        database. However, the full version is only local to my machine and not deployed. For showcasing 
                        purposes, I made a mock version that is entirely VueJs and Javascript. So, when you exit the 
                        page and re-enter, the web application will reset all the data entries you gave to the initial 
                        mock version. 
                    </p>
                    <p>
                        There will be three primary tabs (Overview, Forms, Detailed) where all functionality will lie. 
                        The 'Overview' tab shows graphs based on (mock) data from the past week. The 'Forms' tab is where 
                        the user can create, update, and delete entries. The 'Detailed' tab is where the user can visualize 
                        the data of their choosing (i.e., choosing specific dates from a calender). Vuetify was heavily used 
                        for the styling of the application and ChartsJS was used to generated the necessary graphs. 
                    </p>
                    <p>
                        <a :href="githubRepo" id="link" target="_blank" rel="noopener noreferrer">
                            Click here to see the repo of the full version of the app
                        </a>
                    </p>
                    <v-btn 
                    text
                    depressed
                    class="btn"
                    to="/bbtt/home">
                        Continue to BBTT
                    </v-btn>
                </div>
            <!-- </v-col> -->
        </v-row>
    </v-container>    
</template>

<script>
export default {
    data() {
        return {
            githubRepo: "https://github.com/melkaj/BusyBiscuits/tree/master"
        }
    }
}
</script>

<style scoped>
@import url('../../assets/general.css');

#link {
    color: black;
    font-weight: bolder;
    font-style: italic;
    text-decoration: none;
    width: auto;
}
.hei {
    height: 60%;
}
/* .scroll {
    color: black;
    padding: 1vh 1vw;
    height: 60%;
    overflow-y: scroll;
} */

p {
    padding: 12px;
    margin-bottom: 0 !important;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
}


/* LARGE */
@media screen and (min-width: 1100px) {                           
    .scroll {
        width: 75%;
    }
}
/* LARGE */
@media screen and (min-width: 901px) and (max-width: 1200px) {     
    .heading-font {
        font-size: 4vw;
    }
    p {
        font-size: 2vw;
    }
}
/* MEDIUM */
@media screen and (min-width: 551px) and (max-width: 900px) {     
    .heading-font {
        font-size: 4vw;
    }
    p {
        font-size: 2vw;
    }
}
/* SMALL */
@media screen and (max-width: 550px) {                            
    .heading-font {
        font-size: 5vw;
    }
    p {
        font-size: 3vw;
    }
}
</style>