<template>
    <v-row
    align="center"
    class="fill-height"
    justify="center"  
    no-gutters             
    >
        <v-col 
        v-for="(proj, i) in projects"
        :key="i"
        cols="12" md="5"
        >
            <v-card :color="colors" class="card">
                <div class="scroll">
                    <h1>
                        {{ proj.title }}
                    </h1>
                    <!-- <p style="margin: 0 2vw"> -->
                    <p>
                        {{ proj.content }}
                    </p>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            colors: "#333333",
        }
    },
    props: {
        projects: { type: Array }
    },
}
</script>

<style scoped>
.card {
    margin: 1vh;
    height: 25vh;
}
.scroll {
    color: white;
    padding: 1vh 1vw;
    height: 100%;
    overflow-y: scroll;
}
::-webkit-scrollbar {
    /* width: 12px; */
    width: 1vw;
}
/* Track */
::-webkit-scrollbar-track {
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 1px;
    background: white; 
}
::-webkit-scrollbar-thumb:window-inactive {
	background: #ffffff; 
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