<template>
    <v-container fluid class="fill-height whole-container">
        <v-row justify="center" align="center" class="landing-intro clip-pos"> 
            <v-col cols="12">
                <div class="scroll">
                    <h1 class="heading-font">
                        BUSY BISCUITS TIME TRACKER
                    </h1>
                    <p>
                        You are about to be sent to the mock version of the initial application I created. 
                        When I first created this application, it was a true full stack application, meaning I 
                        created it with a backend and a MySql database. But for the purposes of this portfolio
                        website, I created a mock version of that app just to showcase what it can do. Everything
                        works exactly like the full stack app that is local to my machine, just without the database
                        and the backend. So, if you leave the page and re-enter, all the information you gave before will
                        be gone since it was not saved anywhere. The code to the full-stack version can be found 
                        <span><a :href="githubRepo" id="link">here on my github page.</a></span>
                    </p>
                </div>
                <v-btn 
                text
                depressed
                class="btn"
                to="/bbtt/home">
                    Continue
                </v-btn>
            </v-col>
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
#link {
    color: black;
    font-weight: bolder;
    font-style: italic;
    text-decoration: none;
}
.btn {
    color: white;
    background: #D5F1FC;
    padding-top: 10px;
    margin-top: 10px;
    border: 2px solid black;
}
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
.scroll {
    color: black;
    padding: 1vh 1vw;
    height: 100%;
    overflow-y: scroll;
}
::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: white;
}
/* Handle */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 1px;
    background: #333333; 
}
::-webkit-scrollbar-thumb:window-inactive {
	background: #000000; 
}
p {
    margin-bottom: 0 !important;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    /* Column | row */
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
</style>