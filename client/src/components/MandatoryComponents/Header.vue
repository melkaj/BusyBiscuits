<template>
    <div>

        <!-- THE TOOLBAR ITSELF -->
        <v-app-bar dense color="#116466" app dark>
            <!-- The side bar -->
            <v-app-bar-nav-icon @click="drawer = !drawer">B</v-app-bar-nav-icon>
            
            <v-divider vertical inset />
            
            <!-- Main Logo Button -->
            <v-toolbar-title>        
                <v-btn 
                text
                depressed
                to="dashboard">
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
                        Sidebar
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Sidebar-Subtext
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
                        <v-icon>{{ item.title }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
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
                    title:"ONE",
                    name:"Beep"
                },
                {
                    title:"TWO",
                    name:"Bop"
                }
            ]
        }
    }
}
</script>

<!-- scoped makes sure no other vue comonent can see these styles -->
<style scoped>
</style>



