<template> 
    <v-container v-if="isDataLoaded" fluid class="fill-height whole-container">

<!-- GREETING -->
        <v-row justify="center" align="center" class="landing-intro clip-pos">
            <div>
                <h1 class="heading-font">
                    HELLO,<br/>
                    I'M MELDIN!
                </h1>
            </div>
        </v-row>

<!-- BACKGROUND INFO -->
        <v-row justify="center" align="center" class="landing-intro clip-neg"> 
            <div class="text-margin">
                <h1 class="heading-font">
                    I AM A RECENT GRADUATE<br/> 
                    AND AN ASPIRING SOFTWARE ENGINEER<br/>
                </h1>
                <p>This is my portfolio website and would like to showcase some of my projects!</p>
            </div>
        </v-row>
        
<!-- PROJECT DESCRIPTIONS -->
        <v-row justify="center" align="center" class="landing-intro clip-pos"> 
            <div class="text-margin">
                <h1 class="heading-font">
                    SOME PROJECTS I CREATED:
                </h1>
                <ProjectCards :projects="projects"/>
            </div>
        </v-row>

<!-- EXPLORE BUTTONS TO LET USER MOVE TO THE PROJECT -->
        <!-- <v-row justify="center" align="center" class="landing-intro clip-neg"> 
            <div class="text-margin">
                <h1 class="heading-font">
                    EXPLORE THE PROJECTS
                </h1>
                <ProjectCards :projects="projects"/>
            </div>
        </v-row> -->
    </v-container>
</template>

<script>
// @ is an alias to /src
import ProjectCards from '../../components/LandingPageComponents/ProjectCards.vue';

export default {
    name: 'LandingPage',
    data () {
        return {
            isDataLoaded: true,
            bbttVar: this.$store.getters['bbtt/getbbtt'],
            rootVar: this.$store.getters['getRoot'],
            projects: [
                { 
                    title: "BusyBiscuits Time Tracker", 
                    content: `BBTT is a full stack application that tracks and 
                            visualizes time spent throughout the day. The user can create an 
                            entry based on how many hours were spent on various tasks (i.e. 
                            traveling, sleeping, etc.). Then graphs are generated to give a visual 
                            understanding of where their time is spent. I noticed I become far more
                            productive when I plan my day by the hour. So, I thought it would be cool
                            to create and application to take it one step further while also honing 
                            my full-stack skills`
                },
                { 
                    title: "BusyBiscuits Database", 
                    content: `BBD is a budget database built in C++. Data is stored on a text file when the 
                            application is not running. But during runtime, the data is offloaded into a 
                            custom datastructure that allows the user to perform CRUD operations. The 
                            datastructure is a hash table where each element is the root of a binary tree.
                            I wanted to get a better lower level understanding of certain structures so 
                            I created this project to do so. Also, it helped to develop a more robust 
                            comprehension of C++ and OOP.` 
                },
                { 
                    title: "BusyBiscuits temp", 
                    content: `LOREM IPSUM` 
                },
            ]
        }
    },
    components: {
        ProjectCards,
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
    margin: 2vw;
    /* padding: 4vw; */
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