<template>
    <div>

        <!-- THE TOOLBAR ITSELF -->
        <v-app-bar dense color="#116466" app dark>
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
                color="#116466" 
                depressed  
                to="register">
                    Sign Up
                </v-btn>

                <v-divider vertical inset />

                <v-btn 
                color="#116466" 
                depressed 
                to="login">
                    Login
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>

        <!-- THE DRAWER WITH OTHER LINKS -->
        <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        app
        >
            <!-- THE HEADER OF THE DRAWER -->
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        BusyBiscuits
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Track your day!
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <!-- THE ITEMS INSIDE THE DRAWER -->
            <v-list
            nav
            dense>
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
            items: [
                {
                    title:"Overview",
                    name:"Beep"
                },
                {
                    title:"Forms",
                    name:"Bop"
                }
            ]
        }
    },
    methods: {
        goto() {
            this.$router.push({name:"home"}).catch( err => { console.log(err); });
        }
    }
}
</script>

<!-- scoped makes sure no other vue comonent can see these styles -->
<style scoped>
</style>



