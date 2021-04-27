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
                <div class="scroll div-height">
                    <!-- <h1 class="heading-font center-element">
                        I AM A RECENT GRADUATE<br/> 
                        AND AN ASPIRING SOFTWARE ENGINEER<br/>
                    </h1> -->
                    <h1 class="heading-font">
                        I AM A RECENT GRADUATE<br/> 
                        AND AN ASPIRING SOFTWARE ENGINEER<br/>

                        <!-- BUSYBISCUITS is my portfolio website that showcases some 
                        of the previous projects and to learn a little more about me! -->
                    </h1>
                    <div class="desc-text">
                        I created this website, <span class="bold-text">BUSYBISCUITS</span>,
                        to showcase some of the previous projects and to learn a little more about me!
                    </div>
                </div>
            </div>
        </v-row>
        
<!-- EXPERIENCE INFO -->
        <v-row justify="center" align="center" class="landing-intro clip-pos"> 
            <!-- <div class="text-margin"> -->
                <!-- <h1 class="heading-font center-element"> -->

                <div class="scroll div-height">
                    <h1 class="heading-font center-element">
                        EXPERIENCE:
                    </h1>
                    <h3 class="exp-header center-element">
                        Software Engineer Intern - The Science Division at The City College of New York
                    </h3>
                    <ul>
                        <li>Developed RESTful APIs using Node + Express for an internal ticketing system used by the Science Division on campus</li>
                        <li>Used Node + Express and Twilio to create the backend/emailing service for a webpage that the college faculty uses to pre-screen their COVID-19 symptoms</li>
                        <li>Worked with MySQL for handling data from the API and used Git for collaboration and version control</li>
                        <li>Used Jest and Supertest to create tests to verify the API performs correctly</li>
                        <li>Created a Python script to manage file transfers from a local server to AWS Glacier and vice-versa for indefinite storage</li>
                        <li>Designed VueJS components for the frontend used Axios to send requests to the backend API</li>
                        <li>From March 2020 to June 2020</li>
                    </ul>
                </div>

            <!-- </div> -->
        </v-row>

<!-- PROJECT DESCRIPTIONS -->
        <v-row justify="center" align="center" class="landing-intro clip-neg"> 
            <div class="text-margin">
                <h1 class="heading-font">
                    BUSYBISCSUITS SUITE OF APPLICATIONS:
                </h1>
                <ProjectCards :projects="projects"/>
            </div>
        </v-row>

<!-- ABOUT ME -->
        <v-row justify="center" align="center" class="landing-intro clip-pos"> 
            <div class="scroll div-height">
                <h1 class="heading-font">
                    ABOUT ME:
                </h1>
                <p class="desc-text">
                    I graduated with a Bachelor of Engineering in Computer Engineering. At the 
                    first hackathon I joined (Brickhack V at The Rochester Institute of Technology), 
                    I found that I don't just love engineering but also in the community it 
                    creates. The encouraging, electrifying atmosphere I found there is something 
                    I have been chasing ever since.                
                </p>
                <p class="desc-text">
                    In 2019, I joined CUNY Tech Prep - A boot camp sponsored by CUNY - which was 
                    where I learned about full-stack applications and met some fantastic people. 
                    CTP helped give me the knowledge and confidence to build my projects and obtain 
                    an internship. I was fortunate enough to be a Software Engineer Intern at the 
                    college I attended. I had a wonderful mentor who not only helped me become a 
                    better engineer but a better person. I could not have asked for a better 
                    introduction to the engineering field.                 
                </p>
                <p class="desc-text">
                    There is one common factor throughout all these experiences: the people I have 
                    worked with have been nothing but incredible. Throughout my college career, I 
                    have been fortunate enough to work on cool projects with people that have helped 
                    me grow.
                </p>
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

ul li {
    text-align: start;
}
.exp-header {
    margin: 1vh 1vw;
    text-decoration: underline;
}
.bold-text {
    font-family: "Montserrat-Bold";
}
.heading-font {
    font-family: "Montserrat-Bold", 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 3vh;
    margin: 2vh 2vw;
    /* padding: 4vw; */
}
.div-height {
    height: 80%; 
}
.text-margin {
    margin: 4vw;
}
p {
    padding: 12px;
    margin-bottom: 0 !important;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
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