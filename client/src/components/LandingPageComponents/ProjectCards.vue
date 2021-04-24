<template>
    <v-sheet
        height=50VH 
        flat 
        :color="colors"
        max-width="100VW"
    >
        <v-slide-group
        center-active
        class="pa-4"
        v-model="model"
        show-arrows="always"
        height="100%"
        >
            <v-slide-item
                v-for="(proj, i) in projects"
                :key="i"
                v-slot="{ toggle }"
            >

<!-- CARD TO HOLD THE DESCRIPTION OF THE PROJECTS -->
                <v-card 
                :color="colors" 
                class="card" 
                flat
                height="85%"
                width="60vw"
                @click="toggle"
                >
                    <div class="scroll">
                        <h1>
                            {{ proj.title }}
                        </h1>
                        <p>
                            {{ proj.content }}
                        </p>
                        <v-btn 
                        text
                        depressed
                        class="btn"
                        :to="proj.path">
                        <!-- to="/bbtt/home"> -->
                            EXPLORE
                        </v-btn>

                    </div>
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
</template>

<script>
export default {
    data() {
        return {
            colors: "#D5F1FC",
            btnColor: "white",
            model: null,
        }
    },
    props: {
        projects: { type: Array }
    },
}
</script>

<style scoped>
.btn {
    color: white;
    background: #D5F1FC;
    padding-top: 10px;
    margin-top: 10px;
    border: 2px solid black;
}
.btn:hover {
    color: #333333;
    background: #D5F1FC;
    padding-top: 10px;
    margin-top: 10px;
    border: 2px solid black;
}
.card {
    margin: 1vh;
    height: 25vh;
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

/* EXTRA LARGE */
@media screen and (min-width: 961px) {  
    .card {
        margin: 1vh;
        height: 40vh;
    }                         
    h1 {
        font-size: 2.5vw;
    }
    p {
        font-size: 1.5vw;
    }
}
/* LARGE */
@media screen and (min-width: 701px) and (max-width: 960px) {       
    h1 {
        font-size: 2vw;
    }
    p {
        font-size: 1.5vw;
    }
} 
/* MEDIUM */
@media screen and (min-width: 401px) and (max-width: 700px) {     
    h1 {
        font-size: 3vw;
    }
    p {
        font-size: 2.5vw;
    }
}
/* SMALL */
@media screen and (max-width: 400px) {                            
    h1 {
        font-size: 5vw;
    }
    p {
        font-size: 3.5vw;
    }
}
</style>