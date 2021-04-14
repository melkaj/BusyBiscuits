<template>
    <div>

        <!-- THE TOOLBAR ITSELF -->
        <v-app-bar flat dense :color="color" app dark>
            <!-- The side bar -->
            <v-app-bar-nav-icon @click="drawer = !drawer">BB</v-app-bar-nav-icon>
            
            <v-divider vertical inset />
            
            <!-- Main Logo Button -->
            <v-toolbar-title>        
                <v-btn 
                text
                depressed
                to="home">
                    BusyBiscuits
                </v-btn>
            </v-toolbar-title>
            
            <v-divider vertical inset />
            <v-spacer></v-spacer>

            <!-- End of bar buttons -->
            <v-toolbar-items>
                <v-divider vertical inset />

                <v-btn
                :href="githubURL"
                :color="color" 
                depressed>
                <!-- to="login"> -->
                    <v-icon>
                        mdi-github-circle
                    </v-icon>
                </v-btn>

                <v-divider vertical inset />

                <v-btn 
                :href="linkedinURL"
                :color="color" 
                depressed>
                <!-- to="register"> -->
                    <v-icon>
                        mdi-linkedin-box
                    </v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>

        <!-- THE DRAWER WITH OTHER LINKS -->
        <v-navigation-drawer
        v-model="drawer"
        temporary
        app 
        >
            <!-- THE HEADER OF THE DRAWER -->
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        {{ drawerHeader }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <!-- THE ITEMS INSIDE THE DRAWER -->
            <v-list nav dense>
                <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.name }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content @click="goto">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>

export default {
    data() {
        return {
            drawer: false,
            drawerHeader: "BusyBiscuits",
            items: [
                {
                    title:"Time Tracker",
                    name:"Beep"
                },
                {
                    title:"Database",
                    name:"Bop"
                }
            ],
            githubURL: "https://github.com/melkaj",
            linkedinURL: "https://www.google.com/",
            color: null,
        }
    },
    methods: {
        goto() {
            this.$router.push({name:"bbtt-home"}).catch( err => { console.log(err); });
        }
    },
    mounted() {
        this.color = this.$store.getters.getHeaderFooterColor;
    }
}
</script>

<!-- scoped makes sure no other vue comonent can see these styles -->
<style scoped>
/* #116466 */
</style>



