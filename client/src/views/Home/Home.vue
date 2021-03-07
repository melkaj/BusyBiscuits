<template>        
                <v-card v-if='isDataLoaded' style="background:red;" flat class= "fill-height">

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
                        <v-tab-item>
                            <v-card style="background:blue;" flat>
                                <PieChart graphName="Pie-Chart" title="Wheres the pie going?"/>
                            </v-card>
                        </v-tab-item>                            

                        <v-tab-item>
                            <v-card flat>
                                <LineGraph graphName="Line-Graph" title="See the trends"/>
                            </v-card>
                        </v-tab-item>                            

                    </v-tabs-items>

                </v-card>
</template>

<script>
// @ is an alias to /src
import PieChart from '../../components/PieGraphs/PieGraph.vue';
import LineGraph from '../../components/linegraphs/LineGraph.vue';

export default {
    name: 'FormTimeSpent',
    data () {
        return {
            items: ["Pie Chart", "Line Graph", "FORMS"], 
            tab: null,           
            isDataLoaded: false,
            cur_index: 100,
        }
    },
    components: {
        PieChart,
        LineGraph,
    },
    async created() {
        await this.$store.dispatch('setDataFromLastSevenDays'); 
        this.isDataLoaded = true;
    }, 
    mounted() {
        // call function
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
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>