<template>
    <v-container class="fill-height justify-center" fluid>

        <v-row align="center" justify="center">
            <v-col sm=12>
        
                <v-card style="background: #FFFBE6;" flat>
                    <v-card-title class="text-center justify-center ">
                        <h1>
                            BusyBiscuits
                        </h1>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-tabs
                        v-model="sleep"
                        backgroud-color="transparent"
                        grow
                    >      
                        <v-tab
                            v-for="item in items"
                            :key="item"
                            class="tab-font"
                        >
                            {{ item }}
                        </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="sleep">
                        <v-tab-item
                            v-for="item in items"
                            :key="item"
                        >
                            <v-card
                                flat
                            >
                                <v-card-text>{{ item }}</v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>

                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'FormTimeSpent',
    data () {
        return {
            sleep: 2,
            travelTime: 2,
            exercise: 2,
            onPhone: 2,
            onComputer: 2,
            games: 2,
            somethingelse: 0,
            total: 0,
            message: '',
            items: ["tebsss", "second tebbs"]
        }
    },
}
</script>

<style scoped>
.form-card-heading {
    background: #116466;
    color:white !IMPORTANT;
}
.form-border {
    border-left: 2px solid #116466; 
    border-bottom: 2px solid #116466; 
    border-right: 2px solid #116466;
}
.tab-font {
    font-family:Verdana, Geneva, Tahoma, sans-serif;
}
</style>