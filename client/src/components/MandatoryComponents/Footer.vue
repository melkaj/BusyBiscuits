<template>
    <!-- THE FOOTER -->
    <!-- <v-footer color="#116466" dark app>
        <v-card>    
            <v-row>
                <v-card-actions>
                    <v-col>
                        <v-btn 
                        text
                        depressed
                        color="#116466"
                        to="dashboard">
                            FullStackApp
                        </v-btn>
                    </v-col>

                    <v-col justify="end">
                        <v-btn 
                        text
                        depressed
                        color="#116466"
                        to="login">
                            Signout
                        </v-btn>
                    </v-col>
                </v-card-actions>
            </v-row>
        </v-card>
    </v-footer>  -->



<v-footer padless app color="#116466">
    <v-col
        class="text-center"
        cols="12"
        style="color:white;"  
    >
      {{ new Date().getFullYear() }} — <strong>Busy Biscuits Online</strong>
    </v-col>
  </v-footer>
<!-- 
<v-card width="100%"
        flat tile>
    <v-footer app class="red lighten-1 text-center">
        <v-card>
            <v-divider></v-divider>

            <v-card-text class="white--text">
                {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</v-card> -->





    <!-- <v-footer color="#116466" dark app style="height: 50px;">
        <v-row align="center">
            <v-col cols="6" class="text-left">
            <span>&copy; FullStackApp</span>
            </v-col>
            <v-col cols="6" class="text-right">
                <v-btn
                color="#116466" 
                depressed  
                to="signout">
                    Sign Out
                </v-btn>
            </v-col>
        </v-row>
    </v-footer>  -->
</template>

<script>

export default {
  
}
</script>

<!-- scoped makes sure no other vue comonent can see these styles -->
<style scoped>
</style>