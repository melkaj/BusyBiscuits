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
                <div class="desc-text"><span class="bold-text">BUSYBISCUITS</span> is my portfolio website that showcases some of the previous projects. 
                    You can think of them as the BusyBiscuits suite of applications.</div>
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
                    content: `BBTT is a full-stack application that tracks and visualizes time spent throughout 
                    the day. The user records how many hours were spent on various tasks (i.e., traveling, sleeping, 
                    etc.). Then graphs are generated to give a visual understanding of where their time is spent. 
                    I noticed I become far more productive when I plan my day. So, I thought it would be fun to create 
                    an application that would help me become more productive while also honing my full-stack skills. 
                    Click on the button below to learn more!`,
                    path: "/desc/bbtt",
                },
                { 
                    title: "BusyBiscuits Database", 
                    content: `BBD is a budget database built in C++. Data is stored on a text file when the 
                            application is not running. But during runtime, the data is offloaded into a 
                            custom data structure that allows the user to perform CRUD operations. The 
                            data structure is a hash table where each element is the root of a binary tree.
                            I wanted to get a better lower level understanding of certain structures so 
                            I created this project to do so. Also, it helped to develop a more robust 
                            comprehension of C++ and OOP. Click on the button below to learn more!`,
                    path: "/desc/bbd",
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
@import url('../../assets/general.css');

.bold-text {
    font-family: "Montserrat-Bold";
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

@media screen and (min-width: 1101px) {                            /* LARGE */
    .heading-font {
        font-size: 2vw;
    }
    .desc-text {
        font-size: 1.4vw;
    }
    p {
        font-size: 1.4vw;
    }
}
@media screen and (min-width: 701px) and (max-width: 1100px) {                            /* LARGE */
    .heading-font {
        font-size: 2.5vw;
    }
    .desc-text {
        font-size: 2vw;
    }
    p {
        font-size: 2vw;
    }
}
@media screen and (min-width: 401px) and (max-width: 700px) {     /* MEDIUM */
    .heading-font {
        font-size: 4vw;
    }
    .desc-text {
        font-size: 2.5vw;
    }
    p {
        font-size: 2.5vw;
    }
}
@media screen and (max-width: 400px) {                            /* SMALL */
    .heading-font {
        font-size: 5vw;
    }
    .desc-text {
        font-size: 3.5vw;        
    }
    p {
        font-size: 3.5vw;
    }
}
/* #116466 */
</style>