<template>
    <v-container v-if='isDataLoaded' class="fill-height justify-center" fluid>

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
                        v-model="tab"
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

                    <v-tabs-items v-model="tab">
                        <v-tab-item
                            v-for="(item, index) in items"
                            :key="item"
                        >
                            <v-card
                                flat
                            >
                                <PieChart v-bind:graphName="index.toString()"/>
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
import PieChart from '../../components/PieGraphs/PieGraph.vue';

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
            items: ["Pie Chart", "Pie Chart 2"], 
            tab: null,           
            isDataLoaded: false,
            cur_index: 100,
        }
    },
    components: {
        PieChart,
    },
    async created() {
        await this.$store.dispatch('setDataFromLastSevenDays'); 
        this.isDataLoaded = true;
    }    
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