<template>
    <v-sheet
    height=50VH
    class="mx-auto"
    max-width="100VW"
    >
        <v-slide-group
        v-model="model"
        class="pa-4"
        center-active
        show-arrows="always"
        >
            <v-slide-item
                v-for="(proj, i) in projects"
                :key="i"
                v-slot="{ toggle }"
            >
                <v-card
                color="#CCCCCC"
                class="ma-4"
                flat
                width="200"
                @click="toggle"
                >
                <!-- height="200" -->
                    <div class="scroll">
                        <h1>
                            {{ proj.title }}
                        </h1>
                        <p>
                            {{ proj.content }}
                        </p>
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
            // colors: "#333333",
            colors: "#D5F1FC",
            model: null,
        }
    },
    props: {
        projects: { type: Array }
    },
    mounted() {
        console.log(this.projects);
    }
}
</script>

<style scoped>
.scroll {
    color: black;
    padding: 1vh 1vw;
    height: 100%;
    overflow-y: scroll;
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