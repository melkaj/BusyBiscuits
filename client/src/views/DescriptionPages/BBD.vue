<template>
    <v-container fluid class="fill-height whole-container">
        <v-row justify="center" align="center" class="landing-intro clip-pos"> 
                <div class="scroll hei">
                    <h1 class="heading-font center-element">
                        BUSY BISCUITS DATABASE
                    </h1>
                    <p>
                        <span class="bold-text">(The C++ application is finished and can be found on my github. However, I am working on 
                        getting the application ported to webassembly so it can be showcased here. When it 
                        is finished, it will be added. But for now, you can read about the project below and 
                        go back to the main portfolio page)</span>
                    </p>
                    <p>
                        You are about to be sent to the mock version of my BBD application. The full version of the 
                        app was made in a Linux environment using C++. I used CMake to help generate Make files that 
                        helped build and compile the program. I wanted to showcase this app mainly because of all the 
                        projects I've worked on, this has been one of the most fun. C++ was the first language I learned, 
                        and I have not got the chance to use it after of my Algorithms course a few years back. Also, 
                        programming inside a new environment like Linux and using CMake to help build the app instead 
                        of an IDE added to the experience. It felt great to make something that was more low level than 
                        anything else I worked on in the past. 
                    </p>
                    <p>
                        This 'database' is a command-line program that can perform CRUD operations on data retrieved 
                        from a text file. There is the main text file that stores all the entries. When the program 
                        starts, the data loads into a custom data structure, and the user can interact with the 
                        command line to manipulate the data structure. When the program ends, the data inside the 
                        data structure is then offloaded into the text file, saving it for the future. So when the 
                        program reloads, the data from before will be shown.        
                    </p>
                    <p>
                        This C++ project can be showcased through the browser by the power of WebAssembly. However,
                        due to WebAssembly, Javascript, and browsers, the save feature does not work. When the 
                        program loads, data is loaded from the main text file, but there is no way to write to 
                        the text file. The user can still interact with the application using all of the other features.
                        The full version of the program, all features work especially the save function. 
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
                    to="/">
                        Back to Main Page
                    </v-btn>
                </div>
        </v-row>
    </v-container>    
</template>

<script>
export default {
    data() {
        return {
            githubRepo: "https://github.com/melkaj/BusyBiscuits_Database"
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
.bold-text {
    font-family: "Montserrat-Bold";
}

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